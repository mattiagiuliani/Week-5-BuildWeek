const ApiFetch = 'http://striveschool-api.herokuapp.com/api/deezer/search?q=queen';
const ApiRow = document.querySelector('.ApiRow');
let globalObject = [];

async function GetData() {
  try {
    const downloadData = await fetch(ApiFetch);

    if (!downloadData.ok) {
      throw new Error('HTTP error');
    }

    const jsonData = await downloadData.json();
    globalObject = jsonData.data;

    CreateCards();
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * globalObject.length);
      const randomItem = globalObject[randomIndex];
      console.log(randomItem);
    }

  } catch (error) {
    console.error(error);
  }
}

GetData();



function CreateCards() {
  try {
  
    const firstSection = globalObject.slice(0, 6).map(album => `
      <div class="col-sm-2 col-md-4 col-lg-4">
        <div class="card h-100">
          <img src="${album.album.cover_medium}" class="card-img-top" alt="${album.title}">
          <div class="card-body">
            <h5 class="card-title">${album.title}</h5>
            <p class="card-text">${album.artist.name}</p>
            <a href="album.html?id=${album.album.id}" class="btn btn-primary">Album</a>
            <a href="artist.html?id=${album.artist.id}" class="btn btn-secondary">Artist</a>
          </div>
        </div>
      </div>
    `).join('');

   
    const secondSection = globalObject.slice(6, 11).map(album => `
      <div class="col-sm-2 col-md-4 col-lg-4">
        <div class="card h-100">
          <img src="${album.album.cover_medium}" class="card-img-top" alt="${album.title}">
          <div class="card-body">
            <h5 class="card-title">${album.title}</h5>
            <p class="card-text">${album.artist.name}</p>
            <a href="album.html?id=${album.album.id}" class="btn btn-primary">Album</a>
            <a href="artist.html?id=${album.artist.id}" class="btn btn-secondary">Artist</a>
          </div>
        </div>
      </div>
    `).join('');


    ApiRow.innerHTML = `
      <section class="section1 my-5">
        <h5 class="section1-title">Buonasera</h5>
        <div class="container-fluid">
          <div class="row">
            ${firstSection}
          </div>
        </div>
      </section>

      <section class="section2 my-5">
        <h5 class="section2-title">Altro di ciò che ti piace</h5>
        <div class="container-fluid">
          <div class="row">
            ${secondSection}
          </div>
        </div>
      </section>
    `;

  } catch {
    console.error('Cards not available');
  }
}
