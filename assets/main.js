Vue.config.devtools = true;

var app = new Vue ({
  el: '#root',
  data: {
    movies: []

  },
  mounted() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=46a985f8a6499d16bf2fd0c1064f7714&language=en-US&page=1')
    .then((response) => {
      this.movies.push(response.data.results);
    })
  },
  searchMovie: () => {

  }
});
