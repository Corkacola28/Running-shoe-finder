const state={
  intent:'dailyTrainer',
  experience:'intermediate',
  mileage:'10to20',
  goal:'half',
  surface:'road',
  terrain:'mixed',
  fit:'standard',
  pronation:'unknown',
  footStrike:'unknown',
  cushionFeel:'balanced',
  rideEnergy:'balanced',
  geometry:'either',
  focus:'balanced',
  concern:'none',
  idealBudget:'180',
  budget:'220',
  saleModel:'yes',
  rotationSize:'3',
  liked:'',
  avoid:''
};

let questionIndex=0;
let selectedChoice=null;

const questions=[
  {
    key:'intent',
    title:'What are you shopping for?',
    sub:'This establishes the job the shoe needs to perform.',
    assistant:'First, what role should this shoe fill?',
    options:[
      ['firstShoe','My first running shoe','Beginner-friendly and versatile.'],
      ['dailyTrainer','Daily trainer','Most weekly mileage.'],
      ['raceDay','Race-day shoe','A fast option for PR attempts.'],
      ['tempoWorkout','Workout shoe','Intervals, tempo, and progression runs.'],
      ['trail','Trail shoe','Grip and protection away from pavement.'],
      ['longRun','Long-run shoe','Comfort for longer efforts.'],
      ['recovery','Recovery shoe','Easy-paced comfort.'],
      ['stability','Stability / support','A more guided, secure platform.'],
      ['valuePick','Best value','Strong performance for the money.'],
      ['rotation','Build a rotation','Multiple shoes with different jobs.'],
      ['notSure','Help me decide','Let the full profile determine the category.']
    ]
  },
  {
    key:'experience',
    title:'How experienced are you as a runner?',
    sub:'Experience changes how aggressive or specialized a recommendation should be.',
    assistant:'How would you describe your running experience?',
    options:[
      ['new','Brand new','I am just getting started.'],
      ['casual','Casual','I run occasionally for fitness.'],
      ['intermediate','Intermediate','I run consistently and know some preferences.'],
      ['experienced','Experienced','I train regularly and understand shoe differences.'],
      ['competitive','Competitive','Performance and race results are major priorities.']
    ]
  },
  {
    key:'mileage',
    title:'How many miles do you run per week?',
    sub:'Weekly volume affects durability, cushioning, stability, and whether a rotation makes sense.',
    assistant:'What is your typical weekly mileage?',
    options:[
      ['under10','Under 10 miles','Lower-volume or occasional running.'],
      ['10to20','10–20 miles','A consistent recreational routine.'],
      ['20to35','20–35 miles','Moderate training volume.'],
      ['35to50','35–50 miles','Higher-volume training.'],
      ['50plus','More than 50 miles','Durability and rotation planning matter greatly.']
    ]
  },
  {
    key:'goal',
    title:'What is your main running goal?',
    sub:'The same shoe will not suit easy fitness running and a marathon PR equally well.',
    assistant:'What are you working toward right now?',
    options:[
      ['daily','General fitness','Comfortable, reliable running.'],
      ['first5k','First race or first 5K','Confidence and versatility.'],
      ['5k','Faster 5K','Quick turnover and responsiveness.'],
      ['10k','10K training or racing','Speed with enough protection.'],
      ['half','Half marathon','Balanced comfort, efficiency, and durability.'],
      ['sub2','Sub-2-hour half marathon','More emphasis on tempo efficiency.'],
      ['marathon','Marathon','Long-run protection and race durability.'],
      ['ultra','Ultra or very long runs','Protection, stability, and longevity.'],
      ['return','Returning to consistent running','Comfort and predictable handling.']
    ]
  },
  {
    key:'surface',
    title:'Where will you run most often?',
    sub:'Surface affects traction, protection, outsole construction, and ride feel.',
    assistant:'Choose your primary running surface.',
    options:[
      ['road','Road or sidewalk','Mostly paved running.'],
      ['treadmill','Treadmill','Indoor running and controlled surfaces.'],
      ['track','Track','Smooth surface and faster sessions.'],
      ['gravel','Gravel or packed paths','Light off-road use.'],
      ['trail','Trail','Dirt, rocks, roots, or technical terrain.'],
      ['mixed','Mixed surfaces','A combination of road and light trail.']
    ]
  },
  {
    key:'terrain',
    title:'What terrain do you encounter?',
    sub:'Hills and uneven ground place more value on stability and grip.',
    assistant:'What best describes your usual routes?',
    options:[
      ['flat','Mostly flat','Few elevation changes.'],
      ['rolling','Rolling hills','Regular but manageable elevation.'],
      ['hilly','Steep or frequent hills','Climbing and descending are common.'],
      ['uneven','Uneven or technical','Foot placement and security matter.'],
      ['mixed','A little of everything','Keep the recommendation balanced.']
    ]
  },
  {
    key:'fit',
    title:'How does your foot usually fit?',
    sub:'A high-scoring shoe is not useful if its shape does not fit your foot.',
    assistant:'How would you describe your foot width or toe-box needs?',
    options:[
      ['narrow','Narrow','Performance fits usually work.'],
      ['standard','Standard','Most standard-width shoes fit.'],
      ['wide','Wide','I need extra room.'],
      ['extraWide','Extra-wide or roomy toe box','Forefoot space is essential.'],
      ['unknown','Not sure','Avoid extreme shapes.']
    ]
  },
  {
    key:'pronation',
    title:'Do you know your stability needs?',
    sub:'This is preference guidance, not a medical diagnosis.',
    assistant:'Which option sounds closest?',
    options:[
      ['neutral','Neutral','I usually do well in neutral shoes.'],
      ['mildOver','Mild overpronation','A little guidance feels helpful.'],
      ['strongOver','Strong overpronation','I prefer noticeably supportive shoes.'],
      ['supination','Supination or outer-edge wear','I tend to prefer cushioning and flexibility.'],
      ['unknown','I do not know','Use a stable-neutral baseline.']
    ]
  },
  {
    key:'footStrike',
    title:'Do you know your foot strike?',
    sub:'Foot strike can modestly influence cushioning and platform preferences.',
    assistant:'Where do you usually land?',
    options:[
      ['heel','Heel','I tend to land toward the heel.'],
      ['midfoot','Midfoot','I land near the middle.'],
      ['forefoot','Forefoot','I land toward the front.'],
      ['varied','It varies','It changes with pace or fatigue.'],
      ['unknown','Not sure','Do not heavily weight this answer.']
    ]
  },
  {
    key:'cushionFeel',
    title:'How should the cushioning feel?',
    sub:'This separates soft recovery shoes from firmer, more controlled rides.',
    assistant:'Choose the feel you enjoy most.',
    options:[
      ['verySoft','Very soft and plush','Comfort and softness first.'],
      ['soft','Soft','Protective without being extreme.'],
      ['balanced','Balanced','Neither especially soft nor firm.'],
      ['firm','Firm and controlled','More structure and ground feedback.'],
      ['unknown','Not sure','Keep this influence small.']
    ]
  },
  {
    key:'rideEnergy',
    title:'How energetic should the ride feel?',
    sub:'Some runners prefer smooth predictability; others want bounce and propulsion.',
    assistant:'What kind of response sounds best?',
    options:[
      ['smooth','Smooth and predictable','A calm, natural transition.'],
      ['balanced','Balanced','Some responsiveness without aggression.'],
      ['bouncy','Bouncy','Noticeable energy return.'],
      ['fast','Fast and aggressive','Performance comes before versatility.'],
      ['unknown','Not sure','Let the intended use decide.']
    ]
  },
  {
    key:'geometry',
    title:'What type of shoe geometry do you prefer?',
    sub:'Plates and strong rockers can feel efficient but are not ideal for everyone.',
    assistant:'Which construction sounds best?',
    options:[
      ['natural','Flexible and natural','No strong plate or rocker sensation.'],
      ['rockered','Rockered','A rolling transition through toe-off.'],
      ['plated','Plated','A structured, propulsive feel.'],
      ['either','No preference','Choose whichever best fits the job.'],
      ['unsure','I have never compared them','Avoid over-weighting geometry.']
    ]
  },
  {
    key:'focus',
    title:'What is your single biggest priority?',
    sub:'This breaks close ties between otherwise similar shoes.',
    assistant:'What matters most when everything else is equal?',
    options:[
      ['balanced','Versatility','A balanced overall match.'],
      ['cushion','Comfort','More cushioning and protection.'],
      ['speed','Speed','Lower effort at faster paces.'],
      ['stable','Stability','A secure, predictable platform.'],
      ['value','Value','Performance relative to cost.'],
      ['durability','Durability','A shoe that handles more mileage.'],
      ['fit','Fit security','Foot shape and lockdown first.']
    ]
  },
  {
    key:'concern',
    title:'Is there a recurring comfort concern?',
    sub:'This only adjusts comfort preferences and does not replace professional medical advice.',
    assistant:'Choose the main issue you account for when buying shoes.',
    options:[
      ['none','None','No recurring concern.'],
      ['plantar','Plantar or arch discomfort','Prioritize stable cushioning and fit.'],
      ['shin','Shin discomfort','Favor predictable cushioning.'],
      ['achilles','Achilles or calf sensitivity','Avoid overly aggressive recommendations.'],
      ['knee','Knee discomfort','Favor stable, protective options.'],
      ['ankle','Ankle instability','Platform security matters.'],
      ['other','Something else','Use a conservative, balanced profile.']
    ]
  },
  {
    key:'idealBudget',
    title:'What would you ideally like to spend?',
    sub:'This helps distinguish the best value from the absolute maximum you could spend.',
    assistant:'What price would feel comfortable?',
    options:[
      ['120','$120 or less','Strong sale and budget options.'],
      ['150','$150 or less','Value-oriented trainers.'],
      ['180','$180 or less','Most standard trainers.'],
      ['220','$220 or less','Premium trainers included.'],
      ['300','$300 or less','Most premium racers included.'],
      ['999','No ideal target','Price is not a major preference.']
    ]
  },
  {
    key:'budget',
    title:'What is your absolute maximum?',
    sub:'Shoes above this amount will be eliminated before ranking.',
    assistant:'What is the most you would actually pay?',
    options:[
      ['150','$150','Keep everything at or below $150.'],
      ['180','$180','Include most traditional trainers.'],
      ['220','$220','Include most premium trainers.'],
      ['300','$300','Include most race shoes.'],
      ['400','$400','Include ultra-premium options.'],
      ['500','$500','Very few price restrictions.'],
      ['999','No maximum','Do not eliminate shoes by price.']
    ]
  },
  {
    key:'saleModel',
    title:'Would you consider an older model?',
    sub:'Previous versions can be excellent values when the fit and ride remain appropriate.',
    assistant:'Should discounted prior-year models stay eligible?',
    options:[
      ['yes','Yes','Recommend older models when they are a strong value.'],
      ['maybe','Maybe','Include them as alternatives.'],
      ['no','No','Prioritize the newest available models.']
    ]
  },
  {
    key:'rotationSize',
    title:'How many shoes do you want in your setup?',
    sub:'ShoeAI can recommend one versatile shoe or divide jobs across a rotation.',
    assistant:'How large should your recommended rotation be?',
    options:[
      ['1','One shoe','One versatile option for nearly everything.'],
      ['2','Two shoes','Usually daily plus workout or race.'],
      ['3','Three shoes','Daily, workout, and long-run or race.'],
      ['4','Four shoes','A specialized full rotation.']
    ]
  },
  {
    key:'liked',
    title:'Which shoes have worked well for you?',
    sub:'Past success is one of the strongest clues about fit and ride preference.',
    assistant:'List shoes or brands you enjoyed, separated by commas.',
    input:true,
    placeholder:'Example: Novablast 4, Ghost, Endorphin Speed 4...'
  },
  {
    key:'avoid',
    title:'What have you disliked or want to avoid?',
    sub:'Include shoe names, brands, or problems such as narrow, firm, heavy, unstable, heel slip, or plated.',
    assistant:'List disliked shoes or traits, separated by commas.',
    input:true,
    placeholder:'Example: too narrow, heel slip, firm, Clifton 9, plated...'
  }
];

const intentLabels={
  firstShoe:'First running shoe',
  raceDay:'Race-day shoe',
  tempoWorkout:'Tempo / workout trainer',
  trail:'Trail shoe',
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

let selected=new Set(JSON.parse(localStorage.getItem('selectedShoesV20')||'[]'));
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
  if(state.intent==='trail'&&(s.intent?.trail??0)<72)b-=14;
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
  if(state.intent==='trail')r.push(`Trail score ${s.intent?.trail??0}/100 for grip, protection, stability, and off-road use.`);
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
  if(state.intent==='trail'&&(s.intent?.trail??0)<75)d.push('Not a strong trail-specific option; better for road or light mixed use.');
  if(!d.length)d.push('No major concerns based on your selected purpose.');
  return d;
}

function dna(s){
  let tags=[];
  if(s.intent?.raceDay>=86)tags.push('Race day');
  if(s.intent?.tempoWorkout>=88)tags.push('Tempo');
  if(s.intent?.trail>=85)tags.push('Trail');
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
      <span class="pill">Trail ${s.intent?.trail??0}</span>
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
      <div class="spec"><b>Trail</b>${s.intent?.trail??0}/100</div>
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


function pickUnique(candidates, used){
  return candidates.find(s=>!used.has(s.id)) || candidates[0];
}

function bestByIntent(intent, used=new Set(), extraFilter=null){
  let list=[...SHOES];
  if(extraFilter) list=list.filter(extraFilter);
  list=list.sort((a,b)=>((b.intent?.[intent]??0)-(a.intent?.[intent]??0)) || (score(b)-score(a)));
  let pick=pickUnique(list, used);
  if(pick) used.add(pick.id);
  return pick;
}

function buildRotationOptions(){
  const max=Number(state.budget||999);
  const available=SHOES.filter(s=>s.price<=max);
  const sorted=(intent, filter=null)=>available
    .filter(s=>!filter || filter(s))
    .sort((a,b)=>((b.intent?.[intent]??0)-(a.intent?.[intent]??0)) || (score(b)-score(a)));

  const dailyList=sorted('dailyTrainer', s=>s.plate==='No' || s.intent?.dailyTrainer>=90);
  const longList=sorted('longRun');
  const raceList=sorted('raceDay', s=>s.intent?.raceDay>=72 || s.race>=75);
  const recoveryList=sorted('recovery');
  const tempoList=sorted('tempoWorkout');

  const rotations=[
    {
      name:'Balanced Road Rotation',
      note:'Best all-around setup for most runners.',
      slots:[
        ['Daily Trainer', dailyList[0]],
        ['Long Run Shoe', longList[0]],
        ['Race-Day Shoe', raceList[0]],
        ['Recovery Shoe', recoveryList[0]]
      ]
    },
    {
      name:'Performance Rotation',
      note:'More speed-focused for workouts and race prep.',
      slots:[
        ['Daily Trainer', dailyList[1] || dailyList[0]],
        ['Workout Shoe', tempoList[0]],
        ['Long Run Shoe', longList[1] || longList[0]],
        ['Race-Day Shoe', raceList[1] || raceList[0]]
      ]
    },
    {
      name:'Comfort + Durability Rotation',
      note:'Prioritizes protection, easy mileage, and longevity.',
      slots:[
        ['Daily Trainer', dailyList.find(s=>(s.longevityScore||0)>=80) || dailyList[0]],
        ['Long Run Shoe', longList.find(s=>(s.cushion||0)>=90) || longList[0]],
        ['Recovery Shoe', recoveryList[0]],
        ['Race / Fast Option', raceList.find(s=>s.price<=220) || tempoList[0] || raceList[0]]
      ]
    },
    {
      name:'Value Rotation',
      note:'A lower-cost setup that still covers the main use cases.',
      slots:[
        ['Daily Trainer', dailyList.find(s=>s.price<=150) || dailyList[0]],
        ['Workout Shoe', tempoList.find(s=>s.price<=180) || tempoList[0]],
        ['Long Run Shoe', longList.find(s=>s.price<=180) || longList[0]],
        ['Recovery Shoe', recoveryList.find(s=>s.price<=180) || recoveryList[0]]
      ]
    }
  ];

  if(state.fit==='wide' || state.fit==='extraWide'){
    rotations.push({
      name:'Wide-Foot Friendly Rotation',
      note:'Prioritizes roomier fits and wide-foot compatibility.',
      slots:[
        ['Daily Trainer', dailyList.find(s=>s.widthScore>=88) || dailyList[0]],
        ['Long Run Shoe', longList.find(s=>s.widthScore>=88) || longList[0]],
        ['Race / Fast Option', raceList.find(s=>s.widthScore>=80) || tempoList.find(s=>s.widthScore>=80) || raceList[0]],
        ['Recovery Shoe', recoveryList.find(s=>s.widthScore>=90) || recoveryList[0]]
      ]
    });
  }

  if(state.goal==='ultra' || state.intent==='trail'){
    const trailList=sorted('trail', s=>(s.intent?.trail??0)>=78);
    rotations.push({
      name:'Trail / Ultra Rotation',
      note:'For runners mixing roads, trails, long runs, and off-road races.',
      slots:[
        ['Trail Daily', trailList[0]],
        ['Trail Long Run', trailList.find(s=>(s.longrun||0)>=90) || trailList[1] || trailList[0]],
        ['Trail Race / Fast Option', trailList.find(s=>(s.speed||0)>=84) || trailList[2] || trailList[0]],
        ['Recovery / Road Easy', recoveryList[0]]
      ]
    });
  }

  return rotations.map(rot=>{
    const used=new Set();
    rot.slots=rot.slots.map(([label, shoe])=>{
      if(!shoe) return [label, available[0]];
      if(used.has(shoe.id)){
        const intent=label.toLowerCase().includes('race')?'raceDay':
          label.toLowerCase().includes('workout') || label.toLowerCase().includes('fast')?'tempoWorkout':
          label.toLowerCase().includes('long')?'longRun':
          label.toLowerCase().includes('recovery')?'recovery':
          label.toLowerCase().includes('trail')?'trail':'dailyTrainer';
        shoe=bestByIntent(intent, used);
      }else{
        used.add(shoe.id);
      }
      return [label, shoe];
    });
    return rot;
  });
}

function rotationOptionCard(rotation, index){
  const total=Math.round(rotation.slots.reduce((sum,[_,s])=>sum+score(s),0)/rotation.slots.length);
  return `<article class="rotationOption">
    <div class="rotationOptionHeader">
      <span class="pill good">Option ${index+1} • ${total}/100</span>
      <h3>${rotation.name}</h3>
      <p class="muted">${rotation.note}</p>
    </div>
    <div class="rotationSlots">
      ${rotation.slots.map(([label,s])=>`<div class="rotationSlot">
        <b>${label}</b>
        <span>${s.name}</span>
        <small>${s.brand} • ${s.category} • $${s.price}</small>
        <div class="pillRow">
          <span class="pill">Match ${score(s)}</span>
          <span class="pill">⏱ ${s.longevityMiles||'300-500 miles'}</span>
          <span class="pill">Fit ${s.widthScore}</span>
        </div>
      </div>`).join('')}
    </div>
  </article>`;
}

function renderRotation(){
  if(state.intent==='rotation'){
    const rotations=buildRotationOptions();
    els.rotation.innerHTML=rotations.map(rotationOptionCard).join('');
    return;
  }

  const by=(key)=>[...SHOES].sort((a,b)=>(b.intent?.[key]??0)-(a.intent?.[key]??0))[0];
  const daily=by('dailyTrainer'), workout=by('tempoWorkout'), long=by('longRun'), race=by('raceDay'), recovery=by('recovery'), trail=by('trail');
  els.rotation.innerHTML=[
    ['Daily Trainer',daily,'dailyTrainer'],
    ['Workout Shoe',workout,'tempoWorkout'],
    ['Long Run Shoe',long,'longRun'],
    ['Race-Day Shoe',race,'raceDay'],
    ['Recovery Shoe',recovery,'recovery'],
    ['Trail Shoe',trail,'trail']
  ].map(([l,s,k])=>`<div class="rotationCard"><b>${l}</b><br>${s.name}<br><span class="muted">${s.category} • ${s.intent?.[k]??score(s)}/100</span></div>`).join('');
}

function renderReport(){
  let list=filtered(), best=list[0], intent=mappedIntent();
  const topHeading=document.getElementById('topShoesHeading');
  const rotationHeading=document.getElementById('rotationHeading');
  if(topHeading) topHeading.textContent = state.intent==='rotation' ? 'Best individual shoes by category' : 'Your top shoes for this purpose';
  if(rotationHeading) rotationHeading.textContent = state.intent==='rotation' ? 'Your full rotation options' : 'Suggested shoe rotation';

  if(state.intent==='rotation'){
    const rotations=buildRotationOptions();
    els.reportSummary.textContent=`Purpose: Full rotation • Goal: ${labelFor('goal',state.goal)} • Fit: ${labelFor('fit',state.fit)} • Priority: ${labelFor('focus',state.focus)} • Budget: ${labelFor('budget',state.budget)}`;
    els.perfectMatch.innerHTML=`<div>
      <p class="eyebrow">Rotation Match</p>
      <h2>${rotations[0].name}</h2>
      <p>${rotations[0].note}</p>
      <details class="explain" open><summary>Why this rotation works</summary>
        <ul>
          <li>It gives you a dedicated daily trainer, long-run shoe, race or fast option, and recovery shoe.</li>
          <li>This prevents one shoe from trying to do every job.</li>
          <li>The picks still follow your goal, fit, ride preference, budget, and liked/avoid inputs.</li>
        </ul>
      </details>
    </div><div class="scoreHero">${Math.round(rotations[0].slots.reduce((sum,[_,s])=>sum+score(s),0)/rotations[0].slots.length)}</div>`;
    els.topFive.innerHTML=rotations[0].slots.map(([label,s],i)=>`<article class="miniCard">
      <span class="pill intentPill">${label}</span>
      <h3 class="shoeName">${s.name}</h3>
      <div class="meta">${s.brand} • ${s.category} • $${s.price}</div>
      <p>${s.note}</p>
      ${bar('Match',score(s))}
      ${bar('Longevity',s.longevityScore||70)}
      ${bar('Fit',s.widthScore)}
    </article>`).join('');
    els.nearMisses.innerHTML=rotations.slice(1,4).map((rot,i)=>`<div class="miniCard"><b>${rot.name}</b><p class="muted">${rot.note}</p><p>${rot.slots.map(([label,s])=>`${label}: ${s.name}`).join('<br>')}</p></div>`).join('');
    els.avoidList.innerHTML=list.slice(-4).reverse().map(s=>`<div class="miniCard"><b>${s.name}</b><p class="muted">${s.category} • ${score(s)}/100</p><p>Not as strong for your full rotation compared with the rotation picks.</p></div>`).join('');
    renderRotation();
    return;
  }
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
  g.innerHTML=list.map(s=>`<div class="compareCard"><b>${s.name}</b><br><span class="muted">${s.category} • $${s.price}</span>${bar('Match',score(s))}${bar('Race',s.intent?.raceDay??s.race)}${bar('Tempo',s.intent?.tempoWorkout??s.tempo)}${bar('Daily',s.intent?.dailyTrainer??s.daily)}${bar('Trail',s.intent?.trail??0)}${bar('Longevity',s.longevityScore||70)}${bar('Fit',s.widthScore)}<button data-remove="${s.id}">Remove</button></div>`).join('');
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
    localStorage.setItem('selectedShoesV20',JSON.stringify([...selected]));
    renderCompare();
    return;
  }
  let rm=e.target.closest('[data-remove]');
  if(rm){
    selected.delete(Number(rm.dataset.remove));
    localStorage.setItem('selectedShoesV20',JSON.stringify([...selected]));
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

document.getElementById('reset').onclick=()=>{els.q.value='';activeSearchQuery='';els.category.value='';els.intentFilter.value='';renderAll(false)};
setupFeedback();
renderAll();


/* V17 ROTATION OVERRIDE
   Ensures "Build me a rotation" shows multiple complete rotations at the top of the report,
   instead of a single-shoe perfect-match layout.
*/
function v17SortByIntent(intent, filterFn=null){
  let max=Number(state.budget||999);
  let list=SHOES.filter(s=>s.price<=max);
  if(filterFn) list=list.filter(filterFn);
  return list.sort((a,b)=>((b.intent?.[intent]??0)-(a.intent?.[intent]??0)) || (score(b)-score(a)));
}

function v17Pick(list, used){
  let pick=list.find(s=>s && !used.has(s.id)) || list[0];
  if(pick) used.add(pick.id);
  return pick;
}

function v17BuildRotationOptions(){
  const daily=v17SortByIntent('dailyTrainer', s=>s.plate==='No' || (s.intent?.dailyTrainer??0)>=90);
  const long=v17SortByIntent('longRun');
  const race=v17SortByIntent('raceDay', s=>(s.intent?.raceDay??0)>=70 || s.race>=70);
  const recovery=v17SortByIntent('recovery');
  const workout=v17SortByIntent('tempoWorkout');
  const value=v17SortByIntent('valuePick');
  const trail=v17SortByIntent('trail', s=>(s.intent?.trail??0)>=75);
  const wideFilter=s=>s.widthScore>=85;

  const make=(name,note,picks)=>{
    const used=new Set();
    return {
      name,
      note,
      slots:picks.map(([label,list])=>[label,v17Pick(list,used)])
    };
  };

  const rotations=[
    make('Balanced Road Rotation','Best all-around setup for most runners.',[
      ['Daily Trainer',daily],
      ['Long Run Shoe',long],
      ['Race / Fast Shoe',race],
      ['Recovery Shoe',recovery]
    ]),
    make('Performance Rotation','More speed-focused for workouts and race prep.',[
      ['Daily Trainer',daily.slice(1).concat(daily)],
      ['Workout Shoe',workout],
      ['Race-Day Shoe',race],
      ['Long Run Shoe',long]
    ]),
    make('Comfort + Durability Rotation','Prioritizes protection, easy mileage, and longevity.',[
      ['Daily Trainer',daily.filter(s=>(s.longevityScore||0)>=78).concat(daily)],
      ['Long Run Shoe',long.filter(s=>s.cushion>=88).concat(long)],
      ['Recovery Shoe',recovery],
      ['Race / Fast Shoe',race.filter(s=>s.price<=260).concat(workout,race)]
    ]),
    make('Value Rotation','Covers the main use cases while trying to avoid overspending.',[
      ['Daily Trainer',value.filter(s=>(s.intent?.dailyTrainer??0)>=80).concat(daily)],
      ['Workout Shoe',value.filter(s=>(s.intent?.tempoWorkout??0)>=75).concat(workout)],
      ['Long Run Shoe',value.filter(s=>(s.intent?.longRun??0)>=80).concat(long)],
      ['Recovery Shoe',value.filter(s=>(s.intent?.recovery??0)>=80).concat(recovery)]
    ])
  ];

  if(state.fit==='wide' || state.fit==='extraWide'){
    rotations.push(make('Wide-Foot Friendly Rotation','Prioritizes roomier fits and wide-foot compatibility.',[
      ['Daily Trainer',daily.filter(wideFilter).concat(daily)],
      ['Long Run Shoe',long.filter(wideFilter).concat(long)],
      ['Race / Fast Shoe',race.filter(s=>s.widthScore>=78).concat(workout,race)],
      ['Recovery Shoe',recovery.filter(s=>s.widthScore>=88).concat(recovery)]
    ]));
  }

  rotations.push(make('Trail / Mixed Surface Rotation','For runners who want road shoes plus a trail option.',[
    ['Road Daily Trainer',daily],
    ['Trail Shoe',trail],
    ['Long Run Shoe',long],
    ['Race / Fast Shoe',race]
  ]));

  return rotations.filter(rot=>rot.slots.every(([_,s])=>s));
}

function v17RotationCard(rotation,index){
  const avg=Math.round(rotation.slots.reduce((sum,[_,s])=>sum+score(s),0)/rotation.slots.length);
  return `<article class="rotationOption">
    <div class="rotationOptionHeader">
      <span class="pill good">Rotation ${index+1} • ${avg}/100</span>
      <h3>${rotation.name}</h3>
      <p class="muted">${rotation.note}</p>
    </div>
    <div class="rotationSlots">
      ${rotation.slots.map(([label,s])=>`<div class="rotationSlot">
        <b>${label}</b>
        <span>${s.name}</span>
        <small>${s.brand} • ${s.category} • $${s.price}</small>
        <div class="pillRow">
          <span class="pill">Match ${score(s)}</span>
          <span class="pill">⏱ ${s.longevityMiles||'300-500 miles'}</span>
          <span class="pill">Fit ${s.widthScore}</span>
        </div>
      </div>`).join('')}
    </div>
  </article>`;
}

const originalRenderReportV17 = renderReport;
renderReport = function(){
  if(state.intent !== 'rotation'){
    originalRenderReportV17();
    return;
  }

  const rotations=v17BuildRotationOptions();
  const topHeading=document.getElementById('topShoesHeading');
  const rotationHeading=document.getElementById('rotationHeading');
  if(topHeading) topHeading.textContent='Your complete rotation options';
  if(rotationHeading) rotationHeading.textContent='More rotation combinations';

  els.reportSummary.textContent=`Purpose: Full rotation • Goal: ${labelFor('goal',state.goal)} • Fit: ${labelFor('fit',state.fit)} • Priority: ${labelFor('focus',state.focus)} • Budget: ${labelFor('budget',state.budget)}`;

  els.perfectMatch.innerHTML=`<div class="rotationReportIntro">
    <p class="eyebrow">Rotation Builder</p>
    <h2>Here are your full shoe rotations.</h2>
    <p class="muted">Each option includes a daily trainer, long-run shoe, race/fast shoe, and recovery shoe. This is better than forcing one shoe to do every job.</p>
  </div>`;

  els.topFive.innerHTML=rotations.slice(0,4).map(v17RotationCard).join('');

  els.nearMisses.innerHTML=rotations.slice(4).map((rot,i)=>`<div class="miniCard">
    <b>${rot.name}</b>
    <p class="muted">${rot.note}</p>
    <p>${rot.slots.map(([label,s])=>`${label}: ${s.name}`).join('<br>')}</p>
  </div>`).join('') || `<div class="miniCard"><b>No extra rotations</b><p class="muted">Try changing budget, fit, or goal to generate different combinations.</p></div>`;

  const weak=filtered().slice(-4).reverse();
  els.avoidList.innerHTML=weak.map(s=>`<div class="miniCard">
    <b>${s.name}</b>
    <p class="muted">${s.category} • ${score(s)}/100</p>
    <p>Not as strong for building a balanced rotation.</p>
  </div>`).join('');

  els.rotation.innerHTML=rotations.map(v17RotationCard).join('');
};

const originalRenderRotationV17 = renderRotation;
renderRotation = function(){
  if(state.intent==='rotation'){
    els.rotation.innerHTML=v17BuildRotationOptions().map(v17RotationCard).join('');
    return;
  }
  originalRenderRotationV17();
};


/* V18 neutral profile-based recommendation engine */
const V18_WEIGHTS={
 firstShoe:{dailyTrainer:.30,stability:.22,valuePick:.16,recovery:.10,longRun:.08,widthScore:.08,longevityScore:.06},
 dailyTrainer:{dailyTrainer:.40,longRun:.14,stability:.12,recovery:.10,valuePick:.08,widthScore:.08,longevityScore:.08},
 raceDay:{raceDay:.52,tempoWorkout:.16,speed:.12,longRun:.08,stability:.05,widthScore:.04,valuePick:.03},
 tempoWorkout:{tempoWorkout:.48,speed:.18,raceDay:.10,dailyTrainer:.08,stability:.06,widthScore:.05,valuePick:.05},
 longRun:{longRun:.44,cushion:.16,stability:.12,dailyTrainer:.10,recovery:.07,widthScore:.06,longevityScore:.05},
 recovery:{recovery:.46,cushion:.22,stability:.12,widthScore:.08,longevityScore:.07,valuePick:.05},
 stability:{stability:.56,dailyTrainer:.12,recovery:.10,cushion:.08,widthScore:.07,longevityScore:.04,valuePick:.03},
 valuePick:{valuePick:.46,dailyTrainer:.16,longevityScore:.14,longRun:.08,stability:.06,widthScore:.05,cushion:.05},
 trail:{trail:.54,stability:.14,longRun:.10,cushion:.07,widthScore:.05,longevityScore:.05,valuePick:.05},
 rotation:{rotation:.28,dailyTrainer:.16,tempoWorkout:.14,longRun:.14,recovery:.10,raceDay:.08,stability:.05,widthScore:.03,longevityScore:.02},
 notSure:{rotation:.24,dailyTrainer:.22,longRun:.14,stability:.12,recovery:.10,valuePick:.08,widthScore:.06,longevityScore:.04}
};
function v18Metric(s,m){if(m==='widthScore'||m==='longevityScore')return Number(s[m]??70);if(['cushion','speed','stability','value','longrun','daily','recovery','tempo','race'].includes(m))return Number(s[m]??70);return Number(s.intent?.[m]??70)}
function v18Eligible(s,intent){if(intent==='raceDay')return (s.intent?.raceDay??s.race??0)>=68;if(intent==='tempoWorkout')return (s.intent?.tempoWorkout??s.tempo??0)>=70;if(intent==='recovery')return (s.intent?.recovery??s.recovery??0)>=72;if(intent==='stability')return (s.intent?.stability??s.stability??0)>=78;if(intent==='trail')return (s.intent?.trail??0)>=72;if(intent==='firstShoe')return String(s.plate||'No').toLowerCase()==='no'&&(s.intent?.dailyTrainer??s.daily??0)>=72;return true}
function v18Goal(s){let g=state.goal,a=0;if(g==='5k')a+=(s.speed-75)*.10+(s.tempo-75)*.08+(s.race-75)*.05;else if(g==='10k')a+=(s.speed-75)*.08+(s.tempo-75)*.08+(s.longrun-75)*.03;else if(g==='10miler')a+=(s.tempo-75)*.06+(s.longrun-75)*.07+(s.cushion-75)*.03;else if(g==='half'||g==='sub2')a+=(s.longrun-75)*.07+(s.tempo-75)*.05+(s.stability-75)*.03;else if(g==='marathon')a+=(s.longrun-75)*.10+(s.cushion-75)*.06+((s.longevityScore||70)-70)*.03;else if(g==='ultra')a+=(s.longrun-75)*.11+(s.stability-75)*.06+((s.longevityScore||70)-70)*.05;else if(g==='daily')a+=(s.daily-75)*.10+(s.value-75)*.04+((s.longevityScore||70)-70)*.04;return a}
function v18Fit(s){let w=Number(s.widthScore||75);if(state.fit==='extraWide')return (w-80)*.30;if(state.fit==='wide')return (w-78)*.22;if(state.fit==='narrow')return (82-w)*.08;if(state.fit==='standard')return -Math.abs(w-82)*.03;return 0}
function v18Focus(s){if(state.focus==='cushion')return (s.cushion-75)*.12;if(state.focus==='speed')return (s.speed-75)*.12;if(state.focus==='stable')return (s.stability-75)*.12;if(state.focus==='value')return (s.value-75)*.14;if(state.focus==='race')return (s.race-75)*.12;if(state.focus==='nonplate')return String(s.plate||'No').toLowerCase()==='no'?5:-8;return 0}
function v18Prefs(s){let a=0,b=JSON.stringify(s).toLowerCase();likedTerms().forEach(t=>{if(t&&b.includes(t))a+=3});avoidTerms().forEach(t=>{if(!t)return;if(b.includes(t))a-=9;if(t==='narrow'&&s.widthScore<75)a-=10;if(t==='plated'&&String(s.plate||'No').toLowerCase()!=='no')a-=10;if(t==='firm'&&s.cushion<78)a-=7});return a}
function v18NeutralScore(s){let intent=mappedIntent();if(!v18Eligible(s,intent))return 0;let w=V18_WEIGHTS[state.intent]||V18_WEIGHTS[intent]||V18_WEIGHTS.notSure,t=0,wt=0;Object.entries(w).forEach(([m,x])=>{t+=v18Metric(s,m)*x;wt+=x});let r=t/wt+v18Goal(s)+v18Fit(s)+v18Focus(s)+v18Prefs(s);if(s.price>Number(state.budget||999))r-=100;return Math.round(Math.max(0,Math.min(100,r)))}
score=v18NeutralScore;
function v18Diverse(list,n=5){let out=[],brands={},cats={};for(let s of list){let b=s.brand||'Other',c=s.category||'Other';if((brands[b]||0)>=2)continue;if((cats[c]||0)>=2&&out.length<n-1)continue;out.push(s);brands[b]=(brands[b]||0)+1;cats[c]=(cats[c]||0)+1;if(out.length>=n)break}for(let s of list){if(out.length>=n)break;if(!out.some(x=>x.id===s.id))out.push(s)}return out}
const v18OldFiltered=filtered;
filtered=function(){let max=Number(state.budget||999),q=((typeof activeSearchQuery!=='undefined'?activeSearchQuery:'')||(els.q?.value||'')).trim(),list=SHOES.filter(s=>s.price<=max);if(q&&typeof searchRelevance==='function'){return list.map(s=>({...s,_searchRelevance:searchRelevance(s,q)})).filter(s=>s._searchRelevance>0).sort((a,b)=>(b._searchRelevance-a._searchRelevance)||(score(b)-score(a)))}if(els.category?.value)list=list.filter(s=>s.category===els.category.value);if(els.intentFilter?.value)list=list.filter(s=>(s.intent?.[els.intentFilter.value]??0)>=72);return list.filter(s=>v18Eligible(s,mappedIntent())).sort((a,b)=>score(b)-score(a)||String(a.name).localeCompare(String(b.name)))};
const v18OldRenderReport=renderReport;
renderReport=function(){if(state.intent==='rotation'){v18OldRenderReport();return}let ranked=filtered(),top=v18Diverse(ranked,5),best=top[0]||ranked[0];if(!best){v18OldRenderReport();return}els.reportSummary.textContent=`Purpose: ${intentLabel()} • Goal: ${labelFor('goal',state.goal)} • Fit: ${labelFor('fit',state.fit)} • Priority: ${labelFor('focus',state.focus)} • Budget: ${labelFor('budget',state.budget)}`;els.perfectMatch.innerHTML=`<div><p class="eyebrow">Best Profile Match</p><h2>${best.name}</h2><p>${best.note}</p><div class="pillRow">${dna(best).map(x=>`<span class="pill">${x}</span>`).join('')}</div><details class="explain" open><summary>Why this ranked first</summary><ul>${why(best).map(x=>`<li>${x}</li>`).join('')}<li>No brand or shoe receives a preferred bonus.</li></ul><b>Expected longevity</b><ul><li>${best.longevityMiles||'300-500 miles'} — ${best.longevityNote||'Mileage varies by runner, surface, and rotation.'}</li></ul><b>Possible downsides</b><ul>${downside(best).map(x=>`<li>${x}</li>`).join('')}</ul></details></div><div class="scoreHero">${score(best)}</div>`;els.topFive.innerHTML=top.map((s,i)=>resultCard(s,i+1,true)).join('');let ids=new Set(top.map(s=>s.id)),near=ranked.filter(s=>!ids.has(s.id)).slice(0,4);els.nearMisses.innerHTML=near.map(s=>`<div class="miniCard"><b>${s.name}</b><p class="muted">${s.category} • ${score(s)}/100</p><p>It scored closely, but the Top 5 offered a better profile match or more category variety.</p></div>`).join('');let bad=[...SHOES].filter(s=>s.price>Number(state.budget||999)||score(s)<55||!v18Eligible(s,mappedIntent())).sort((a,b)=>score(a)-score(b)).slice(0,4);els.avoidList.innerHTML=bad.map(s=>`<div class="miniCard"><b>${s.name}</b><p class="muted">${s.category} • ${score(s)}/100</p><p>${s.price>Number(state.budget||999)?'Outside your selected budget.':`Not a strong match for ${intentLabel().toLowerCase()}.`}</p></div>`).join('');renderRotation()};
const v18OldRenderLive=renderLive;
renderLive=function(){let list=filtered(),best=list[0];if(!best){v18OldRenderLive();return}els.liveTitle.textContent=`${best.name} is currently leading.`;els.liveSummary.textContent=`Neutral match score: ${score(best)}/100 for ${intentLabel()}, ${labelFor('goal',state.goal)}, ${labelFor('fit',state.fit)}, and ${labelFor('budget',state.budget)}.`;els.liveReasons.innerHTML=why(best).map(x=>`<div class="reason">${x}</div>`).join('')};


/* =========================================================
   V19 CALIBRATED & DIVERSIFIED MATCH ENGINE
   Ratings are pre-calibrated across the entire database.
   No brand, model, or editor's pick receives a bonus.
   ========================================================= */

function v19FamilyName(shoe){
  return String(shoe.name || '')
    .toLowerCase()
    .replace(/\b(v|version)\s*\d+(\.\d+)?\b/g,'')
    .replace(/\b\d+(\.\d+)?\b/g,'')
    .replace(/\b(men'?s|women'?s)\b/g,'')
    .replace(/\s+/g,' ')
    .trim();
}

function v19MatchTier(value){
  if(value >= 90) return 'Excellent match';
  if(value >= 84) return 'Strong match';
  if(value >= 77) return 'Good alternative';
  if(value >= 68) return 'Specialized option';
  return 'Limited match';
}

function v19Confidence(ranked){
  if(!ranked.length) return {label:'Low confidence',gap:0,tied:[]};
  const best=score(ranked[0]);
  const tied=ranked.filter(s=>best-score(s)<=2).slice(0,5);
  const gap=ranked[1] ? best-score(ranked[1]) : 10;
  const label=tied.length>=3?'Several shoes are essentially tied':
    gap<=2?'Close decision — two shoes are nearly equal':
    gap<=5?'Moderate confidence':'High confidence';
  return {label,gap,tied};
}

/* One shoe from each model family in the visible Top 5.
   One brand may appear twice only when the match is clearly competitive. */
function v19DiversifiedTop(ranked, count=5){
  const out=[];
  const families=new Set();
  const brandCounts={};

  for(const s of ranked){
    const family=v19FamilyName(s);
    const brand=s.brand || 'Other';
    if(families.has(family)) continue;
    if((brandCounts[brand]||0)>=2) continue;
    out.push(s);
    families.add(family);
    brandCounts[brand]=(brandCounts[brand]||0)+1;
    if(out.length===count) return out;
  }

  for(const s of ranked){
    if(out.some(x=>x.id===s.id)) continue;
    const family=v19FamilyName(s);
    if(families.has(family)) continue;
    out.push(s);
    families.add(family);
    if(out.length===count) break;
  }
  return out;
}

/* Soft category eligibility: a shoe can still appear as a specialized option,
   but inappropriate categories cannot dominate the primary recommendations. */
function v19UseCaseEligible(s,intent){
  const i=s.intent||{};
  if(intent==='raceDay') return (i.raceDay||0)>=66;
  if(intent==='tempoWorkout') return (i.tempoWorkout||0)>=69;
  if(intent==='recovery') return (i.recovery||0)>=69;
  if(intent==='stability') return (i.stability||0)>=74;
  if(intent==='trail') return (i.trail||0)>=70;
  if(intent==='firstShoe') return (i.dailyTrainer||0)>=70 && String(s.plate||'No').toLowerCase()==='no';
  return true;
}

const v19PreviousFiltered=filtered;
filtered=function(){
  const max=Number(state.budget||999);
  const q=((typeof activeSearchQuery!=='undefined'?activeSearchQuery:'')||(els.q?.value||'')).trim();
  let list=SHOES.filter(s=>s.price<=max);

  if(q && typeof searchRelevance==='function'){
    return list.map(s=>({...s,_searchRelevance:searchRelevance(s,q)}))
      .filter(s=>s._searchRelevance>0)
      .sort((a,b)=>(b._searchRelevance-a._searchRelevance)||score(b)-score(a)||a.name.localeCompare(b.name));
  }

  if(els.category?.value) list=list.filter(s=>s.category===els.category.value);
  if(els.intentFilter?.value) list=list.filter(s=>(s.intent?.[els.intentFilter.value]??0)>=68);

  return list
    .filter(s=>v19UseCaseEligible(s,mappedIntent()))
    .sort((a,b)=>score(b)-score(a)||a.name.localeCompare(b.name));
};

const v19PreviousReport=renderReport;
renderReport=function(){
  if(state.intent==='rotation'){
    v19PreviousReport();
    return;
  }

  const ranked=filtered();
  if(!ranked.length){
    v19PreviousReport();
    return;
  }

  const top=v19DiversifiedTop(ranked,5);
  const best=top[0];
  const confidence=v19Confidence(ranked);
  const tiedNames=confidence.tied.map(s=>s.name).join(', ');

  els.reportSummary.textContent=`Purpose: ${intentLabel()} • Goal: ${labelFor('goal',state.goal)} • Fit: ${labelFor('fit',state.fit)} • Priority: ${labelFor('focus',state.focus)} • Budget: ${labelFor('budget',state.budget)}`;

  els.perfectMatch.innerHTML=`<div>
    <p class="eyebrow">Best Profile Match</p>
    <h2>${best.name}</h2>
    <div class="pillRow">
      <span class="pill good">${v19MatchTier(score(best))}</span>
      <span class="pill">${confidence.label}</span>
    </div>
    <p>${best.note}</p>
    ${confidence.tied.length>1?`<p class="muted"><b>Near-tie:</b> ${tiedNames}. These are within two points and should be treated as similarly strong choices.</p>`:''}
    <details class="explain" open>
      <summary>Why this ranked here</summary>
      <ul>
        ${why(best).map(x=>`<li>${x}</li>`).join('')}
        <li>Ratings were recalibrated on the same category-based scale across all ${SHOES.length} shoes.</li>
        <li>No brand, model family, editor's pick, or shoe popularity bonus is used.</li>
      </ul>
      <b>Possible downsides</b>
      <ul>${downside(best).map(x=>`<li>${x}</li>`).join('')}</ul>
    </details>
  </div>
  <div class="scoreHero">
    <span>${score(best)}</span>
    <small>${v19MatchTier(score(best))}</small>
  </div>`;

  els.topFive.innerHTML=top.map((s,i)=>`
    <article class="miniCard">
      <div class="pillRow">
        <span class="pill intentPill">#${i+1}</span>
        <span class="pill">${v19MatchTier(score(s))}</span>
      </div>
      <h3 class="shoeName">${s.name}</h3>
      <div class="meta">${s.brand} • ${s.category} • $${s.price}</div>
      <p>${s.note}</p>
      ${bar('Profile match',score(s))}
      ${bar(intentLabel(),s.intent?.[mappedIntent()]??score(s))}
      ${bar('Fit',s.widthScore)}
    </article>`).join('');

  const ids=new Set(top.map(s=>s.id));
  const near=ranked.filter(s=>!ids.has(s.id)).slice(0,4);
  els.nearMisses.innerHTML=near.map(s=>`<div class="miniCard">
    <b>${s.name}</b>
    <p class="muted">${v19MatchTier(score(s))} • ${score(s)}/100</p>
    <p>Close on profile fit, but excluded from the Top 5 by score, model-family duplication, or category diversity.</p>
  </div>`).join('');

  const avoid=[...SHOES]
    .filter(s=>s.price>Number(state.budget||999)||!v19UseCaseEligible(s,mappedIntent())||score(s)<58)
    .sort((a,b)=>score(a)-score(b))
    .slice(0,4);
  els.avoidList.innerHTML=avoid.map(s=>`<div class="miniCard">
    <b>${s.name}</b>
    <p class="muted">${s.category} • ${score(s)}/100</p>
    <p>${s.price>Number(state.budget||999)?'Outside your selected budget.':`Its use-case profile does not align well with ${intentLabel().toLowerCase()}.`}</p>
  </div>`).join('');

  renderRotation();
};

const v19PreviousLive=renderLive;
renderLive=function(){
  const ranked=filtered();
  const best=ranked[0];
  if(!best){
    v19PreviousLive();
    return;
  }
  const confidence=v19Confidence(ranked);
  els.liveTitle.textContent=`${best.name} is currently leading.`;
  els.liveSummary.textContent=`${v19MatchTier(score(best))}: ${score(best)}/100. ${confidence.label}.`;
  els.liveReasons.innerHTML=why(best).slice(0,4).map(x=>`<div class="reason">${x}</div>`).join('');
};


/* =========================================================
   SHOEAI 2.0 PREVIEW — ADVANCED RUNNER PROFILE
   Final override: adds experience, mileage, surface, terrain,
   biomechanics preferences, ride feel, comfort concerns,
   ideal budget, sale preference, and requested rotation size.
   ========================================================= */

function v20Blob(s){
  return `${s.name} ${s.brand} ${s.category} ${s.foam} ${s.note}`.toLowerCase();
}

function v20AdvancedAdjustment(s){
  let a=0;
  const i=s.intent||{};
  const blob=v20Blob(s);
  const category=String(s.category||'').toLowerCase();
  const plate=String(s.plate||'No').toLowerCase()!=='no';

  // Experience
  if(state.experience==='new'){
    a+=(i.dailyTrainer||s.daily)*0.055+(s.stability-75)*0.10+(s.value-75)*0.05;
    if(plate) a-=5;
  }else if(state.experience==='casual'){
    a+=(s.daily-75)*0.05+(s.value-75)*0.04;
  }else if(state.experience==='experienced'){
    a+=(s.tempo-75)*0.035+(s.longrun-75)*0.03;
  }else if(state.experience==='competitive'){
    a+=(s.speed-75)*0.08+(s.tempo-75)*0.07+(s.race-70)*0.05;
  }

  // Weekly mileage
  if(state.mileage==='under10'){
    a+=(s.value-75)*0.06+(s.daily-75)*0.04;
  }else if(state.mileage==='20to35'){
    a+=(s.longevityScore-70)*0.05+(s.longrun-75)*0.04;
  }else if(state.mileage==='35to50'){
    a+=(s.longevityScore-70)*0.09+(s.longrun-75)*0.07+(s.stability-75)*0.04;
  }else if(state.mileage==='50plus'){
    a+=(s.longevityScore-70)*0.13+(s.longrun-75)*0.09+(s.stability-75)*0.06;
  }

  // Surface
  const trail=i.trail||0;
  if(state.surface==='trail') a+=(trail-65)*0.24;
  if(state.surface==='gravel') a+=(trail-55)*0.10+(s.stability-75)*0.05;
  if(state.surface==='mixed') a+=(trail-50)*0.07+(s.daily-75)*0.04;
  if(state.surface==='track') a+=(s.speed-75)*0.08+(s.tempo-75)*0.07;
  if(state.surface==='treadmill') a+=(s.cushion-75)*0.05+(s.speed-75)*0.025;
  if(state.surface==='road' && trail>82 && category.includes('trail')) a-=8;

  // Terrain
  if(state.terrain==='rolling') a+=(s.stability-75)*0.035+(s.speed-75)*0.025;
  if(state.terrain==='hilly') a+=(s.stability-75)*0.08+(s.speed-75)*0.05;
  if(state.terrain==='uneven') a+=(s.stability-75)*0.11+(trail-60)*0.10;

  // Pronation / stability preference
  if(state.pronation==='mildOver') a+=(s.stability-75)*0.14;
  if(state.pronation==='strongOver') a+=(s.stability-75)*0.24;
  if(state.pronation==='supination') a+=(s.cushion-75)*0.10-(s.stability>92?2:0);
  if(state.pronation==='unknown') a+=(s.stability-75)*0.04;

  // Foot strike — intentionally modest
  if(state.footStrike==='heel') a+=(s.cushion-75)*0.07+(s.stability-75)*0.04;
  if(state.footStrike==='midfoot') a+=(s.daily-75)*0.035+(s.tempo-75)*0.025;
  if(state.footStrike==='forefoot') a+=(s.speed-75)*0.055+(s.tempo-75)*0.04;

  // Cushion preference
  if(state.cushionFeel==='verySoft') a+=(s.cushion-75)*0.18+(s.recovery-70)*0.06;
  if(state.cushionFeel==='soft') a+=(s.cushion-75)*0.11;
  if(state.cushionFeel==='firm') a-=(s.cushion-80)*0.09, a+=(s.stability-75)*0.04;

  // Energy preference
  if(state.rideEnergy==='smooth') a+=(s.daily-75)*0.06+(s.stability-75)*0.045;
  if(state.rideEnergy==='bouncy') a+=(s.speed-75)*0.10+(s.tempo-75)*0.06;
  if(state.rideEnergy==='fast') a+=(s.speed-75)*0.15+(s.race-70)*0.09;

  // Geometry
  if(state.geometry==='natural') a+=plate?-8:5;
  if(state.geometry==='plated') a+=plate?7:-4;
  if(state.geometry==='rockered'){
    if(/rocker|rockered|geometry|speedroll|guidesole/.test(blob)) a+=6;
    else a+=(s.longrun-75)*0.025;
  }

  // Priority
  if(state.focus==='durability') a+=(s.longevityScore-70)*0.17;
  if(state.focus==='fit') a+=(s.widthScore-75)*0.13;

  // Comfort concerns: conservative preference adjustments only.
  if(state.concern==='plantar') a+=(s.stability-75)*0.09+(s.cushion-75)*0.05;
  if(state.concern==='shin') a+=(s.cushion-75)*0.08+(s.stability-75)*0.05;
  if(state.concern==='achilles'){
    a+=(s.stability-75)*0.04;
    if(state.geometry==='plated' || state.rideEnergy==='fast') a-=3;
  }
  if(state.concern==='knee') a+=(s.cushion-75)*0.08+(s.stability-75)*0.07;
  if(state.concern==='ankle') a+=(s.stability-75)*0.15;
  if(state.concern==='other') a+=(s.stability-75)*0.04+(s.daily-75)*0.03;

  // Ideal budget softly rewards value; absolute budget remains the hard filter.
  const ideal=Number(state.idealBudget||999);
  if(ideal<999){
    if(s.price<=ideal) a+=Math.min(5,(ideal-s.price)/18+2);
    else a-=Math.min(7,(s.price-ideal)/18);
  }

  // Prior model preference. Data does not contain release year, so model-number
  // hints are used only as a light tie-breaker rather than a hard fact.
  const modelNumber=(String(s.name).match(/\b(\d+)\b/g)||[]).map(Number).pop();
  if(state.saleModel==='yes' && modelNumber && modelNumber<=4) a+=1.5;
  if(state.saleModel==='no' && modelNumber && modelNumber<=3) a-=1.5;

  return a;
}

const v20PreviousScore=score;
score=function(s){
  const base=v20PreviousScore(s);
  return Math.round(Math.max(0,Math.min(100,base+v20AdvancedAdjustment(s))));
};

function v20ProfileSummary(){
  return [
    `${labelFor('experience',state.experience)} runner`,
    `${labelFor('mileage',state.mileage)} weekly`,
    labelFor('surface',state.surface),
    labelFor('terrain',state.terrain),
    labelFor('fit',state.fit),
    labelFor('cushionFeel',state.cushionFeel),
    labelFor('rideEnergy',state.rideEnergy)
  ].join(' • ');
}

const v20PreviousReport=renderReport;
renderReport=function(){
  v20PreviousReport();

  if(els.perfectMatch && !els.perfectMatch.querySelector('.runnerProfileCard')){
    const card=document.createElement('div');
    card.className='runnerProfileCard';
    card.innerHTML=`<p class="eyebrow">Your Runner Profile</p>
      <p>${v20ProfileSummary()}</p>
      <p class="muted">Comfort-concern answers guide conservative shoe preferences only and are not medical advice.</p>`;
    els.perfectMatch.prepend(card);
  }

  if(els.reportSummary){
    els.reportSummary.textContent += ` • Requested setup: ${labelFor('rotationSize',state.rotationSize)}`;
  }
};

function v20RotationSlots(){
  const count=Number(state.rotationSize||1);
  if(count===1) return [['Versatile Primary Shoe','dailyTrainer']];
  if(count===2) return [
    ['Daily Trainer','dailyTrainer'],
    [state.intent==='raceDay'?'Race-Day Shoe':'Workout / Race Shoe', state.intent==='raceDay'?'raceDay':'tempoWorkout']
  ];
  if(count===3) return [
    ['Daily Trainer','dailyTrainer'],
    ['Workout Shoe','tempoWorkout'],
    [state.goal==='marathon'||state.goal==='ultra'?'Long-Run Shoe':'Race-Day Shoe',state.goal==='marathon'||state.goal==='ultra'?'longRun':'raceDay']
  ];
  return [
    ['Daily Trainer','dailyTrainer'],
    ['Workout Shoe','tempoWorkout'],
    ['Long-Run / Recovery Shoe',state.concern==='none'?'longRun':'recovery'],
    ['Race-Day Shoe','raceDay']
  ];
}

const v20PreviousRotation=renderRotation;
renderRotation=function(){
  const slots=v20RotationSlots();
  const used=new Set();
  const cards=slots.map(([label,intent])=>{
    const candidates=[...SHOES]
      .filter(s=>s.price<=Number(state.budget||999))
      .sort((a,b)=>((b.intent?.[intent]||0)-(a.intent?.[intent]||0)) || score(b)-score(a));
    const shoe=candidates.find(s=>!used.has(s.id))||candidates[0];
    if(shoe) used.add(shoe.id);
    return shoe?`<div class="rotationCard">
      <b>${label}</b><br>${shoe.name}<br>
      <span class="muted">${shoe.category} • ${score(shoe)}/100 profile match</span>
    </div>`:'';
  }).join('');
  els.rotation.innerHTML=cards;
};

const v20PreviousLive=renderLive;
renderLive=function(){
  v20PreviousLive();
  if(els.liveSummary){
    els.liveSummary.textContent += ` Profile depth: ${Math.min(questionIndex+1,questions.length)}/${questions.length} answers reviewed.`;
  }
};
