const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displaySongs(data.data))


        document.getElementById('search-field').value = '';
        document.getElementById('song-lyric').innerText = '';

}

const displaySongs = songs => {
   // console.log(songs)
    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML = '';

    songs.forEach(song => {
        //console.log(song.title)
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
               <source src = "${song.preview}"
            </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onClick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
       
        `;
        songContainer.appendChild(songDiv);
        //<link href="${song.link}"></link>
    })
}
const getLyric = (artist, title) => {
    //console.log(artist, title)
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayLyric(data.lyrics))

}

const displayLyric = lyrics => {
    const lyricDiv = document.getElementById('song-lyric') 
    //lyricDiv.innerText = '';  
    lyricDiv.innerText = lyrics;
}
