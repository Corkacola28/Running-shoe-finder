const state={goal:'half',fit:'wide',focus:'balanced',budget:'999'};
const els={
  q:document.getElementById('q'), category:document.getElementById('category'),
  grid:document.getElementById('grid'), count:document.getElementById('count'),
  topResults:document.getElementById('topResults'), rotation:document.getElementById('rotation'),
  summary:document.getElementById('summary'), aiTitle:document.getElementById('aiTitle'),
  aiSummary:document.getElementById('aiSummary'), aiReasons:document.getElementById('aiReasons')
};

[...new Set(SHOES.map(s=>s.category))].sort().forEach(c=>{
  let o=document.createElement('option'); o.value=c; o.textContent=c; els.category.appendChild(o);
});

let selected=new Set(JSON.parse(localStorage.getItem('selectedShoesV6')||'[]'));

function widthClass(s){return s.widthScore>=85?'good':s.widthScore<75?'bad':'warn'}
function labelFor(group,val){let btn=document.querySelector(`[data-group="${group}"] [data-value="${val}"]`);return btn?btn.textContent:val}

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

function bar(label,val){
  return `<div class="scoreRow"><span>${label}</span><div class="bar"><div class="fill" style="width:${val}%"></div></div><b>${val}</b></div>`;
}

function filtered(){
  let max=Number(state.budget||999), q=els.q.value.toLowerCase().trim();
  let list=SHOES.filter(s=>s.price<=max);
  if(q)list=list.filter(s=>JSON.stringify(s).toLowerCase().includes(q));
  if(els.category.value)list=list.filter(s=>s.category===els.category.value);
  return list.sort((a,b)=>score(b)-score(a));
}

function why(s){
  let reasons=[];
  if(s.widthScore>=85) reasons.push(`It is ${s.width.toLowerCase()}, which fits your current fit preference.`);
  if(state.goal==='marathon'||state.goal==='half'||state.goal==='sub2'||state.goal==='10miler') reasons.push(`It scores strongly for long runs (${s.longrun}/100), which matters for your goal.`);
  if(state.goal==='5k'||state.goal==='10k'||state.goal==='speed') reasons.push(`It has a strong speed/tempo profile (${s.speed}/100 speed, ${s.tempo}/100 tempo).`);
  if(state.focus==='cushion') reasons.push(`It matches your cushion preference with a cushion score of ${s.cushion}/100.`);
  if(state.focus==='value'||state.budget!=='999') reasons.push(`It fits the budget/value side well with a value score of ${s.value}/100.`);
  if(state.focus==='nonplate') reasons.push(s.plate==='No' ? `It has no plate, so it should feel more natural for daily miles.` : `It is plated, so it may feel firmer or more aggressive.`);
  if(!reasons.length) reasons.push(`It balances comfort, speed, stability, and value better than most shoes in the database.`);
  return reasons.slice(0,4);
}

function topCard(s,i){
  return `<article class="topCard">
    <span class="rankBadge">#${i+1} Match • ${score(s)}</span>
    <h3 class="shoeName">${s.name}</h3>
    <div class="meta">${s.brand} • ${s.category} • $${s.price} • Plate: ${s.plate}</div>
    <div class="pills"><span class="pill ${widthClass(s)}">👣 ${s.width}</span><span class="pill">☁️ ${s.cushion}</span><span class="pill">⚡ ${s.speed}</span><span class="pill">💰 ${s.value}</span></div>
    <p>${s.note}</p>
    ${bar('Fit',s.widthScore)}${bar('Cushion',s.cushion)}${bar('Speed',s.speed)}
    <div class="actions"><a class="linkbtn" href="${s.link}" target="_blank">Shop / info</a></div>
  </article>`;
}

function card(s,i){
  let checked=selected.has(s.id);
  return `<article class="shoeCard" data-id="${s.id}">
    <div class="cardTop"><div><div class="shoeName">${i}. ${s.name}</div><div class="meta">${s.brand} • ${s.category} • $${s.price}</div></div><div class="match">${score(s)}</div></div>
    <div class="pills"><span class="pill ${widthClass(s)}">👣 ${s.width}</span><span class="pill">☁️ ${s.cushion}</span><span class="pill">⚡ ${s.speed}</span><span class="pill">💰 ${s.value}</span></div>
    <p class="muted">${s.note}</p>
    ${bar('Fit',s.widthScore)}${bar('Speed',s.speed)}
    <div class="actions">
      <label onclick="event.stopPropagation()" class="checkbox"><input data-check="${s.id}" type="checkbox" ${checked?'checked':''}> Compare</label>
      <a onclick="event.stopPropagation()" class="linkbtn" href="${s.link}" target="_blank">Info</a>
    </div>
    <div class="details"><div class="specs">
      <div class="spec"><b>Foam</b>${s.foam}</div><div class="spec"><b>Plate</b>${s.plate}</div>
      <div class="spec"><b>Long run</b>${s.longrun}/100</div><div class="spec"><b>Tempo</b>${s.tempo}/100</div>
      <div class="spec"><b>Recovery</b>${s.recovery}/100</div><div class="spec"><b>Race</b>${s.race}/100</div>
    </div></div>
  </article>`;
}

function renderAI(list){
  let best=list[0];
  els.aiTitle.textContent=`${best.name} is your current best match.`;
  els.aiSummary.textContent=`Based on ${labelFor('goal',state.goal).toLowerCase()}, ${labelFor('fit',state.fit).toLowerCase()}, ${labelFor('focus',state.focus).toLowerCase()}, and ${labelFor('budget',state.budget).toLowerCase()}, this shoe currently scores ${score(best)}/100.`;
  els.aiReasons.innerHTML=why(best).map(r=>`<div class="reason">${r}</div>`).join('');
}

function renderRotation(list){
  let daily=list.find(s=>s.daily>88&&s.plate==='No')||list[0];
  let workout=list.find(s=>s.tempo>90)||list[1]||list[0];
  let long=list.find(s=>s.longrun>92)||list[0];
  let race=list.find(s=>s.race>85)||workout;
  els.rotation.innerHTML=[
    ['Daily Trainer',daily],['Workout Shoe',workout],['Long Run Shoe',long],['Race / Fast Option',race]
  ].map(([label,s])=>`<div class="rotationCard"><b>${label}</b><br>${s.name}<br><span class="muted">${s.category} • Match ${score(s)}</span></div>`).join('');
}

function renderCompare(){
  let p=document.getElementById('comparePanel'), g=document.getElementById('compareGrid');
  let list=SHOES.filter(s=>selected.has(s.id)).sort((a,b)=>score(b)-score(a));
  p.style.display=list.length?'block':'none';
  g.innerHTML=list.map(s=>`<div class="compareCard"><b>${s.name}</b><br><span class="muted">${s.category} • $${s.price}</span>${bar('Match',score(s))}${bar('Fit',s.widthScore)}${bar('Cushion',s.cushion)}${bar('Speed',s.speed)}<button data-remove="${s.id}">Remove</button></div>`).join('');
}

function render(){
  let list=filtered();
  els.count.textContent=list.length;
  els.topResults.innerHTML=list.slice(0,5).map(topCard).join('');
  els.grid.innerHTML=list.map((s,i)=>card(s,i+1)).join('');
  els.summary.textContent=`Goal: ${labelFor('goal',state.goal)} • Fit: ${labelFor('fit',state.fit)} • Ride: ${labelFor('focus',state.focus)} • Budget: ${labelFor('budget',state.budget)}`;
  renderAI(list); renderRotation(list); renderCompare();
}

document.addEventListener('click',e=>{
  let choice=e.target.closest('.chips button');
  if(choice){
    let group=choice.parentElement.dataset.group;
    state[group]=choice.dataset.value;
    choice.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
    choice.classList.add('active');
    render(); return;
  }
  let cb=e.target.closest('[data-check]');
  if(cb){
    let id=Number(cb.dataset.check);
    cb.checked?selected.add(id):selected.delete(id);
    localStorage.setItem('selectedShoesV6',JSON.stringify([...selected]));
    renderCompare(); return;
  }
  let rm=e.target.closest('[data-remove]');
  if(rm){
    selected.delete(Number(rm.dataset.remove));
    localStorage.setItem('selectedShoesV6',JSON.stringify([...selected]));
    render(); return;
  }
  let card=e.target.closest('.shoeCard');
  if(card)card.classList.toggle('open');
});

['input','change'].forEach(ev=>['q','category'].forEach(id=>els[id].addEventListener(ev,render)));
document.getElementById('reset').onclick=()=>{
  els.q.value=''; els.category.value='';
  state.goal='half'; state.fit='wide'; state.focus='balanced'; state.budget='999';
  document.querySelectorAll('.chips').forEach(g=>g.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.value===state[g.dataset.group])));
  render();
};
render();