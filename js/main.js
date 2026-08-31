let agenda = [];

function renderAgenda(range){
  const root=document.querySelector("#agenda-list");
  if(!root) return;
  const filtered=agenda.filter(item=>Number(item.days)<=range);
  root.innerHTML=filtered.length
    ? filtered.map(item=>`
      <div class="agenda-item">
        <time>${item.date}</time>
        <strong>${item.title}</strong>
        <span class="agenda-type">${item.type}</span>
      </div>`).join("")
    : '<div class="agenda-item"><strong>Aucune échéance confirmée dans cette fenêtre.</strong></div>';
}

function setupAgendaTabs(){
  document.querySelectorAll(".agenda-tab").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".agenda-tab").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      renderAgenda(Number(btn.dataset.range));
    });
  });
}

function setupSearch(){
  const search=document.querySelector("#search-input");
  if(!search) return;
  search.addEventListener("input",()=>{
    const q=search.value.trim().toLowerCase();
    document.querySelectorAll(".searchable").forEach(el=>{
      const hay=(el.textContent+" "+(el.dataset.tags||"")).toLowerCase();
      el.classList.toggle("search-hidden",Boolean(q) && !hay.includes(q));
    });
  });
}

function setupMobileNav(){
  const toggle=document.querySelector(".nav-toggle");
  const links=document.querySelector(".nav-links");
  if(!toggle||!links) return;
  toggle.addEventListener("click",()=>links.classList.toggle("open"));
  links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
}

function renderEdition(data){
  if(!data) return;

  const dateNode=document.querySelector("#edition-date");
  if(dateNode && data.editionDate) dateNode.textContent=String(data.editionDate).toUpperCase();

  if(data.hero){
    const hero=document.querySelector(".hero-main");
    if(hero){
      const eyebrow=hero.querySelector(".eyebrow");
      const h1=hero.querySelector("h1");
      const lead=hero.querySelector(".lead");
      if(eyebrow && data.hero.eyebrow) eyebrow.textContent=data.hero.eyebrow;
      if(h1 && data.hero.title) h1.textContent=data.hero.title;
      if(lead && data.hero.lead) lead.textContent=data.hero.lead;
      if(data.hero.tags) hero.dataset.tags=data.hero.tags;
    }
  }

  if(Array.isArray(data.sideStories)){
    const side=document.querySelector(".hero-side");
    if(side){
      side.innerHTML=data.sideStories.map(story=>`
        <article class="side-story story searchable">
          <span class="eyebrow">${story.eyebrow||""}</span>
          <h2>${story.title||""}</h2>
          <p>${story.text||""}</p>
        </article>`).join("");
    }
  }

  if(Array.isArray(data.briefing)){
    const list=document.querySelector(".briefing ol");
    if(list){
      list.innerHTML=data.briefing.map(item=>`<li>${item}</li>`).join("");
    }
  }

  if(Array.isArray(data.agenda)){
    agenda=data.agenda;
    renderAgenda(7);
  }

  if(Array.isArray(data.sources)){
    const sourceRoot=document.querySelector(".source-links");
    if(sourceRoot){
      sourceRoot.innerHTML=data.sources.map(source=>`
        <a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`).join("");
    }
  }
}

async function loadLatestEdition(){
  try{
    const response=await fetch("data/latest.json",{cache:"no-store"});
    if(!response.ok) throw new Error("latest.json unavailable");
    const data=await response.json();
    renderEdition(data);
  }catch(error){
    console.warn("Le Quotidien Tabletop: fallback statique utilisé.",error);
    const fallbackDate=document.querySelector("#edition-date");
    if(fallbackDate){
      const d=new Date();
      fallbackDate.textContent=new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"long",year:"numeric"}).format(d).toUpperCase();
    }
  }
}

setupAgendaTabs();
setupSearch();
setupMobileNav();
loadLatestEdition();
