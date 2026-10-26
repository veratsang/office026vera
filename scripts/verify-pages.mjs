import fs from 'node:fs';
import path from 'node:path';
const root='artifacts/office026vera-portfolio/dist/public';
const base='/office026vera/';
let checked=0;
function check(url){
 if(/^(https?:|data:|mailto:|#)/.test(url)) return;
 if(!url.startsWith(base)) throw new Error('Incorrect base: '+url);
 const file=path.join(root,decodeURIComponent(url.slice(base.length)).split(/[?#]/)[0]);
 if(!fs.existsSync(file)) throw new Error('Missing asset: '+file);
 checked++;
}
const html=fs.readFileSync(root+'/index.html','utf8');
for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g))check(m[1]);
for(const f of fs.readdirSync(root+'/assets')){
 if(!/\.(css|js)$/.test(f))continue;
 const t=fs.readFileSync(root+'/assets/'+f,'utf8');
 for(const m of t.matchAll(/\/office026vera\/assets\/[^"'\s)]+/g))check(m[0]);
 if(f.endsWith('.css') && /fonts.googleapis.com|fonts.gstatic.com/.test(t))throw new Error('External font');
}
console.log('PASS: '+checked+' subpath asset references exist.');
