// Setting the variables
const container = document.querySelector(".container");
const playAudio = document.querySelector("#audioplayer");
const currentsong = document.querySelector(".currentsong");
const currentartist = document.querySelector(".currentartist");
const currentalbum = document.querySelector(".currentalbum");
const searchtext = document.querySelector(".searchtext");
const header = document.querySelector(".header");
const nowplaying = document.querySelector(".nowplaying");
let searchForm = document.querySelector(".formsearch");
let searchBarInput = document.querySelector(".search-bar__input");

// The url for the iTunes API
let searchBaseUrl = "https://itunes.apple.com/search?term=";

// The event listener that sends the info on "search"
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (searchBarInput.value) {
    let searchUrl = `${searchBaseUrl}${searchBarInput.value}${"&limit=50"}`;
    getSearchResults(searchUrl);
    searchtext.innerText = "Search Results: "; // <-- Displaying search results on search
  }
});

//fetch from the API
function getSearchResults(url) {
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      let searchResults = data.results;
      showSong(searchResults);
    });
}

//Search Results thumbnail
function showSong(songArray) {
  container.innerHTML = "";
  for (let song of songArray) {
    let songCardDiv = document.createElement("div");
    songCardDiv.classList.add("songcard");
    container.appendChild(songCardDiv);

    // Album thumbnail from the API
    let albumArt = document.createElement("img");
    albumArt.classList.add("albumart");
    songCardDiv.appendChild(albumArt);
    albumArt.src = `${song.artworkUrl100}`;

    //Song Title from the API
    let songTitleDiv = document.createElement("div");
    songTitleDiv.classList.add("SongTitle");
    songTitleDiv.innerText = `Song Title: ${song.trackName}`;
    songCardDiv.appendChild(songTitleDiv);

    //Band Name from the API
    let bandNameDiv = document.createElement("div");
    bandNameDiv.classList.add("bandName");
    bandNameDiv.innerText = `Artist Name: ${song.artistName}`;
    songCardDiv.appendChild(songTitleDiv);
    songCardDiv.appendChild(bandNameDiv);

    //Album from the API
    let albumDiv = document.createElement("div");
    albumDiv.classList.add("album");
    albumDiv.innerText = `Album Name: ${song.collectionName}`;
    songCardDiv.appendChild(bandNameDiv);
    songCardDiv.appendChild(albumDiv);

    // Event listener to perform the element mmoves on the page when the first song is played
    songCardDiv.addEventListener("click", (event) => {
      playAudio.src = `${song.previewUrl}`;
      nowplaying.innerText = "Now Playing: ";
      currentsong.innerText = `Song Title: ${song.trackName}`;
      currentartist.innerText = `Artist Name: ${song.artistName}`;
      playAudio.style.display = "grid";
      header.style.marginTop = "1rem";
      header.style.textAlign = "right";
      header.style.marginRight = "2rem";
      header.style.fontSize = "25px";
      header.style.marginBottom = "0";
      playAudio.style.width = "50%";
    });
  }
}
