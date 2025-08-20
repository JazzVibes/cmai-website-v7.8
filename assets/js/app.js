
// CMAI scripts v7.8 — dark-first, file:// safe
(function(){
  try{
    var saved = localStorage.getItem('cmai_theme');
    var v = saved ? saved : 'dark';
    if(v === 'system'){ document.documentElement.removeAttribute('data-theme'); }
    else { document.documentElement.setAttribute('data-theme', v); }
  }catch(e){}
})();

function getInlineJSON(id){
  var el = document.getElementById(id); if(!el) return [];
  try { return JSON.parse(el.textContent); } catch(e){ return []; }
}
function loadJSON(path, inlineId){
  var isHttp = /^https?:$/.test(location.protocol);
  if(isHttp){
    return fetch(path, {cache:'no-cache'})
      .then(function(r){ return r.ok ? r.json() : getInlineJSON(inlineId); })
      .catch(function(){ return getInlineJSON(inlineId); });
  }
  return Promise.resolve(getInlineJSON(inlineId));
}

function renderEvents(items, targetId, limit){
  var list = document.getElementById(targetId); if(!list) return;
  list.innerHTML='';
  (limit?items.slice(0,limit):items).forEach(function(e){
    var card=document.createElement('article'); card.className='card';
    var h=document.createElement('h3'); h.textContent=e.title||'Event';
    var p=document.createElement('p');
    p.innerHTML='<strong>'+(e.date||'')+'</strong>'+(e.time?' • '+e.time:'')+'<br>'+(e.location?'<em>'+e.location+'</em><br>':'')+(e.description||'');
    card.append(h,p);
    if(e.cta&&e.cta.url){ var a=document.createElement('a'); a.href=e.cta.url; a.target='_blank'; a.rel='noopener'; a.className='btn alt'; a.textContent=e.cta.label||'Details'; card.appendChild(a); }
    list.appendChild(card);
  });
}

function renderBios(items){
  var list=document.getElementById('bioList'); if(!list) return;
  list.innerHTML='';
  (items||[]).forEach(function(b){
    var card=document.createElement('article'); card.className='bio-card';
    var img=document.createElement('img'); img.loading='lazy'; img.alt=(b.name||'')+' photo'; img.src=b.photo||'assets/img/logo.png';
    var body=document.createElement('div');
    var h=document.createElement('h3'); h.textContent=b.name||'';
    var role=document.createElement('div'); role.className='role'; role.textContent=(b.titles||[]).join(' • ');
    var p=document.createElement('p'); p.textContent=b.summary||'';
    var meta=document.createElement('div'); meta.className='meta';
    meta.innerHTML=[
      b.ranks&&b.ranks.length?('<div><strong>Ranks:</strong> '+b.ranks.join(', ')+'</div>'):'',
      b.systems&&b.systems.length?('<div><strong>Systems:</strong> '+b.systems.join(', ')+'</div>'):'',
      b.teachers&&b.teachers.length?('<div><strong>Teachers & Mentors:</strong> '+b.teachers.join(', ')+'</div>'):''
    ].join('');
    var tags=document.createElement('div'); tags.className='tags';
    (b.tags||[]).forEach(function(t){ var s=document.createElement('span'); s.className='tag'; s.textContent=t; tags.appendChild(s); });
    body.append(h,role,p,meta,tags); card.append(img,body); list.appendChild(card);
  });
}

function renderSchedule(schedule, targetId){
  var host=document.getElementById(targetId); if(!host) return;
  var order=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  var table=document.createElement('table'); table.className='schedule';
  var tbody=document.createElement('tbody');
  order.forEach(function(day){
    var rows=schedule[day]||[];
    if(!rows.length) return;
    rows.forEach(function(item, idx){
      var tr=document.createElement('tr');
      if(idx===0){
        var th=document.createElement('th'); th.textContent=day;
        var td1=document.createElement('td'); td1.textContent=item.time||'';
        var td2=document.createElement('td'); td2.innerHTML=(item.class||'')+(item.note?'<span class="note"> — '+item.note+'</span>':'');
        tr.appendChild(th); tr.appendChild(td1); tr.appendChild(td2);
      }else{
        var th=document.createElement('th'); th.textContent=''; tr.appendChild(th);
        var td1=document.createElement('td'); td1.textContent=item.time||''; tr.appendChild(td1);
        var td2=document.createElement('td'); td2.innerHTML=(item.class||'')+(item.note?'<span class="note"> — '+item.note+'</span>':''); tr.appendChild(td2);
      }
      tbody.appendChild(tr);
    });
  });
  table.appendChild(tbody); host.innerHTML=''; host.appendChild(table);
}

document.addEventListener('DOMContentLoaded', function(){
  // Theme select
  var sel=document.getElementById('themeSelect');
  if(sel){
    try{
      var saved=localStorage.getItem('cmai_theme')||'dark';
      sel.value=saved;
      sel.addEventListener('change', function(e){
        var v=e.target.value; localStorage.setItem('cmai_theme', v);
        if(v==='system'){ document.documentElement.removeAttribute('data-theme'); }
        else{ document.documentElement.setAttribute('data-theme', v); }
      });
    }catch(e){}
  }

  // Mobile nav
  var nav=document.querySelector('nav.primary'); var btn=document.getElementById('navToggle');
  function closeNav(){ if(nav){ nav.classList.remove('open'); if(btn){ btn.setAttribute('aria-expanded','false'); } } }
  function openNav(){ if(nav){ nav.classList.add('open'); if(btn){ btn.setAttribute('aria-expanded','true'); } } }
  if(btn){ btn.addEventListener('click', function(){ nav.classList.contains('open')?closeNav():openNav(); }); }
  document.addEventListener('click', function(e){
    if(!nav) return;
    if(nav.classList.contains('open')){
      var inside = nav.contains(e.target) || (btn && btn.contains(e.target));
      var link = e.target.closest ? e.target.closest('a') : null;
      if(!inside) closeNav();
      else if(link) closeNav();
    }
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeNav(); });

  // Page data
  if(document.getElementById('homeEvents')){
    loadJSON('data/events.json','events-data').then(function(d){ renderEvents(d,'homeEvents',2); });
  }
  if(document.getElementById('eventsList')){
    loadJSON('data/events.json','events-data').then(function(d){ renderEvents(d,'eventsList'); });
  }
  if(document.getElementById('bioList')){
    loadJSON('data/bios.json','bios-data').then(renderBios);
  }
  if(document.getElementById('homeSchedule')){
    loadJSON('data/schedule.json','schedule-data').then(function(s){ renderSchedule(s,'homeSchedule'); });
  }
  if(document.getElementById('progSchedule')){
    loadJSON('data/schedule.json','schedule-data').then(function(s){ renderSchedule(s,'progSchedule'); });
  }
});
