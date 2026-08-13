const movies = [
  {id:1,title:"Neon Horizon",year:2026,genre:"Sci-Fi",rating:8.7,popularity:98,poster:"https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80",description:"A pilot discovers a mysterious signal beyond the edge of the solar system and races to uncover its origin.",trailer:"https://www.youtube.com/results?search_query=movie+trailer",watch:"https://www.justwatch.com/"},
  {id:2,title:"Midnight Run",year:2025,genre:"Action",rating:8.2,popularity:94,poster:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",description:"One night. One city. One impossible delivery. A courier is pulled into a dangerous conspiracy.",trailer:"https://www.youtube.com/results?search_query=action+movie+trailer",watch:"https://www.justwatch.com/"},
  {id:3,title:"Ocean Lights",year:2025,genre:"Drama",rating:8.9,popularity:92,poster:"https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=80",description:"Two strangers meet on a remote coast and find an unexpected second chance at life.",trailer:"https://www.youtube.com/results?search_query=drama+movie+trailer",watch:"https://www.justwatch.com/"},
  {id:4,title:"Laugh Track",year:2024,genre:"Comedy",rating:7.8,popularity:88,poster:"https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=700&q=80",description:"A struggling comedian gets one ridiculous opportunity to turn his biggest mistake into his biggest show.",trailer:"https://www.youtube.com/results?search_query=comedy+movie+trailer",watch:"https://www.justwatch.com/"},
  {id:5,title:"The Last Kingdom",year:2024,genre:"Fantasy",rating:8.5,popularity:90,poster:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",description:"An exiled heir returns to a fractured kingdom where an ancient legend may decide the future.",trailer:"https://www.youtube.com/results?search_query=fantasy+movie+trailer",watch:"https://www.justwatch.com/"},
  {id:6,title:"Silent Evidence",year:2023,genre:"Thriller",rating:8.1,popularity:84,poster:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80",description:"A detective follows a trail of clues that someone is determined to erase.",trailer:"https://www.youtube.com/results?search_query=thriller+movie+trailer",watch:"https://www.justwatch.com/"},
  {id:7,title:"Starlight",year:2023,genre:"Romance",rating:8.0,popularity:80,poster:"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",description:"A chance encounter under a meteor shower changes two people's plans forever.",trailer:"https://www.youtube.com/results?search_query=romance+movie+trailer",watch:"https://www.justwatch.com/"},
  {id:8,title:"Wild Earth",year:2022,genre:"Adventure",rating:8.6,popularity:82,poster:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=80",description:"A small expedition journeys deep into an untouched wilderness searching for a lost research station.",trailer:"https://www.youtube.com/results?search_query=adventure+movie+trailer",watch:"https://www.justwatch.com/"}
];

const $ = s => document.querySelector(s);
const grid = $("#movieGrid"), search = $("#searchInput"), genre = $("#genreSelect"), sort = $("#sortSelect");
const genres = [...new Set(movies.map(m=>m.genre))].sort();

genres.forEach(g=>{
  genre.insertAdjacentHTML("beforeend", `<option value="${g}">${g}</option>`);
  $("#genreChips").insertAdjacentHTML("beforeend", `<button class="chip" data-genre="${g}">${g}</button>`);
});

function render(){
  let list = [...movies];
  const q = search.value.trim().toLowerCase();
  if(q) list = list.filter(m => `${m.title} ${m.genre} ${m.year}`.toLowerCase().includes(q));
  if(genre.value !== "all") list = list.filter(m=>m.genre===genre.value);
  if(sort.value==="rating") list.sort((a,b)=>b.rating-a.rating);
  if(sort.value==="year") list.sort((a,b)=>b.year-a.year);
  if(sort.value==="az") list.sort((a,b)=>a.title.localeCompare(b.title));
  if(sort.value==="popular") list.sort((a,b)=>b.popularity-a.popularity);

  grid.innerHTML = list.map(m => `
    <article class="movie-card" data-id="${m.id}">
      <div class="poster">
        <img src="${m.poster}" alt="${m.title} poster" loading="lazy">
        <span class="rating">★ ${m.rating}</span>
      </div>
      <div class="movie-info"><h3>${m.title}</h3><p>${m.year} • ${m.genre}</p></div>
    </article>`).join("");
  $("#resultCount").textContent = `${list.length} movie${list.length!==1?"s":""}`;
  $("#emptyState").classList.toggle("hidden", list.length!==0);
}
function openMovie(id){
  const m=movies.find(x=>x.id===id); if(!m)return;
  $("#modalPoster").src=m.poster; $("#modalPoster").alt=m.title;
  $("#modalTitle").textContent=m.title;
  $("#modalMeta").textContent=`${m.year} • ${m.genre} • ★ ${m.rating}`;
  $("#modalDescription").textContent=m.description;
  $("#trailerLink").href=m.trailer; $("#legalLink").href=m.watch;
  $("#movieModal").classList.remove("hidden"); document.body.style.overflow="hidden";
}
function closeMovie(){ $("#movieModal").classList.add("hidden"); document.body.style.overflow=""; }

grid.addEventListener("click",e=>{const card=e.target.closest(".movie-card"); if(card)openMovie(Number(card.dataset.id));});
$("#genreChips").addEventListener("click",e=>{if(e.target.dataset.genre){genre.value=e.target.dataset.genre;render();document.querySelector("#movies").scrollIntoView({behavior:"smooth"});}});
[search,genre,sort].forEach(el=>el.addEventListener("input",render));
$("#closeModal").onclick=closeMovie; $("#modalBackdrop").onclick=closeMovie;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMovie();});
$("#randomBtn").onclick=()=>openMovie(movies[Math.floor(Math.random()*movies.length)].id);

$("#themeBtn").onclick=()=>{
  const light=document.documentElement.getAttribute("data-theme")==="light";
  document.documentElement.setAttribute("data-theme",light?"dark":"light");
  $("#themeBtn").textContent=light?"☾":"☀";
  localStorage.setItem("cinewave-theme",light?"dark":"light");
};
if(localStorage.getItem("cinewave-theme")==="light"){document.documentElement.setAttribute("data-theme","light");$("#themeBtn").textContent="☀";}
render();
