const state={goal:'half',fit:'wide',focus:'balanced',budget:'999'};
const els={q:document.getElementById('q'),category:document.getElementById('category'),grid:document.getElementById('grid'),count:document.getElementById('count'),topResults:document.getElementById('topResults'),rotation:document.getElementById('rotation'),summary:document.getElementById('summary')};
[...new Set(SHOES.map(s=>s.category))].sort().forEach(c=>{let o=document.createElement('option');o.value=c;o.textContent=c;els.category.appendChild(o)});
let selected=new Set(JSON.parse(localStorage.getItem('selectedShoesV5')||'[]'));
function widthClass(s){return s.widthScore>=85?'good':s.widthScore<75?'bad':'warn'}
function score(s){
 let g=state.goal,f=state.fit,focus=state.focus,b=0;
 if(g==='5k')b=s.speed*.34+s.tempo*.28+s.race*.18+s.value*.10+s.stability*.05+s.daily*.05;
 if(g==='10k')b=s.speed*.28+s.tempo*.28+s.race*.16+s.daily*.12+s.cushion*.08+s.value*.08;
 if(g==='10miler')b=s.tempo*.24+s.longrun*.22+s.speed*.18+s.cushion*.14+s.daily*.12+s.value*.10;
 if(g==='half'||g==='sub2')b=s.daily*.22+s.longrun*.25+s.tempo*.20+s.speed*.14+s.cushion*.10+s.stability*.05+s.value*.04;
 if(g==='marathon')b=s.longrun*.32+s.cushion*.22+s.daily*.16+s.stability*.12+s.tempo*.10+s.value*.08;
 if(g==='ultra')b=s.longrun*.35+s.cushion*.25+s.stability*.18+s.recovery*.12+s.value*.10;
 if(g==='daily')b=s.daily*.32+s.cushion*.18+s.stability*.15+s.value*.15+s.recovery*.10+s.longrun*.10;
 if(g==='speed')b=s.speed*.32+s.tempo*.30+s.race*.18+s.value*.10+s.daily*.10;
 if(g==='comfort')b=s.recovery*.34+s.cushion*.30+s.widthScore*.15+s.stability*.12+s.value*.09;
 if(f==='wide')b+=(s.widthScore-75)*.28;
 if(f==='extraWide')b+=(s.widthScore-75)*.45;
 if(f==='standard')b+=Math.min(s.widthScore,85)*.03;
 if(f==='narrow')b+=s.speed*.04;
 if(focus==='cushion')b+=s.cushion*.18;
 if(focus==='speed')b+=s.speed*.18;
 if(focus==='stable')b+=s.stability*.18;
 if(focus==='value')b+=s.value*.20-(s.price>200?4:0);
 if(focus==='nonplate'&&s.plate==='No')b+=8;
 if(focus==='nonplate'&&s.plate!=='No')b-=7;
 if(focus==='race')b+=s.race*.18;
 return Math.round(Math.max(0,Math.min(100,b)));
}
function bar(l,v){return `<div class="scoreRow"><span>${l}</span><div class="bar"><div class="fill" style="width:${v}%"></div></div><b>${v}</b></div>`}
function brandMark(s){return `<div class="brandMark">${s.brand}</div>`}
function filtered(){
 let max=Number(state.budget||999),q=els.q.value.toLowerCase().trim();
 let list=SHOES.filter(s=>s.price<=max);
 if(q)list=list.filter(s=>JSON.stringify(s).toLowerCase().includes(q));
 if(els.category.value)list=list.filter(s=>s.category===els.category.value);
 return list.sort((a,b)=>score(b)-score(a));
}
function topCard(s,i){return `<article class="topCard">${brandMark(s)}<span class="pill good">#${i+1} Match</span><h3>${s.name}</h3><div class="meta">${s.brand} • ${s.category} • $${s.price}</div><div class="pillRow"><span class="pill ${widthClass(s)}">👣 ${s.width}</span><span class="pill">Match ${score(s)}</span><span class="pill">Plate: ${s.plate}</span></div><p>${s.note}</p>${bar('Fit',s.widthScore)}${bar('Cushion',s.cushion)}${bar('Speed',s.speed)}<a class="linkbtn" href="${s.link}" target="_blank">Shop / info</a></article>`}
function card(s,i){let checked=selected.has(s.id);return `<article class="card" data-id="${s.id}">${brandMark(s)}<div class="cardTop"><div><div class="name">${i}. ${s.name}</div><div class="meta">${s.brand} • ${s.category} • $${s.price}</div></div><div class="match">${score(s)}</div></div><div class="pillRow"><span class="pill ${widthClass(s)}">👣 ${s.width}</span><span class="pill">☁️ ${s.cushion}</span><span class="pill">⚡ ${s.speed}</span><span class="pill">💰 ${s.value}</span></div><p class="small">${s.note}</p>${bar('Fit',s.widthScore)}${bar('Speed',s.speed)}<div class="actions"><label onclick="event.stopPropagation()" class="checkbox"><input data-check="${s.id}" type="checkbox" ${checked?'checked':''}> Compare</label><a onclick="event.stopPropagation()" class="linkbtn" href="${s.link}" target="_blank">Info</a></div><div class="details"><div class="specs"><div class="spec"><b>Foam</b>${s.foam}</div><div class="spec"><b>Plate</b>${s.plate}</div><div class="spec"><b>Long run</b>${s.longrun}/100</div><div class="spec"><b>Tempo</b>${s.tempo}/100</div><div class="spec"><b>Recovery</b>${s.recovery}/100</div><div class="spec"><b>Race</b>${s.race}/100</div></div></div></article>`}
function renderCompare(){let p=document.getElementById('comparePanel'),g=document.getElementById('compareGrid'),list=SHOES.filter(s=>selected.has(s.id)).sort((a,b)=>score(b)-score(a));p.style.display=list.length?'block':'none';g.innerHTML=list.map(s=>`<div class="compareCard"><b>${s.name}</b><span class="small">${s.category} • $${s.price}</span>${bar('Match',score(s))}${bar('Fit',s.widthScore)}${bar('Cushion',s.cushion)}${bar('Speed',s.speed)}<button data-remove="${s.id}">Remove</button></div>`).join('')}
function renderRotation(list){let daily=list.find(s=>s.daily>88&&s.plate==='No')||list[0],workout=list.find(s=>s.tempo>90)||list[1],long=list.find(s=>s.longrun>92)||list[0],race=list.find(s=>s.race>85)||workout;els.rotation.innerHTML=[['Daily Trainer',daily],['Workout Shoe',workout],['Long Run Shoe',long],['Race / Fast Option',race]].map(([l,s])=>`<div class="rot"><b>${l}</b>${s.name}<br><span class="small">${s.category} • Score ${score(s)}</span></div>`).join('')}
function labelFor(group,val){let btn=document.querySelector(`[data-group="${group}"] [data-value="${val}"]`);return btn?btn.textContent:val}
function render(){let list=filtered();els.count.textContent=list.length;els.topResults.innerHTML=list.slice(0,5).map(topCard).join('');els.grid.innerHTML=list.map((s,i)=>card(s,i+1)).join('');renderRotation(list);renderCompare();els.summary.textContent=`Goal: ${labelFor('goal',state.goal)} • Fit: ${labelFor('fit',state.fit)} • Ride: ${labelFor('focus',state.focus)} • Budget: ${labelFor('budget',state.budget)}`;}
document.addEventListener('click',e=>{
 let choice=e.target.closest('.choiceGrid button'); if(choice){let group=choice.parentElement.dataset.group;state[group]=choice.dataset.value;choice.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('active'));choice.classList.add('active');render();return}
 let cb=e.target.closest('[data-check]'); if(cb){let id=Number(cb.dataset.check);cb.checked?selected.add(id):selected.delete(id);localStorage.setItem('selectedShoesV5',JSON.stringify([...selected]));renderCompare();return}
 let rm=e.target.closest('[data-remove]'); if(rm){selected.delete(Number(rm.dataset.remove));localStorage.setItem('selectedShoesV5',JSON.stringify([...selected]));render();return}
 let c=e.target.closest('.card'); if(c)c.classList.toggle('open');
});
['input','change'].forEach(ev=>['q','category'].forEach(id=>els[id].addEventListener(ev,render)));
document.getElementById('reset').onclick=()=>{els.q.value='';els.category.value='';state.goal='half';state.fit='wide';state.focus='balanced';state.budget='999';document.querySelectorAll('.choiceGrid').forEach(g=>g.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.value===state[g.dataset.group])));render()};
render();