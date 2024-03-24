const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzAyYzUwNDYzYmNmNWVjODFjNzllZTgzOTUwN2UzOSIsInN1YiI6IjY1OWU4N2Y2OGU4ZDMwMDE0YzIwMzk0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dyDtDrMnZg0gH6uMHmBkUyH_xGoEq9fO3asEItwkHoQ",
  },
};

const listRef = document.querySelector(".movies-list");

const fetchMoviesAll = async () => {
  try {
    const data = fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US&page=10",
      options
    ).then((res) => res.json());

    return data;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchMovies = async () => {
  try {
    const { results } = await fetchMoviesAll();

    const moviesMarkup = results
      .map(({ title, overview, release_date, poster_path, genres }) => {
        if (title === undefined) {
          return;
        }

        return `<li>
        <div class="movie-card">
          <div class="top-section-movie">
            <div class="left-section">
              <div class="title-block">
                <h2 class="main-title-movie">${title} (${
          release_date.split("-")[0]
        })</h2>
              </div>
         <div class="img-wrapper"><img
                class="img"
                width="172"
                height="248"
                src=${"https://image.tmdb.org/t/p/w200" + poster_path}
                alt=${title}
              /></div>
            </div>
            <div class="right-section">
              <p class="section-subtitle">
                Year of manufacture: <span class="underlined-text">${release_date}</span>
              </p>
              <p class="section-subtitle">
                Country: <span class="underlined-text">UK , USA</span>
              </p>
              <p class="section-subtitle">
                Genre:
                <span class="underlined-text"
                  >
                  New / Movies / Action / Thriller</span
                >
              </p>
              <p class="section-subtitle">
                Quality: <span class="underlined-text">WEB-DL 720</span>
              </p>
              <p>
               ${overview}
              </p>
            </div>
          </div>
          <button class="button" type="button">Watch online</button>
        </div>
      </li>
      <br/>
      <hr />
      <br/>`;
      })
      .join("");

    listRef.insertAdjacentHTML("beforeend", moviesMarkup);
    listRef.insertAdjacentHTML('afterend', `<button type="button">Load more</button>`)

    console.log(results);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};

fetchMovies();