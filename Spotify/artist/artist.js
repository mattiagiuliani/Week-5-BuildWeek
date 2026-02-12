const queryParams = new URLSearchParams(window.location.search)
const artistId = queryParams.get("id")

const ApiFetch ='http://striveschool-api.herokuapp.com/api/deezer/artist/' +artistId;

const row = document.querySelector('.row');
let globalObject = [];

async function GetData() {
   try {
    const downloadData = await fetch(ApiFetch);
       
    const jsonData = await downloadData.json();
    
    globalObject = jsonData;
    console.log(globalObject)
    CreateArtistTemplate();
    } catch {
    console.error((ApiFetch !== 200), 'Http error');
     }
 
}

GetData();

function CreateArtistTemplate() {
    try {
         const card  = 
        `<div class="card">
  <img src="${globalObject.picture_medium}" class="card-img-top" alt="${globalObject.name}">
  <div class="card-body">
    <h1 class="card-title">${globalObject.name}</h1>
    <p class="card-text">N°${globalObject.nb_album}</p>
    <a href="index.html" class="btn btn-primary">Turn back</a>
  </div>
</div>`;
          row.innerHTML = card;
} catch { 
     console.error('Card not available');
}
}
