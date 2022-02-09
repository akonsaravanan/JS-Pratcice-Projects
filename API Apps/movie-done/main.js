const form = document.querySelector("#form");
const input = document.querySelector("#search");
const main = document.querySelector("main");
const appTitle = document.querySelector("#appTitle");

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

fetchMovie(APIURL);

async function fetchMovie(api) {
  const data = await fetch(api);
  const res = await data.json();
  displayMovie(res);
}

const displayMovie = function (res) {
  main.innerHTML = "";
  res.results.forEach(function (movie) {
    // console.log(movie);
    const { poster_path, title, vote_average, overview } = movie;
    let moviecontent = `<div class = 'movie'><img 
    src="${IMGPATH + poster_path}" 
    alt="${title}">
<div class="movie-info">
    <h3>${title}</h3>
    <span class="${getMovieByRate(vote_average)}">${vote_average}</span>
    <div class="overview">
    <h4>Overview</h4>
    ${overview}
    </div>
</div>`;
    main.insertAdjacentHTML("beforeend", moviecontent);
  });
};

function getMovieByRate(vote_average) {
  if (vote_average >= 8) {
    return "green";
  } else if (vote_average >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

appTitle.addEventListener("click", function (e) {
  location.reload();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const search = input.value;
  if (search !== null || search !== "") {
    fetchMovie(SEARCHAPI + search);
  }
});
