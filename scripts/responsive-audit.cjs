// Auditoría local con Chrome instalado: sin dependencias adicionales.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const os = require('node:os');
const { spawn } = require('node:child_process');
const root = process.cwd();
const phase = process.argv[2] || 'after';
const out = path.join(root, phase === 'screenshots' ? 'screenshots/responsive' : phase === 'global' ? 'artifacts/global-review' : 'artifacts/responsive');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.pdf': 'application/pdf' };
const pages = [];
function discover(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['assets', 'artifacts', 'scripts', 'screenshots'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) discover(full);
    else if (entry.name.endsWith('.html') && entry.name !== 'detalle.html') pages.push('/' + path.relative(root, full).replaceAll('\\', '/'));
  }
}
discover(root);
pages.push('/proyectos/detalle.html?slug=vivienda-salamanca');
if (phase === 'checks') pages.length = 0;
const server = http.createServer((req, res) => {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
let browser, socket;
const report = { phase, results: [], interactions: [], errors: [], brokenLocalResources: [] };
(async () => {
  fs.mkdirSync(out, { recursive: true });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ancodarq-chrome-'));
  browser = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=0', '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--disable-background-networking', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
  let port;
  for (let i = 0; i < 100; i++) {
    const activePort = path.join(profile, 'DevToolsActivePort');
    if (fs.existsSync(activePort)) { port = fs.readFileSync(activePort, 'utf8').split('\n')[0]; break; }
    await pause(100);
  }
  if (!port) throw Error('Chrome no ha iniciado el protocolo de depuración');
  const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let id = 0;
  const waiting = new Map();
  socket.onmessage = event => {
    const msg = JSON.parse(event.data);
    if (msg.id) {
      const pending = waiting.get(msg.id);
      if (pending) { waiting.delete(msg.id); msg.error ? pending.reject(Error(msg.error.message)) : pending.resolve(msg.result); }
    }
    if (msg.method === 'Runtime.exceptionThrown') report.errors.push(msg.params.exceptionDetails.text + ': ' + (msg.params.exceptionDetails.exception?.description || ''));
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const n = ++id;
    waiting.set(n, { resolve, reject });
    socket.send(JSON.stringify({ id: n, method, params }));
    setTimeout(() => { if (waiting.delete(n)) reject(Error(`Timeout: ${method}`)); }, 25000).unref();
  });
  const evaluate = async expression => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw Error(r.exceptionDetails.exception?.description || 'Error al evaluar');
    return r.result.value;
  };
  await send('Page.enable');
  await send('Runtime.enable');
  if (phase === 'global') {
    await send('Network.enable');
    const domains = new Set();
    const resources = new Set();
    socket.addEventListener('message', event => {
      const msg=JSON.parse(event.data);
      if(msg.method==='Network.requestWillBeSent') domains.add(new URL(msg.params.request.url).hostname);
    });
    async function navigate(url) {
      await send('Page.navigate',{url:base+url});
      for(let i=0;i<100;i++) {
        if(await evaluate(`document.readyState === 'complete' && !!document.querySelector('.site-header') && getComputedStyle(document.querySelector('.site-header')).position === 'fixed'`)) return;
        await pause(100);
      }
      throw Error('Página no preparada: '+url);
    }
    await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
    for(const page of pages) {
      await navigate(page);
      const audit=await evaluate(`(() => {
        const visible=el=>el.getClientRects().length && getComputedStyle(el).visibility!=='hidden';
        const rgb=color=>{const m=color.match(/[\\d.]+/g);return m?m.slice(0,3).map(Number):[0,0,0]};
        const luminance=color=>rgb(color).map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
        const contrast=[];
        for(const el of document.querySelectorAll('a,p,label,button,h1,h2,h3,span')) {
          if(!visible(el)||el.children.length||el.textContent.trim().length<2||el.closest('.project-link,.project-lightbox'))continue;
          const style=getComputedStyle(el);
          let bg='rgb(255,255,255)';
          for(let node=el;node;node=node.parentElement){const c=getComputedStyle(node).backgroundColor;if(c!=='rgba(0, 0, 0, 0)'&&c!=='transparent'){bg=c;break;}}
          const fg=luminance(style.color), back=luminance(bg);
          const ratio=(Math.max(fg,back)+.05)/(Math.min(fg,back)+.05);
          const size=parseFloat(style.fontSize), large=size>=24||(size>=18.66&&parseInt(style.fontWeight)>=700);
          if(ratio<(large?3:4.5))contrast.push({text:el.textContent.trim().slice(0,90),color:style.color,background:bg,size,ratio:Math.round(ratio*100)/100});
        }
        return {
          url:location.pathname+location.search,title:document.title,h1:[...document.querySelectorAll('h1')].map(el=>el.textContent.trim()),
          missingProject:document.querySelector('#project-detail-content')?.textContent.includes('Proyecto no encontrado.')||false,
          description:document.querySelector('meta[name="description"]')?.content||null,
          canonical:document.querySelector('link[rel="canonical"]')?.href||null,
          links:[...document.querySelectorAll('a[href]')].map(el=>({url:el.href,text:el.textContent.trim().slice(0,70),target:el.target,rel:el.rel,visible:!!visible(el)})),
          localResources:[...document.querySelectorAll('img[src],script[src],link[rel="stylesheet"]')].map(el=>el.src||el.href).filter(url=>url.startsWith(location.origin)),
          forms:[...document.forms].map(form=>({action:form.getAttribute('action'),method:form.method,inlineSubmit:form.getAttribute('onsubmit'),fields:[...form.elements].map(field=>({type:field.type,name:field.name,id:field.id,required:field.required,accept:field.accept||null,label:field.getAttribute('aria-label')||field.labels?.[0]?.textContent.trim()||null}))})),
          contrast, cookie:document.cookie,localStorageKeys:Object.keys(localStorage),sessionStorageKeys:Object.keys(sessionStorage),
          scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,
          externalScripts:[...document.scripts].filter(el=>el.src&&!el.src.startsWith(location.origin)).map(el=>({src:el.src,integrity:el.integrity||null})),
          inlineHandlerCount:[...document.querySelectorAll('*')].reduce((n,el)=>n+[...el.attributes].filter(a=>a.name.startsWith('on')).length,0)
        };
      })()`);
      for(const item of audit.links) if(item.url.startsWith(base))resources.add(item.url);
      for(const url of audit.localResources)resources.add(url);
      report.results.push(audit);
      console.log('Revisado: '+page);
    }
    await navigate('/proyectos/');
    const data=await evaluate(`({projects:PROJECTS_DATA.map(p=>({slug:p.slug,name:p.name,category:p.category,images:[p.coverImage,...(p.gallery||[])]})),hero:HERO_IMAGES})`);
    report.data=data;
    for(const project of data.projects) {
      for(const asset of project.images) resources.add(base+'/'+asset);
      await navigate('/proyectos/detalle.html?slug='+encodeURIComponent(project.slug));
      report.interactions.push(await evaluate(`({name:'project-detail',slug:new URLSearchParams(location.search).get('slug'),title:document.querySelector('h1')?.textContent.trim(),count:document.querySelectorAll('.project-gallery-item').length,previous:document.querySelector('.project-previous')?.getAttribute('href')||null,next:document.querySelector('.project-next')?.getAttribute('href')||null})`));
    }
    for(const asset of data.hero)resources.add(base+'/'+asset);
    for(const url of resources) {
      const response=await fetch(url,{method:'HEAD'});
      if(!response.ok)report.brokenLocalResources.push({url:url.replace(base,''),status:response.status});
    }
    report.resourceCount=resources.size;
    const payload='<img src=x onerror="window.__auditInjected=true">';
    await navigate('/proyectos/detalle.html?slug='+encodeURIComponent(payload));
    report.interactions.push(await evaluate(`({name:'invalid-slug-injection',executed:window.__auditInjected===true,unknown:document.querySelector('#project-detail-content').textContent.includes('Proyecto no encontrado.'),unexpectedImage:!!document.querySelector('#project-detail-content img')})`));
    await navigate('/index.html');
    const heroBytes=data.hero.reduce((sum,p)=>sum+fs.statSync(path.join(root,p)).size,0);
    report.heroBytes=heroBytes;
    await send('Network.setBlockedURLs',{urls:['*cdn.tailwindcss.com*']});
    await send('Network.setCacheDisabled',{cacheDisabled:true});
    await navigate('/contacto/').catch(()=>{});
    report.interactions.push(await evaluate(`({name:'tailwind-blocked',headerPosition:getComputedStyle(document.querySelector('.site-header')).position,headerImages:[...document.querySelector('.site-header').querySelectorAll('img')].map(img=>({width:img.getBoundingClientRect().width,height:img.getBoundingClientRect().height})),mainDisplay:getComputedStyle(document.querySelector('main')).display})`));
    await send('Network.setBlockedURLs',{urls:[]});
    await send('Emulation.setScriptExecutionDisabled',{value:true});
    await send('Page.navigate',{url:base+'/proyectos/'});
    await pause(700);
    report.interactions.push(await evaluate(`({name:'javascript-disabled',header:!!document.querySelector('.site-header'),cards:document.querySelectorAll('.project-link').length,mainText:document.querySelector('main').textContent.trim()})`));
    report.externalDomains=[...domains].filter(domain=>domain!=='127.0.0.1');
    return;
  }
  if (phase === 'screenshots') {
    const targets = [
      ['inicio', '/index.html'], ['nosotros', '/nosotros/'],
      ['servicios', '/servicios/'], ['proyectos', '/proyectos/'],
      ['contacto', '/contacto/'], ['ficha-salamanca', '/proyectos/detalle.html?slug=vivienda-salamanca']
    ];
    const sizes = [[375,812,'mobile'],[390,844,'mobile'],[768,1024,'tablet'],[1024,768,'tablet'],[1440,900,'desktop']];
    async function captureFullPage(filename) {
      const metrics = await send('Page.getLayoutMetrics');
      const viewport = await evaluate('({width:innerWidth,height:innerHeight})');
      const height = Math.max(viewport.height, Math.ceil(metrics.cssContentSize.height));
      const screenshot = await send('Page.captureScreenshot', {
        format: 'png', captureBeyondViewport: true,
        clip: {x:0,y:0,width:viewport.width,height,scale:1}
      });
      const png = Buffer.from(screenshot.data, 'base64');
      fs.writeFileSync(path.join(out, filename), png);
      return { filename, fullPage:true, pngWidth:png.readUInt32BE(16), pngHeight:png.readUInt32BE(20) };
    }
    for (const [name,url] of targets) {
      for (const [width,height,device] of sizes) {
        await send('Emulation.setDeviceMetricsOverride', {width,height,deviceScaleFactor:1,mobile:false});
        await send('Emulation.setTouchEmulationEnabled', {enabled:device !== 'desktop'});
        await send('Page.navigate', {url:base+url});
        let ready = false;
        for (let i=0;i<100;i++) {
          ready = await evaluate(`document.readyState === 'complete' && !!document.querySelector('.site-header') && getComputedStyle(document.querySelector('.site-header')).position === 'fixed' && (!document.querySelector('#proyectos-gallery-grid') || !!document.querySelector('.project-link')) && (!document.querySelector('#project-detail-content') || !!document.querySelector('.project-gallery-item'))`);
          if (ready) break;
          await pause(150);
        }
        if (!ready) throw Error('Página no preparada: ' + url);
        await evaluate('document.fonts.ready.then(()=>true)');
        const total = await evaluate('document.documentElement.scrollHeight');
        for (let top=0;top<total;top+=Math.max(300,height-120)) {
          await evaluate(`scrollTo({top:${top},behavior:'instant'})`);
          await pause(100);
        }
        await evaluate(`Promise.race([Promise.all([...document.images].map(img=>img.decode().catch(()=>false))),new Promise(resolve=>setTimeout(resolve,15000))]).then(()=>true)`);
        await evaluate('scrollTo({top:0,behavior:"instant"})');
        await pause(150);
        const audit = await evaluate(`(() => {
          const root=document.documentElement;
          const visible=el=>el.getClientRects().length && getComputedStyle(el).visibility!=='hidden';
          const textClips=[...document.querySelectorAll('h1,h2,h3,p,.service-title,.project-caption,.project-detail-title')].filter(el=>visible(el) && (el.scrollWidth>el.clientWidth+2 || el.scrollHeight>el.clientHeight+2)).map(el=>({tag:el.tagName,class:el.className,text:el.textContent.trim().slice(0,100)}));
          const images=[...document.images].filter(visible).map(img=>({src:new URL(img.src).pathname,loaded:img.complete&&img.naturalWidth>0,fit:getComputedStyle(img).objectFit,displayWidth:img.getBoundingClientRect().width,displayHeight:img.getBoundingClientRect().height,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight}));
          const containers=[...document.querySelectorAll('main .site-container')].map(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:root.clientWidth-r.right}});
          return {width:innerWidth,height:innerHeight,documentHeight:root.scrollHeight,clientWidth:root.clientWidth,scrollWidth:root.scrollWidth,textClips,images,containers};
        })()`);
        const capture = await captureFullPage(`${name}-${device}-${width}.png`);
        report.results.push({page:url,...audit,...capture});
        console.log(`${capture.filename}: ${capture.pngWidth} × ${capture.pngHeight}`);
        if (name === 'ficha-salamanca') {
          await evaluate('document.querySelector(".project-gallery-item").click()');
          await evaluate('document.querySelector("#project-lightbox-image").decode().then(()=>true)');
          await pause(200);
          const viewer = await captureFullPage(`visor-${device}-${width}.png`);
          report.results.push({page:url,viewer:true,width,height,...viewer});
          await evaluate('closeProjectLightbox()');
          console.log(`${viewer.filename}: ${viewer.pngWidth} × ${viewer.pngHeight}`);
        }
      }
    }
    return;
  }
  const sizes = [[320, 640], [375, 812], [390, 844], [430, 932], [600, 800], [768, 1024], [844, 390], [1024, 768], [1280, 800], [1440, 900]];
  const localResources = new Set();
  for (const page of pages) {
    await send('Page.navigate', { url: base + page });
    for (let i = 0; i < 80; i++) {
      if (await evaluate(`document.readyState === 'complete' && !!document.querySelector('header nav') && getComputedStyle(document.querySelector('header')).position === 'fixed'`)) break;
      await pause(200);
    }
    await evaluate('document.fonts.ready.then(() => true)');
    if (!await evaluate(`getComputedStyle(document.querySelector('header')).position === 'fixed'`)) throw Error('Tailwind no cargó; no se puede verificar la composición');
    for (const resource of await evaluate(`[...document.querySelectorAll('a[href], img[src], script[src], link[rel="stylesheet"]')].map(el => el.href || el.src).filter(url => url.startsWith(location.origin))`)) localResources.add(resource);
    for (const [width, height] of sizes) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
      await send('Emulation.setTouchEmulationEnabled', { enabled: width < 1280 });
      await pause(60);
      const metrics = await evaluate(`(() => {
        const width = innerWidth;
        const visible = el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) && getComputedStyle(el).visibility !== 'hidden';
        const rect = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
        const offenders = [...document.querySelectorAll('body *')].filter(el => visible(el) && (el.getBoundingClientRect().right > width + 1 || el.getBoundingClientRect().left < -1)).slice(0, 12).map(el => ({ tag: el.tagName, id: el.id, class: el.className, ...rect(el) }));
        const header = document.querySelector('body > header, #site-header > header');
        const nav = header.querySelector('nav');
        const logos = [...header.querySelectorAll('img')];
        return { width, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, offenders, header: rect(header), desktopNav: visible(nav), navOverlapsLogos: visible(nav) && nav.getBoundingClientRect().left < logos[logos.length-1].getBoundingClientRect().right, logoRects: logos.map(rect), content: rect(document.querySelector('main')), projectMissing: document.querySelector('#project-detail-content')?.textContent.includes('Proyecto no encontrado.') || false, servicesColumns: document.querySelector('.services-grid') ? getComputedStyle(document.querySelector('.services-grid')).gridTemplateColumns : null };
      })()`);
      report.results.push({ page, ...metrics });
      if (phase !== 'before' && [320, 390, 768, 1024, 1440].includes(width) && ['/index.html', '/nosotros/index.html', '/servicios/index.html', '/proyectos/index.html', '/contacto/index.html', '/proyectos/detalle.html?slug=vivienda-salamanca'].includes(page)) {
        await evaluate(`document.querySelector('#home-about, main').scrollIntoView({behavior:'instant',block:'start'})`);
        await pause(100);
        const capture = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
        fs.writeFileSync(path.join(out, `${page.split('?')[0].replaceAll('/', '-').replace('.html', '')}-${width}.png`), Buffer.from(capture.data, 'base64'));
        await evaluate('scrollTo({top:0,behavior:"instant"})');
      }
    }
    console.log('Revisado: ' + page);
  }
  for (const resource of localResources) {
    const response = await fetch(resource, { method:'HEAD' });
    if (!response.ok) report.brokenLocalResources.push({url:resource.replace(base,''),status:response.status});
  }
  console.log('Recursos locales comprobados: ' + localResources.size);
  for (const page of ['/contacto/', '/trabaja-con-nosotros/']) {
    await send('Page.navigate', { url:base + page });
    await pause(800);
    report.interactions.push(await evaluate(`(() => {
      const form = document.querySelector('form');
      return { name:'form', path:location.pathname, blocksEmpty:!form.checkValidity(), fields:[...form.querySelectorAll('input:not([type="checkbox"]), textarea')].map(field => ({type:field.type,name:field.getAttribute('aria-label') || field.labels?.[0]?.textContent || '',width:field.getBoundingClientRect().width})) };
    })()`));
  }
  // Menú a 320 px: abrir/cerrar, estado accesible y altura en paisaje.
  await send('Page.navigate', { url: base + '/index.html' });
  await pause(1200);
  await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 640, deviceScaleFactor: 1, mobile: false });
  report.interactions.push(await evaluate(`(() => {
    const button = document.querySelector('header button');
    button.click(); const open = !document.querySelector('#mobile-menu').classList.contains('hidden');
    const aria = button.getAttribute('aria-expanded');
    button.click(); return { name:'menu', open, closed: document.querySelector('#mobile-menu').classList.contains('hidden'), aria };
  })()`));
  await send('Page.navigate', { url: base + '/proyectos/index.html' });
  await pause(1000);
  report.interactions.push(await evaluate(`(() => {
    const buttons = [...document.querySelectorAll('.project-filter')];
    return { name:'filters', results: buttons.map(button => { const category = button.dataset.cat; [...document.querySelectorAll('.project-filter')].find(item => item.dataset.cat === category).click(); return { category, count:document.querySelectorAll('#proyectos-gallery-grid > a').length, selected: document.querySelector('[aria-pressed="true"]')?.dataset.cat }; }) };
  })()`));
  await send('Page.navigate', { url: base + '/proyectos/detalle.html?slug=vivienda-salamanca' });
  await pause(1000);
  await evaluate('scrollTo({top:100,behavior:"instant"}); document.querySelector(".project-gallery-item").click()');
  await pause(200);
  for (const [width, height] of [[320,640],[390,844],[844,390],[768,1024],[1024,768],[1440,900]]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
    await pause(100);
    report.interactions.push(await evaluate(`(() => { const image = document.querySelector('#project-lightbox-image'); const r = image.getBoundingClientRect(); const strip = document.querySelector('.project-lightbox-thumbs').getBoundingClientRect(); return { name:'lightbox-layout', width:innerWidth, height:innerHeight, image:{x:r.x,y:r.y,w:r.width,h:r.height}, fits:r.left>=0 && r.right<=innerWidth && r.top>=0 && r.bottom<=innerHeight, stripFits:strip.left>=-1 && strip.right<=innerWidth+1, fit:getComputedStyle(image).objectFit }; })()`));
    if (phase !== 'before') {
      const capture = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(out, `lightbox-${width}.png`), Buffer.from(capture.data, 'base64'));
    }
  }
  await send('Input.dispatchKeyEvent', { type:'keyDown', key:'ArrowRight', code:'ArrowRight' });
  report.interactions.push(await evaluate(`({name:'keyboard-next',counter:document.querySelector('.project-lightbox-counter').textContent})`));
  await send('Emulation.setDeviceMetricsOverride', { width:390,height:844,deviceScaleFactor:1,mobile:false });
  await send('Input.dispatchTouchEvent', { type:'touchStart',touchPoints:[{x:260,y:350}] });
  await send('Input.dispatchTouchEvent', { type:'touchMove',touchPoints:[{x:100,y:350}] });
  await send('Input.dispatchTouchEvent', { type:'touchEnd',touchPoints:[] });
  report.interactions.push(await evaluate(`({name:'swipe-next',counter:document.querySelector('.project-lightbox-counter').textContent})`));
  await send('Input.dispatchKeyEvent', { type:'keyDown',key:'Escape',code:'Escape' });
  report.interactions.push(await evaluate(`({name:'escape',closed:!document.querySelector('#project-lightbox'),unlocked:document.body.style.overflow!=='hidden',restoredScroll:scrollY})`));
  await send('Emulation.setEmulatedMedia', { features:[{name:'prefers-reduced-motion',value:'reduce'}] });
  await send('Page.navigate', {url:base + '/index.html'});
  await pause(900);
  const initialHero = await evaluate('document.querySelector("#hero-img").src');
  await pause(2700);
  const reduced = await evaluate(`({name:'reduced-motion', hero:document.querySelector('#hero-img').src, scroll:getComputedStyle(document.documentElement).scrollBehavior, transition:getComputedStyle(document.querySelector('#home-projects-preview img')).transitionDuration})`);
  reduced.heroStable = reduced.hero === initialHero;
  report.interactions.push(reduced);
})().catch(error => { report.errors.push(error.stack); process.exitCode = 1; }).finally(() => {
  fs.mkdirSync(out, { recursive:true });
  fs.writeFileSync(path.join(out, `${phase}.json`), JSON.stringify(report, null, 2));
  const overflows = report.results.filter(result => result.scrollWidth > result.width + 1);
  console.log(JSON.stringify({ views:report.results.length, overflowViews:overflows.map(({page,width,scrollWidth})=>({page,width,scrollWidth})), missingProjects:[...new Set(report.results.filter(result=>result.projectMissing).map(result=>result.page))], interactions:report.interactions, errors:report.errors }, null, 2));
  socket?.close();
  browser?.kill();
  server.close();
});
