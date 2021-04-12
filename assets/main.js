Vue.config.devtools = true;

var app = new Vue ({
  el: '#root',
  data: {
    selectedMovie: '',
    movies:[],
    selectedMovies:[],
    currentIndex: 0
  },
  mounted() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=46a985f8a6499d16bf2fd0c1064f7714&language=en-US&page=1')
    .then((response) => {
      this.movies = response.data.results;
      this.selectedMovies = this.movies;

    })
  },
  methods: {

    setSelectedMovies: function () {
      this.selectedMovies = [];
      this.movies.forEach((movie) => {
        if (movie.title.toLowerCase().includes(this.selectedMovie.toLowerCase())) {
          this.selectedMovies.push(movie);
        } else if (this.selectedMovie == '') {
          this.selectedMovies = this.movies;
        }
      });
    },
  }
});
