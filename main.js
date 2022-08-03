const container = document.querySelector(".container");

//music player bar
//music titles below bar

// let searchBar = document.createElement("div");
// searchBar.classList.add('searchbar');
// container.appendChild(searchBar);

// let inputBox = document.createElement("input");
// inputBox.classList.add('inputbox');
// searchBar.appendChild(inputBox);

// let searchButton = document.createElement("button");
// // searchButton.classList.add("fa fa-search");
// searchButton.classList.add('searchbutton');
// searchBar.appendChild(searchButton);

//Search Results Header
// let searchHeader = document.createElement("div");
// searchHeader.classList.add('searchheader');
// searchHeader.innerText = "Search Results: ";
// container.appendChild(searchHeader);

//need to make a flex container for search thumbnails

let searchBaseUrl = "https://itunes.apple.com/search?term=";

let searchBarSubmit = document.querySelector('search-bar__submit')

searchBarSubmit.addEventListener('submit search', (event) => {
  event.preventDefault()
  let searchBarInput = document.querySelector ('.search-bar__input')
  let searchUrl = `${searchBaseUrl}${searchBarInput.value}`
  console.log('search url', searchUrl)
  getSearchResults(searchUrl)

})

//fetch
function getSearchResults(url) {
fetch(searchUrl, {
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
  for (let song of songArray) {
    let songCardDiv = document.createElement("div");
    songCardDiv.classList.add("songcard");
    container.appendChild(songCardDiv);
    //   let songCardDiv = document.createElement("div");
    //   songCardDiv.classList.add("SongCard");
    //   songCardDiv.innerText = ``;
    //   songDiv.appendChild(songCardDiv);
    //   contianer.appendChild(songDiv);

    // image div here
    let albumArt = document.createElement("img");
    albumArt.classList.add("albumart");
    // imageDiv.src = `${customer.picture.large}`;
    songCardDiv.appendChild(albumArt);
    albumArt.src = `${song.artworkUrl100}`;
    //    songCardDiv.appendChild(songDiv);

    //Song Title
    let songTitleDiv = document.createElement("div");
    songTitleDiv.classList.add("SongTitle");
    songTitleDiv.innerText = `Song Title: ${song.trackName}`;
    songCardDiv.appendChild(songTitleDiv);

    //Band Name
    let bandNameDiv = document.createElement("div");
    bandNameDiv.classList.add("bandName");
    bandNameDiv.innerText = `Artist Name: ${song.artistName}`;
    songCardDiv.appendChild(songTitleDiv);
    songCardDiv.appendChild(bandNameDiv);

    //Album
    // let stateAbbrev = nameToAbbr(`${customer.location.state}`);
    let albumDiv = document.createElement("div");
    albumDiv.classList.add("album");
    // AlbumDiv.innerText = `${customer.location.city}, ${AlbumAbbrev} ${customer.location.postcode}`;
    songCardDiv.appendChild(bandNameDiv);
    songCardDiv.appendChild(albumDiv);
  }
}
