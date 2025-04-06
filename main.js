const searchEl = document.getElementById("search")
const formEl = document.getElementById("form")
const MoviesContainer = document.querySelector(".movies-details");
const TvShowsContainer = document.querySelector(".Tv-details");
const PaginationsEl = document.querySelectorAll(".pagination li")

// apikey 02ba5965fb39f94a675f2b07cb343980

//https://image.tmdb.org/t/p/w1280

const API_KEY = "02ba5965fb39f94a675f2b07cb343980"
const MoviesApi = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const imagePath = "https://image.tmdb.org/t/p/w1280";
const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const TVShowsAPI = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}`;

const searchTvShowsURL = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;


getMovies(MoviesApi)
//get movies function

async function getMovies(url){
    try{
        const result = await fetch(url);
        if(!result.ok){
            throw new Error(`HTTP Error: ${result.status}`);
        }
        const data = await result.json();
        showMovies(data.results)
    }catch(error){
        console.error("Error fetching movies:", error);

    }
}

//funsction to display movies in html
function showMovies(movies){
    MoviesContainer.innerHTML = "";
    movies.forEach((movie) =>{
        const { title, poster_path, release_date, vote_average } = movie
        const MoviesDisplay = document.createElement('div')
        MoviesDisplay.classList.add('movies')
        MoviesDisplay.innerHTML = `<img src=${imagePath+poster_path} alt="">
        <p class="movie-title">${title}</p>
        <div class="movie-desc">
        <p class="movie year">Date: ${release_date}</p>
        <p class="rating">Vote: ${vote_average}</p>
    </div>`

    MoviesContainer.appendChild(MoviesDisplay)
    })
}

//search
formEl.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm = searchEl.value;
    if (searchTerm && searchTerm !==""){
        getMovies(searchURL + searchTerm);
        getTvShows(searchTvShowsURL + searchTerm);
        searchTerm.value= ""
    } else{
        window.location.reload()
    }
})

getTvShows(TVShowsAPI)
//get movies function

async function getTvShows(url){
    try{
        const result = await fetch(url);
        if(!result.ok){
            throw new Error(`HTTP Error: ${result.status}`);
        }
        const data = await result.json();
        showTvShows(data.results)
    }catch(error){
        console.error("Error fetching movies:", error);

    }
}
 function showTvShows (tvshows){
    TvShowsContainer.innerHTML = "";
    tvshows.forEach((tvshow)=>{
        const {name, poster_path, vote_average, first_air_date} = tvshow;
        const tvShowsDisplay = document.createElement('div');
        tvShowsDisplay.classList.add('tvShows');
        tvShowsDisplay.innerHTML = ` <img src="${imagePath+poster_path}" alt="">
        <p class="movie-title">"${name}"/p>
        <div class="movie-desc">
        <p class="movie year">"${first_air_date}"/</p>
        <p class="rating">"${vote_average}"/</p>
    </div> `

    TvShowsContainer.appendChild(tvShowsDisplay);
    })
}


PaginationsEl.forEach((page, index) => {
    page.addEventListener("click", () => {
        const pageNumber = index + 1; // Adjust if pagination starts from 1
        getMovies(`${MoviesApi}&page=${pageNumber}`);
        getTvShows(`${TVShowsAPI}&page=${pageNumber}`);
    });
});