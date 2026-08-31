const agenda = [
  {days:3,date:"03 sept.",title:"SPIEL Essen — mise à jour des données 2026",type:"Industrie"},
  {days:16,date:"16 sept.",title:"Games Workshop — AGM",type:"Corporate"},
  {days:18,date:"18 sept.",title:"Deadline éditeurs — Game Store Day Publisher’s Boxes",type:"Retail"},
  {days:25,date:"25 sept.",title:"Magic: Reality Fracture — prerelease",type:"JCC / TCG"},
  {days:32,date:"02 oct.",title:"Magic: Reality Fracture — sortie",type:"JCC / TCG"},
  {days:52,date:"22–25 oct.",title:"SPIEL Essen 2026",type:"Salon"},
  {days:68,date:"07 nov.",title:"Game Store Day 2026",type:"Retail"},
  {days:95,date:"04 déc.",title:"Pokémon TCG 30th Celebration — nouveaux produits US",type:"JCC / TCG"}
];

function renderAgenda(range){
  const root=document.querySelector("#agenda-list");
  if(!root) return;
  const filtered=agenda.filter(item=>item.days<=range);
  root.innerHTML=filtered.length
    ? filtered.map(item=>`
      <div class="agenda-item">
        <time>${item.date}</time>
        <strong>${item.title}</strong>
        <span class="agenda-type">${item.type}</span>
      </div>`).join("")
    : '<div class="agenda-item"><strong>Aucune échéance confirmée dans cette fenêtre.</strong></div>';
}

document.querySelectorAll(".agenda-tab").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".agenda-tab").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderAgenda(Number(btn.dataset.range));
  });
});
renderAgenda(7);

const search=document.querySelector("#search-input");
if(search){
  search.addEventListener("input",()=>{
    const q=search.value.trim().toLowerCase();
    document.querySelectorAll(".searchable").forEach(el=>{
      const hay=(el.textContent+" "+(el.dataset.tags||"")).toLowerCase();
      el.classList.toggle("search-hidden",q && !hay.includes(q));
    });
  });
}

const toggle=document.querySelector(".nav-toggle");
const links=document.querySelector(".nav-links");
if(toggle&&links){
  toggle.addEventListener("click",()=>links.classList.toggle("open"));
  links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
}

const dateNode=document.querySelector("#edition-date");
if(dateNode){
  const d=new Date();
  dateNode.textContent=new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"long",year:"numeric"}).format(d).toUpperCase();
}
