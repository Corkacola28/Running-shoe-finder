const state={
  intent:'dailyTrainer',
  goal:'half',
  fit:'wide',
  focus:'balanced',
  budget:'999',
  liked:'',
  avoid:''
};

let questionIndex=0;
let selectedChoice=null;

const questions=[
  {
    key:'intent',
    title:'What are you looking for today?',
    sub:'This is the most important question. It tells ShoeAI whether to prioritize racing, workouts, daily miles, recovery, stability, value, or a rotation.',
    assistant:'What kind of shoe are you shopping for?',
    options:[
      ['firstShoe','My first running shoe','Simple, safe, beginner-friendly picks.'],
      ['dailyTrainer','Daily trainer','A shoe for most of your weekly mileage.'],
      ['raceDay','Race-day shoe','Carbon racers and fast shoes for PR attempts.'],
      ['tempoWorkout','Tempo / workout shoe','Faster trainers for intervals, tempo, and progression runs.'],
      ['longRun','Long-run shoe','Cushioned shoes for longer efforts.'],
      ['recovery','Recovery shoe','Soft, comfortable, easy-day shoes.'],
      ['stability','Stability / support','Supportive shoes for extra guidance.'],
      ['valuePick','Best value','Strong shoes without overspending.'],
      ['rotation','Build me a rotation','Daily, workout, long-run, race, and recovery options.'],
      ['notSure','I’m not sure','Let ShoeAI choose based on your answers.']
    ]
  },
  {
    key:'goal',
    title:'What are you training for?',
    sub:'This helps adjust the ranking toward short-race speed, long-run comfort, marathon durability, or everyday mileage.',
    assistant:'What distance or goal matters most right now?',
    options:[
      ['5k','5K','Speed, pop, and quick turnover.'],
      ['10k','10K','Fast but still cushioned enough.'],
      ['10miler','10 miler','A blend of tempo and long-run comfort.'],
      ['half','Half marathon','Balanced comfort, speed, and durability.'],
      ['sub2','Sub-2 half','More emphasis on tempo and efficiency.'],
      ['marathon','Full marathon','Long-run comfort and race-specific durability.'],
      ['ultra','Ultra / very long runs','Durability, cushion, and protection.'],
      ['daily','General fitness','Reliable daily mileage and comfort.']
    ]
  },
  {
    key:'fit',
    title:'How does your foot usually fit?',
    sub:'Wide-foot compatibility can completely change what ShoeAI recommends.',
    assistant:'How would you describe your foot fit?',
    options:[
      ['narrow','Narrow','You can tolerate performance fits.'],
      ['standard','Standard','Most shoes usually work.'],
      ['wide','Wide','You need a more accommodating fit.'],
      ['extraWide','Extra-wide / toe box','Prioritize roomy forefoot shapes.'],
      ['unknown','Not sure','Keep recommendations balanced.']
    ]
  },
  {
    key:'focus',
    title:'What matters most in the ride?',
    sub:'This tunes the recommendation toward cushion, speed, stability, value, or a natural non-plated feel.',
    assistant:'What do you want the shoe to feel like?',
    options:[
      ['balanced','Balanced','A little bit of everything.'],
      ['cushion','Soft / max cushion','Comfort first.'],
      ['speed','Fast + bouncy','Energy return and quick turnover.'],
      ['stable','Stable / supportive','More secure underfoot.'],
      ['value','Best value','Performance for the money.'],
      ['nonplate','No plate','Natural daily feel.'],
      ['race','Aggressive race feel','Fast, sharp, and performance-first.']
    ]
  },
  {
    key:'budget',
    title:'What budget feels right?',
    sub:'Race shoes can be expensive, so ShoeAI lets you choose anything from value picks to no limit.',
    assistant:'How much do you want to spend?',
    options:[
      ['150','Under $150','Value-first picks.'],
      ['180','Under $180','Most trainers included.'],
      ['220','Under $220','Most super trainers included.'],
      ['300','Under $300','Most racers included.'],
      ['400','Under $400','Premium shoes included.'],
      ['500','Under $500','Ultra-premium racers included.'],
      ['999','No limit','Show the best match regardless of price.']
    ]
  },
  {
    key:'liked',
    title:'Any shoes you already liked?',
    sub:'Optional, but very useful. Past shoes are one of the best clues for future recommendations.',
    assistant:'Type any shoes or brands that worked well for you.',
    input:true,
    placeholder:'Example: Novablast, Pegasus, Ghost, Clifton, Superblast...'
  },
  {
    key:'avoid',
    title:'Anything you want to avoid?',
    sub:'Optional. This can include brands, narrow fits, plated shoes, firm rides, or models you disliked.',
    assistant:'Type anything you want ShoeAI to avoid.',
    input:true,
    placeholder:'Example: narrow, plated, firm, adidas, HOKA...'
  }
];

const intentLabels={
  firstShoe:'First running shoe',
  raceDay:'Race-day shoe',
  tempoWorkout:'Tempo / workout trainer',
  dailyTrainer:'Daily trainer',
  longRun:'Long-run shoe',
  recovery:'Recovery / max cushion',
  stability:'Stability / support',
  valuePick:'Best value',
  rotation:'Full rotation',
  notSure:'Not sure'
};

const els={
  conversationStep:document.getElementById('conversationStep'),
  chatWindow:document.getElementById('chatWindow'),
  aiQuestionTitle:document.getElementById('aiQuestionTitle'),
  aiQuestionSub:document.getElementById('aiQuestionSub'),
  q:document.getElementById('q'),
  category:document.getElementById('category'),
  intentFilter:document.getElementById('intentFilter'),searchHint:document.getElementById('searchHint'),
  grid:document.getElementById('grid'),
  count:document.getElementById('count'),
  liveTitle:document.getElementById('liveTitle'),
  liveSummary:document.getElementById('liveSummary'),
  liveReasons:document.getElementById('liveReasons'),
  reportSummary:document.getElementById('reportSummary'),
  perfectMatch:document.getElementById('perfectMatch'),
  topFive:document.getElementById('topFive'),
  nearMisses:document.getElementById('nearMisses'),
  avoidList:document.getElementById('avoidList'),
  rotation:document.getElementById('rotation')
};

[...new Set(SHOES.map(s=>s.category))].sort().forEach(c=>{
  const o=document.createElement('option');
  o.value=c;
  o.textContent=c;
  els.category.appendChild(o);
});

let selected=new Set(JSON.parse(localStorage.getItem('selectedShoesV13')||'[]'));
let activeSearchQuery='';

function mappedIntent(){
  if(state.intent==='firstShoe') return 'dailyTrainer';
  if(state.intent==='notSure') return 'rotation';
  return state.intent;
}

function widthClass(s){return s.widthScore>=85?'good':s.widthScore<75?'bad':'warn'}
function labelFor(key,val){
  const q=questions.find(x=>x.key===key);
  if(!q || !q.options) return val;
  const hit=q.options.find(x=>x[0]===val);
  return hit ? hit[1] : val;
}
function likedTerms(){return (state.liked||'').toLowerCase().split(',').map(x=>x.trim()).filter(Boolean)}
function avoidTerms(){return (state.avoid||'').toLowerCase().split(',').map(x=>x.trim()).filter(Boolean)}

function baseGoalScore(s){
  const g=state.goal; let b=0;
  if(g==='5k')b=s.speed*.34+s.tempo*.28+s.race*.18+s.value*.10+s.stability*.05+s.daily*.05;
  if(g==='10k')b=s.speed*.28+s.tempo*.28+s.race*.16+s.daily*.12+s.cushion*.08+s.value*.08;
  if(g==='10miler')b=s.tempo*.24+s.longrun*.22+s.speed*.18+s.cushion*.14+s.daily*.12+s.value*.10;
  if(g==='half'||g==='sub2')b=s.daily*.22+s.longrun*.25+s.tempo*.20+s.speed*.14+s.cushion*.10+s.stability*.05+s.value*.04;
  if(g==='marathon')b=s.longrun*.32+s.cushion*.22+s.daily*.16+s.stability*.12+s.tempo*.10+s.value*.08;
  if(g==='ultra')b=s.longrun*.35+s.cushion*.25+s.stability*.18+s.recovery*.12+s.value*.10;
  if(g==='daily')b=s.daily*.32+s.cushion*.18+s.stability*.15+s.value*.15+s.recovery*.10+s.longrun*.10;
  return b;
}

function score(s){
  const intent=mappedIntent();
  let b=(s.intent?.[intent]??s.daily)*.62 + baseGoalScore(s)*.23 + s.value*.05 + s.stability*.05 + s.cushion*.05;

  if(state.intent==='firstShoe'){
    b += s.stability*.09 + s.value*.08 + s.daily*.09;
    if(s.plate!=='No') b -= 10;
    if(s.price>180) b -= 4;
  }
  if(state.intent==='notSure'){
    b += s.daily*.1 + s.longrun*.08 + s.value*.05;
  }

  if(state.fit==='wide')b+=(s.widthScore-75)*.25;
  if(state.fit==='extraWide')b+=(s.widthScore-75)*.43;
  if(state.fit==='standard'||state.fit==='unknown')b+=Math.min(s.widthScore,85)*.025;
  if(state.fit==='narrow')b+=s.speed*.035;

  if(state.focus==='cushion')b+=s.cushion*.13;
  if(state.focus==='speed')b+=s.speed*.13;
  if(state.focus==='stable')b+=s.stability*.13;
  if(state.focus==='value')b+=s.value*.16-(s.price>200?4:0);
  if(state.focus==='nonplate'&&s.plate==='No')b+=8;
  if(state.focus==='nonplate'&&s.plate!=='No')b-=8;
  if(state.focus==='race')b+=s.race*.14;

  if(state.intent==='raceDay'&&s.race<70)b-=12;
  if(state.intent==='tempoWorkout'&&s.tempo<78)b-=10;
  if(state.intent==='recovery'&&s.recovery<80)b-=12;
  if(state.intent==='stability'&&s.stability<86)b-=12;
  if(state.intent==='dailyTrainer'&&s.daily<80)b-=8;

  likedTerms().forEach(t=>{if(JSON.stringify(s).toLowerCase().includes(t))b+=5});
  avoidTerms().forEach(t=>{
    if(JSON.stringify(s).toLowerCase().includes(t))b-=10;
    if(t==='narrow'&&s.widthScore<75)b-=12;
    if(t==='plated'&&s.plate!=='No')b-=10;
    if(t==='firm'&&s.cushion<82)b-=8;
  });

  return Math.round(Math.max(0,Math.min(100,b)));
}

function normalizeText(text){
  return String(text||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}

function shoeSearchBlob(s){
  return normalizeText(`${s.name} ${s.brand} ${s.category} ${s.foam} ${s.note}`);
}

function searchRelevance(s, q){
  if(!q) return 0;
  const nq=normalizeText(q);
  const name=normalizeText(s.name);
  const brand=normalizeText(s.brand);
  const blob=shoeSearchBlob(s);
  if(name===nq) return 1000;
  if(name.includes(nq)) return 900;
  if(`${brand} ${name}`.includes(nq)) return 850;
  const terms=nq.split(/\s+/).filter(Boolean);
  let hits=terms.filter(t=>blob.includes(t)).length;
  return hits ? 500 + hits*40 : 0;
}

function filtered(){
  const max=Number(state.budget||999);
  const rawQ=(activeSearchQuery || els.q.value || '').trim();
  const hasSearch=rawQ.length>0;
  let list=SHOES.filter(s=>s.price<=max);

  if(hasSearch){
    list=list
      .map(s=>({...s,_searchRelevance:searchRelevance(s,rawQ)}))
      .filter(s=>s._searchRelevance>0);
    return list.sort((a,b)=>(b._searchRelevance-a._searchRelevance)||(score(b)-score(a)));
  }

  if(els.category.value)list=list.filter(s=>s.category===els.category.value);
  if(els.intentFilter.value)list=list.filter(s=>(s.intent?.[els.intentFilter.value]??0)>=78);
  return list.sort((a,b)=>score(b)-score(a));
}

function bar(l,v){return `<div class="scoreRow"><span>${l}</span><div class="bar"><div class="fill" style="width:${v}%"></div></div><b>${v}</b></div>`}

function why(s){
  const intent=mappedIntent();
  let r=[];
  if(state.intent==='firstShoe') r.push('This is beginner-friendly because it balances daily comfort, stability, and value.');
  else if(state.intent==='notSure') r.push('This is a safe all-around pick because you were not sure what category you needed.');
  else r.push(`Strong ${intentLabels[state.intent].toLowerCase()} fit: ${s.intent?.[intent]??score(s)}/100 for this shoe purpose.`);
  if(s.widthScore>=85)r.push(`Good fit compatibility: ${s.width.toLowerCase()}.`);
  if(state.intent==='raceDay')r.push(`Race score ${s.race}/100 and speed score ${s.speed}/100.`);
  if(state.intent==='tempoWorkout')r.push(`Tempo score ${s.tempo}/100 for faster sessions.`);
  if(state.intent==='dailyTrainer'||state.intent==='firstShoe')r.push(`Daily training score ${s.daily}/100.`);
  if(state.intent==='longRun')r.push(`Long-run score ${s.longrun}/100.`);
  if(state.intent==='recovery')r.push(`Recovery score ${s.recovery}/100 and cushion score ${s.cushion}/100.`);
  if(state.intent==='stability')r.push(`Stability/support score ${s.stability}/100.`);
  if(state.intent==='valuePick')r.push(`Value score ${s.value}/100 with a listed price around $${s.price}.`);
  if(s.longevityMiles)r.push(`Estimated longevity: ${s.longevityMiles}.`);
  return r.slice(0,5);
}

function downside(s){
  let d=[];
  if(s.price>250)d.push('Premium price; not ideal if value is the top priority.');
  if(s.widthScore<75)d.push('Potentially narrow or risky for wide feet.');
  if((state.intent==='dailyTrainer'||state.intent==='firstShoe')&&s.plate!=='No')d.push('Plated design may be less relaxed for easy daily mileage.');
  if(state.intent==='raceDay'&&s.plate==='No'&&s.race<90)d.push('May not feel as aggressive as a true race-day super shoe.');
  if(state.intent==='recovery'&&s.speed>92)d.push('May feel too performance-oriented for pure recovery days.');
  if(!d.length)d.push('No major concerns based on your selected purpose.');
  return d;
}

function dna(s){
  let tags=[];
  if(s.intent?.raceDay>=86)tags.push('Race day');
  if(s.intent?.tempoWorkout>=88)tags.push('Tempo');
  if(s.intent?.dailyTrainer>=88)tags.push('Daily');
  if(s.intent?.longRun>=90)tags.push('Long runs');
  if(s.intent?.recovery>=90)tags.push('Recovery');
  if(s.intent?.stability>=92)tags.push('Stability');
  if(s.intent?.valuePick>=92)tags.push('Value');
  if(s.widthScore>=85)tags.push('Wide-friendly');
  if(s.plate!=='No')tags.push('Plated');
  if(s.longevityScore>=80)tags.push('Durable');
  return tags.slice(0,7);
}

function intentLabel(){return intentLabels[state.intent] || state.intent}

function resultCard(s,i,small=false){
  const intent=mappedIntent();
  return `<article class="${small?'miniCard':'resultCard'}">
    <span class="pill good">#${i} • ${score(s)}/100</span>
    <span class="pill intentPill">${intentLabel()}</span>
    <h3 class="shoeName">${s.name}</h3>
    <div class="meta">${s.brand} • ${s.category} • $${s.price}</div>
    <div class="pillRow">${dna(s).map(x=>`<span class="pill">${x}</span>`).join('')}</div>
    <p>${s.note}</p>
    ${bar('Purpose',s.intent?.[intent]??score(s))}
    ${bar('Longevity',s.longevityScore||70)}
    ${bar('Fit',s.widthScore)}
    ${bar('Speed',s.speed)}
    <details class="explain"><summary>Explain this recommendation</summary>
      <ul>${why(s).map(x=>`<li>${x}</li>`).join('')}</ul>
      <b>Expected longevity</b>
      <ul><li>${s.longevityMiles||'300-500 miles'} — ${s.longevityNote||'Mileage varies by runner, surface, and rotation.'}</li></ul>
      <b>Possible downsides</b>
      <ul>${downside(s).map(x=>`<li>${x}</li>`).join('')}</ul>
    </details>
    <div class="actions"><a class="linkbtn" href="${s.link}" target="_blank">Research shoe</a></div>
  </article>`;
}

function shoeCard(s,i){
  const intent=mappedIntent();
  let checked=selected.has(s.id);
  return `<article class="shoeCard" data-id="${s.id}">
    <div class="cardTop"><div><div class="shoeName">${i}. ${s.name}</div><div class="meta">${s.brand} • ${s.category} • $${s.price}</div></div><div class="match">${score(s)}</div></div>
    <div class="pillRow">
      <span class="pill intentPill">${intentLabel()}</span>
      <span class="pill ${widthClass(s)}">👣 ${s.width}</span>
      <span class="pill">Race ${s.intent?.raceDay??s.race}</span>
      <span class="pill">Tempo ${s.intent?.tempoWorkout??s.tempo}</span>
      <span class="pill">Daily ${s.intent?.dailyTrainer??s.daily}</span>
      <span class="pill">⏱ ${s.longevityMiles||'300-500 miles'}</span>
    </div>
    <p class="muted">${s.note}</p>
    ${bar('Purpose',s.intent?.[intent]??score(s))}
    ${bar('Longevity',s.longevityScore||70)}
    ${bar('Fit',s.widthScore)}
    <div class="actions">
      <label onclick="event.stopPropagation()" class="checkbox"><input data-check="${s.id}" type="checkbox" ${checked?'checked':''}> Compare</label>
      <a onclick="event.stopPropagation()" class="linkbtn" href="${s.link}" target="_blank">Research</a>
    </div>
    <div class="details"><div class="specs">
      <div class="spec"><b>Race day</b>${s.intent?.raceDay??s.race}/100</div>
      <div class="spec"><b>Tempo</b>${s.intent?.tempoWorkout??s.tempo}/100</div>
      <div class="spec"><b>Daily</b>${s.intent?.dailyTrainer??s.daily}/100</div>
      <div class="spec"><b>Long run</b>${s.intent?.longRun??s.longrun}/100</div>
      <div class="spec"><b>Recovery</b>${s.intent?.recovery??s.recovery}/100</div>
      <div class="spec"><b>Stability</b>${s.intent?.stability??s.stability}/100</div>
      <div class="spec"><b>Longevity</b>${s.longevityMiles||'300-500 miles'}</div>
      <div class="spec"><b>Durability</b>${s.longevityScore||70}/100</div>
      <div class="spec"><b>Foam</b>${s.foam}</div>
      <div class="spec"><b>Plate</b>${s.plate}</div>
    </div></div>
  </article>`;
}

function renderQuestion(){
  const q=questions[questionIndex];
  els.aiQuestionTitle.textContent=q.title;
  els.aiQuestionSub.textContent=q.sub;
  document.getElementById('backQuestion').disabled=questionIndex===0;
  document.getElementById('nextQuestion').classList.toggle('hidden',questionIndex===questions.length-1);
  document.getElementById('skipQuestion').classList.toggle('hidden',!q.input);
  document.getElementById('buildReport').classList.toggle('hidden',questionIndex!==questions.length-1);

  const progress=`<div class="questionProgress">${questions.map((_,i)=>`<span class="${i<=questionIndex?'active':''}"></span>`).join('')}</div>`;
  if(q.input){
    els.conversationStep.innerHTML=progress+`<div class="questionInputBlock"><input id="conversationInput" placeholder="${q.placeholder||''}" value="${state[q.key]||''}"></div>`;
    document.getElementById('conversationInput').addEventListener('input',e=>{
      state[q.key]=e.target.value;
      renderAll(false);
    });
  }else{
    els.conversationStep.innerHTML=progress+`<div class="choiceCards">${q.options.map(([value,title,desc])=>`<button class="choiceCard ${state[q.key]===value?'active':''}" data-value="${value}"><strong>${title}</strong><span>${desc}</span></button>`).join('')}</div>`;
  }
  renderChat();
}

function renderChat(){
  const answered=questions.slice(0,questionIndex).map(q=>{
    let value=state[q.key];
    let label=q.input ? (value||'Skipped') : labelFor(q.key,value);
    return `<div class="bubble user">${label}</div>`;
  }).join('');
  const current=`<div class="bubble assistant">${questions[questionIndex].assistant}</div>`;
  els.chatWindow.innerHTML=`<div class="bubble assistant">👋 Hi, I’m ShoeAI. I’ll help you find a shoe based on your purpose, goal, fit, ride preference, budget, and shoes you already like.</div>${answered}${current}`;
}

function renderLive(){
  let list=filtered(), b=list[0];
  els.liveTitle.textContent=`${b.name} is leading.`;
  els.liveSummary.textContent=`Current match: ${score(b)}/100 for ${intentLabel()}, ${labelFor('goal',state.goal)}, ${labelFor('fit',state.fit)}, and ${labelFor('budget',state.budget)}.`;
  els.liveReasons.innerHTML=why(b).map(x=>`<div class="reason">${x}</div>`).join('');
}

function renderRotation(){
  const by=(key)=>[...SHOES].sort((a,b)=>(b.intent?.[key]??0)-(a.intent?.[key]??0))[0];
  const daily=by('dailyTrainer'), workout=by('tempoWorkout'), long=by('longRun'), race=by('raceDay'), recovery=by('recovery');
  els.rotation.innerHTML=[
    ['Daily Trainer',daily,'dailyTrainer'],
    ['Workout Shoe',workout,'tempoWorkout'],
    ['Long Run Shoe',long,'longRun'],
    ['Race-Day Shoe',race,'raceDay'],
    ['Recovery Shoe',recovery,'recovery']
  ].map(([l,s,k])=>`<div class="rotationCard"><b>${l}</b><br>${s.name}<br><span class="muted">${s.category} • ${s.intent?.[k]??score(s)}/100</span></div>`).join('');
}

function renderReport(){
  let list=filtered(), best=list[0], intent=mappedIntent();
  els.reportSummary.textContent=`Purpose: ${intentLabel()} • Goal: ${labelFor('goal',state.goal)} • Fit: ${labelFor('fit',state.fit)} • Priority: ${labelFor('focus',state.focus)} • Budget: ${labelFor('budget',state.budget)}`;
  els.perfectMatch.innerHTML=`<div>
    <p class="eyebrow">Perfect Match</p>
    <h2>${best.name}</h2>
    <p>${best.note}</p>
    <div class="pillRow">${dna(best).map(x=>`<span class="pill">${x}</span>`).join('')}</div>
    <details class="explain" open><summary>Why this is #1 for ${intentLabel().toLowerCase()}</summary>
      <ul>${why(best).map(x=>`<li>${x}</li>`).join('')}</ul>
      <b>Expected longevity</b>
      <ul><li>${best.longevityMiles||'300-500 miles'} — ${best.longevityNote||'Mileage varies by runner, surface, and rotation.'}</li></ul>
      <b>Possible downsides</b>
      <ul>${downside(best).map(x=>`<li>${x}</li>`).join('')}</ul>
    </details>
  </div><div class="scoreHero">${score(best)}</div>`;

  els.topFive.innerHTML=list.slice(0,5).map((s,i)=>resultCard(s,i+1,true)).join('');
  els.nearMisses.innerHTML=list.slice(5,9).map(s=>`<div class="miniCard"><b>${s.name}</b><p class="muted">${s.category} • ${score(s)}/100</p><p>Close, but the top picks score better for ${intentLabel().toLowerCase()}.</p></div>`).join('');

  let avoided=[...SHOES].filter(s=>score(s)<70||s.widthScore<72||s.price>Number(state.budget||999)||(state.intent==='raceDay'&&(s.intent?.raceDay??0)<70)||(state.intent==='tempoWorkout'&&(s.intent?.tempoWorkout??0)<72)).sort((a,b)=>score(a)-score(b)).slice(0,4);
  els.avoidList.innerHTML=avoided.map(s=>`<div class="miniCard"><b>${s.name}</b><p class="muted">${s.category} • ${score(s)}/100</p><p>${s.widthScore<75?'Likely too narrow for your fit preference.':s.price>Number(state.budget||999)?'Outside your selected budget.':`Not a strong match for ${intentLabel().toLowerCase()}.`}</p></div>`).join('');
  renderRotation();
}

function renderCompare(){
  let p=document.getElementById('comparePanel'),g=document.getElementById('compareGrid');
  let list=SHOES.filter(s=>selected.has(s.id)).sort((a,b)=>score(b)-score(a));
  p.style.display=list.length?'block':'none';
  g.innerHTML=list.map(s=>`<div class="compareCard"><b>${s.name}</b><br><span class="muted">${s.category} • $${s.price}</span>${bar('Match',score(s))}${bar('Race',s.intent?.raceDay??s.race)}${bar('Tempo',s.intent?.tempoWorkout??s.tempo)}${bar('Daily',s.intent?.dailyTrainer??s.daily)}${bar('Longevity',s.longevityScore||70)}${bar('Fit',s.widthScore)}<button data-remove="${s.id}">Remove</button></div>`).join('');
}

function renderDatabase(){
  let list=filtered();
  const rawQ=(activeSearchQuery || els.q.value || '').trim();
  els.count.textContent=list.length;
  if(els.searchHint){
    if(rawQ){
      els.searchHint.innerHTML=`<span class="searchActiveNotice">Showing search results for “${rawQ}”. Intent/category filters are ignored during search so exact shoes can appear.</span>`;
    }else{
      els.searchHint.textContent='Tip: on mobile, type a shoe name and tap Search. Example: Superblast 3.';
    }
  }
  els.grid.innerHTML=list.length ? list.map((s,i)=>shoeCard(s,i+1)).join('') : `<div class="miniCard"><b>No shoes found</b><p class="muted">Try a shorter search, like “Superblast”, “Alphafly”, “Novablast”, or clear the search.</p></div>`;
}

function renderAll(updateQuestion=true){
  if(updateQuestion) renderQuestion();
  renderLive();
  renderReport();
  renderCompare();
  renderDatabase();
}

function buildFeedbackMessage(){
  const name = document.getElementById('feedbackName')?.value.trim() || 'Anonymous';
  const type = document.getElementById('feedbackType')?.value || 'General feedback';
  const text = document.getElementById('feedbackText')?.value.trim() || '';
  const profile = `Current advisor settings:
- Intent: ${intentLabel()}
- Goal: ${labelFor('goal',state.goal)}
- Fit: ${labelFor('fit',state.fit)}
- Focus: ${labelFor('focus',state.focus)}
- Budget: ${labelFor('budget',state.budget)}
- Liked shoes: ${state.liked||'None'}
- Avoid: ${state.avoid||'None'}`;
  return `Name: ${name}

Feedback type: ${type}

Feedback:
${text || '[No feedback entered]'}

${profile}

Page: ${window.location.href}`;
}

function setupFeedback(){
  const send=document.getElementById('sendFeedback');
  const copy=document.getElementById('copyFeedback');
  if(!send||!copy)return;
  send.addEventListener('click',()=>{
    const subject=encodeURIComponent('Running Shoe Finder Feedback');
    const body=encodeURIComponent(buildFeedbackMessage());
    window.location.href=`mailto:corkacola28@gmail.com?subject=${subject}&body=${body}`;
  });
  copy.addEventListener('click',async()=>{
    const message=buildFeedbackMessage();
    try{
      await navigator.clipboard.writeText(message);
      copy.textContent='Copied!';
      setTimeout(()=>copy.textContent='Copy feedback',1600);
    }catch(e){alert(message)}
  });
}

document.addEventListener('click',e=>{
  let choice=e.target.closest('.choiceCard');
  if(choice){
    const q=questions[questionIndex];
    state[q.key]=choice.dataset.value;
    document.querySelectorAll('.choiceCard').forEach(c=>c.classList.remove('active'));
    choice.classList.add('active');
    renderAll(false);
    return;
  }
  let cb=e.target.closest('[data-check]');
  if(cb){
    let id=Number(cb.dataset.check);
    cb.checked?selected.add(id):selected.delete(id);
    localStorage.setItem('selectedShoesV13',JSON.stringify([...selected]));
    renderCompare();
    return;
  }
  let rm=e.target.closest('[data-remove]');
  if(rm){
    selected.delete(Number(rm.dataset.remove));
    localStorage.setItem('selectedShoesV13',JSON.stringify([...selected]));
    renderAll(false);
    return;
  }
  let sc=e.target.closest('.shoeCard');
  if(sc)sc.classList.toggle('open');
});

document.getElementById('backQuestion').onclick=()=>{questionIndex=Math.max(0,questionIndex-1);renderAll()};
document.getElementById('nextQuestion').onclick=()=>{questionIndex=Math.min(questions.length-1,questionIndex+1);renderAll()};
document.getElementById('skipQuestion').onclick=()=>{questionIndex=Math.min(questions.length-1,questionIndex+1);renderAll()};
document.getElementById('buildReport').onclick=()=>{
  document.getElementById('thinking').classList.remove('hidden');
  setTimeout(()=>{
    document.getElementById('thinking').classList.add('hidden');
    document.getElementById('report').scrollIntoView({behavior:'smooth'});
    renderAll(false);
  },900);
};
['change'].forEach(ev=>['category','intentFilter'].forEach(id=>els[id].addEventListener(ev,()=>renderAll(false))));
els.q?.addEventListener('input',()=>{ activeSearchQuery=''; });

function runDatabaseSearch(){
  activeSearchQuery=(els.q.value||'').trim();
  if(document.activeElement && document.activeElement.blur) document.activeElement.blur();
  renderAll(false);
  document.getElementById('database')?.scrollIntoView({behavior:'smooth', block:'start'});
}

document.getElementById('searchBtn')?.addEventListener('click', runDatabaseSearch);
els.q?.addEventListener('keydown', e=>{
  if(e.key==='Enter'){
    e.preventDefault();
    runDatabaseSearch();
  }
});
document.getElementById('clearSearch')?.addEventListener('click', ()=>{
  els.q.value='';
  activeSearchQuery='';
  renderAll(false);
});

document.getElementById('reset').onclick=()=>{els.q.value='';activeSearchQuery='';els.category.value='';els.intentFilter.value='';renderAll(false)};
setupFeedback();
renderAll();
