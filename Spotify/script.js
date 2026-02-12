const ApiFetch = 'http://striveschool-api.herokuapp.com/api/deezer/search?q=ginopaoli';
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
  <div class="col">
    <div class="card h-100 border-0 shadow-sm">
      <div class="d-flex flex-column flex-sm-row h-100">
        <img 
          src="${album.album.cover_medium}" 
          class="card-img-left"
          alt="${album.title}"
        >
        <div class="card-body bg-gray">
          <h6 class="card-title mb-1">${album.title}</h6>
          <p class="card-text text-muted mb-2">${album.artist.name}</p>
          <div class="d-flex gap-2">
            <a href="album/album.html?id=${album.album.id}" class="btn btn-sm btn-primary">Album</a>
            <a href="artist/artist.html?id=${album.artist.id}" class="btn btn-sm btn-secondary">Artist</a>
          </div>
        </div>
      </div>
    </div>
  </div>
`).join('');

   
    const secondSection = globalObject.slice(6, 11).map(album => `
      <div class="col">
        <div class="card h-100 border-0">
          <img src="${album.album.cover_medium}" class="card-img-top" alt="${album.title}">
          <div class="card-body">
            <h5 class="card-title">${album.title}</h5>
            <p class="card-text">${album.artist.name}</p>
          <div class="d-flex gap-2">
  <a href="album.html?id=..." class="btn btn-sm btn-primary">Album</a>
  <a href="artist.html?id=..." class="btn btn-sm btn-secondary">Artist</a>
          </div>
         </div>
        </div>
      </div>
    `).join('');


   ApiRow.innerHTML = `
  <section class="section1 my-5">
    <h5 class="section1-title px-2">Buonasera</h5>
    <div class="container-fluid px-2">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        ${firstSection}
      </div>
    </div>
  </section>


      <section class="section2 my-5">
        <h5 class="section2-title px-2">Altro di ciò che ti piace</h5>
        <div class="container-fluid px-2">
            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
            ${secondSection}
          </div>
        </div>
      </section>
    `;

  } catch {
    console.error('Cards not available');
  }
}



const friends = [
  {
    name: "Matteo",
    song: "Middle Child",
    artist: "JCole",
    album: "Er Noob🎮",
    img: "https://i.pravatar.cc/50?img=4",
    time: "4h"
  },
  {
    name: "Mattia",
    song: "Amanace",
    artist: "Anuel AA",
     album: "Aura=♾️",
    img: "https://i.pravatar.cc/50?img=12",
    time: "2.5h"
  },
  {
    name: "Henry",
    song: "Gangsta Paradise",
    artist: "Coolio",
    album: "Er Sensei🈳",
    img: "https://i.pravatar.cc/50?img=70",
    time: "3.2h"
  },
  {
    name: "Simone",
    song: "Alejandro",
    artist: "Lady Gaga",
     album: "The Hybrid🆗",
    img: "https://i.pravatar.cc/50?img=60",
    time: "4.5h"
  },
  {
    name: "Danilo",
    song: "Blinding Lights",
    artist: "The Weeknd",
     album: "Meme-Man🔞",
    img: "https://i.pravatar.cc/50?img=18",
    time: "1.4h"
  },
  {
    name: "Gianluca",
    song: "Not afraid",
    artist: "Eminem",
    album: "The Unbroken 🙏",
    img: "https://i.pravatar.cc/50?img=22",
    time: "8h"
  }
];

const container = document.querySelector(".cardsRightColumn");

friends.forEach(friend => {
  const card = document.createElement("div");
  card.className = "card bg-dark text-white border-0";

  card.innerHTML = `
    <div class="card-body d-flex align-items-center gap-3">
      <img src="${friend.img}" 
           class="rounded-circle" width="50" height="50" alt="user">
      <div class="flex-grow-1">
        <h6 class="mb-1">${friend.name}</h6>
        <p class="mb-0 text-secondary small">
         <span class="text-white">${friend.song}⚪${friend.artist}</span> 
         <br>
          <span class="text-white">${friend.album}<span>
        </p>
      </div>
      <i class="text-secondary">${friend.time}</i>
    </div>
  `;

  container.appendChild(card);
});


const playPauseBtn = document.getElementById("playPauseBtn");
let isPlaying = false;
let progressBar = document.getElementById("progressBar");

playPauseBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  playPauseBtn.className = isPlaying ? "bi bi-pause-circle-fill fs-3" : "bi bi-play-circle-fill fs-3";
});

let progress = 0;
setInterval(() => {
  if(isPlaying && progress < 100){
    progress++;
    progressBar.value = progress;
  }
}, 500);