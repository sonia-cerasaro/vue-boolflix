Vue.config.devtools = true;

var app = new Vue ({
  el: '#root',
  data: {
    selectedMovie: '',
    arrayMoviesAndTvShows: [],
    selectedMovies: [],
    currentIndex: 0,
    uri: 'https://api.themoviedb.org/3',
    api_key: '46a985f8a6499d16bf2fd0c1064f7714',
    lang: 'it-IT'
  },
  mounted() {
    axios.get(`${this.uri}/movie/popular?api_key=${this.api_key}&language=${this.lang}&page=1`)
    .then((response) => {
      this.arrayMoviesAndTvShows = response.data.results;
    });
    axios.get(`${this.uri}/tv/popular?api_key=${this.api_key}&language=${this.lang}&page=1`)
    .then((response) => {
      this.arrayMoviesAndTvShows = [...this.arrayMoviesAndTvShows, ...response.data.results];
      this.selectedMovies = this.arrayMoviesAndTvShows;
    });
  },
  methods: {
    setSelectedMovies: function () {
      this.selectedMovies = [];
      this.arrayMoviesAndTvShows.forEach((movie) => {
        if (this.getTitle(movie).toLowerCase().includes(this.selectedMovie.toLowerCase())) {
          this.selectedMovies.push(movie);
        } else if (this.selectedMovie == '') {
          this.selectedMovies = this.arrayMoviesAndTvShows;
        }
      });
    },
    getFlagImagePath: function (currentMovie) {
      return `https://www.unknown.nu/flags/images/${currentMovie.original_language}-100`;
    },
    getPosterImagePath: function (currentMovie) {
      return `https://image.tmdb.org/t/p/w154/${currentMovie.poster_path}`;
    },
    getRate: function (currentMovie) {
      var percentage = currentMovie.vote_average * 10;
      return percentage + '%';
    },
    getTitle: function (obj) {
      if (obj.title) {
        return obj.title;
      }else{
        return obj.name;
      }
    },
  }
});
