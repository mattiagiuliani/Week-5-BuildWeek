

const queryParams = new URLSearchParams(window.location.search)
const productId = queryParams.get("id")

const ApiFetch ='http://striveschool-api.herokuapp.com/api/deezer/album/' +productId;

const row = document.querySelector('.row');
let globalObject = [];

async function GetData() {
   try {
    const downloadData = await fetch(ApiFetch);
       
    const jsonData = await downloadData.json();
    
    globalObject = jsonData;
    console.log(globalObject)
    CreateAlbumTemplate();
    CreateTracksTemplate();
    } catch {
    console.error((ApiFetch !== 200), 'Http error');
     }
 
}

GetData();

function CreateAlbumTemplate() {
    try {
         const card  = 
        `<div class="card">
  <img src="${globalObject.cover_medium}" class="card-img-top" alt="${globalObject.title}">
  <div class="card-body">
    <h1 class="card-title">${globalObject.title}</h1>
    <p class="card-text">${globalObject.artist.name}</p>
    <a href="index.html" class="btn btn-primary">Turn back</a>
  </div>
</div>`;
          row.innerHTML = card;
} catch { 
     console.error('Card not available');
}
}

function CreateTracksTemplate() {
    try {
         const cards = globalObject.tracks.data.map(track =>
        `<div class="col-6  col-md-4 col-lg-3">
        <div class="card h-100">
  <img src="${track.album.cover_medium}" class="card-img-top" alt="${track.title}">
  <div class="card-body d-flex flex-column">
    <h1 class="card-title">${track.title}</h1>
    <p class="card-text">${track.artist.name}</p>
  </div>
</div>
</div>`);
          row.innerHTML += cards.join('');
} catch { 
     console.error('Card not available');
}
}
