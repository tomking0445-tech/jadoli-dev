const fs=require("fs");
eval(fs.readFileSync(__dirname+"/i18n.js","utf8")+";global.T=T;global.base=base;");
const esc=v=>String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const strip=s=>s.replace(/<[^>]+>/g,"");
const site="https://tomking0445-tech.github.io/jadoli-dev/";
const order=["mc","auto","web","bot"];
function page(lang){
const d=T[lang];const items=base.map((b,i)=>({...b,p:d.p[i]}));
let txt=`# ${d.title}\n\n${strip(d.intro1)}\n${d.intro2}\n\nDiscord: https://discord.gg/MBmmrEFRuz (erwq_)\nSite: ${site}?lang=${lang}\n`;
let html=`<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(d.title)}</title><meta name="description" content="${esc(d.desc)}"><style>body{font-family:sans-serif;max-width:860px;margin:40px auto;padding:0 20px;line-height:1.7;color:#1d2420}h2{margin-top:48px;border-top:1px solid #ddd;padding-top:24px}h3{margin-bottom:4px}.k{color:#2f6b22;font-weight:600}img{max-width:100%;border:1px solid #ddd;margin:8px 0}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #ddd;padding:8px;text-align:left}</style></head><body><h1>${esc(d.name)}</h1><p>${d.intro1}</p><p>${esc(d.intro2)}</p><p><a href="https://discord.gg/MBmmrEFRuz">Discord</a> (erwq_) | <a href="${site}?lang=${lang}">${esc(d.navWorks)}</a></p>`;
for(const g of order){const list=items.filter(x=>x.c===g);if(!list.length)continue;
html+=`<h2>${esc(d.groups[g])}</h2>`;txt+=`\n## ${d.groups[g]}\n`;
for(const x of list){const [title,sub,status,desc,feat,tags,kind,story]=x.p;
html+=`<h3>${esc(title)}</h3><p class="k">${esc(kind)}${status?" | "+esc(status):""}</p><p><b>${esc(sub)}</b></p><p>${esc(desc).replace(/\n/g,"<br>")}</p><ul>${feat.map(f=>`<li>${esc(f)}</li>`).join("")}</ul><p>${esc(d.tech+tags.join(", "))}</p>`;
txt+=`\n### ${title}\n[${kind}${status?" | "+status:""}] ${sub}\n${desc}\n${feat.map(f=>"- "+f).join("\n")}\n${d.tech}${tags.join(", ")}\n`;
if(x.l){html+=`<p><a href="${x.l}">${esc(x.l)}</a></p>`;txt+=`${x.l}\n`;}
if(story.length){html+=`<h4>${esc(d.storyH)}</h4><dl>${story.map(([k,v])=>`<dt><b>${esc(k)}</b></dt><dd>${esc(v)}</dd>`).join("")}</dl>`;txt+=`${d.storyH}:\n${story.map(([k,v])=>`- ${k}: ${v}`).join("\n")}\n`;}
html+=(x.g||[x.t]).map(s=>`<img src="${s}" alt="${esc(title)}" loading="lazy">`).join("");}}
html+=`<h2>${esc(d.priceH)}</h2><p>${esc(d.priceLead)}</p><table><tr><th>${esc(d.th1)}</th><th>${esc(d.th2)}</th><th>${esc(d.th4)}</th><th>${esc(d.th3)}</th></tr>${d.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table><h3>${esc(d.stepsH)}</h3><ol>${d.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol><h3>${esc(d.policyH)}</h3><ul>${d.policy.map(s=>`<li>${esc(s)}</li>`).join("")}</ul><h2>${esc(d.contactH)}</h2><p>${esc(d.contactP)}</p><p><a href="https://discord.gg/MBmmrEFRuz">Discord</a></p></body></html>`;
txt+=`\n## ${d.priceH}\n${d.priceLead}\n${d.rows.map(r=>"- "+r.join(" | ")).join("\n")}\n\n${d.stepsH}\n${d.steps.map((s,i)=>`${i+1}. ${s}`).join("\n")}\n\n${d.policyH}\n${d.policy.map(s=>"- "+s).join("\n")}\n`;
return [html,txt];}
const [ko,kot]=page("ko"),[en,ent]=page("en");
fs.writeFileSync(__dirname+"/portfolio.html",ko);
fs.writeFileSync(__dirname+"/portfolio-en.html",en);
fs.writeFileSync(__dirname+"/llms.txt",kot+"\n\n---\n\n"+ent);
