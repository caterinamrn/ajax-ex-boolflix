function movieData(movie) {
  var title = movie["title"];
  var origTitle = movie["original_title"];
  var lenguage = movie["original_language"];
  var vote = movie["vote_average"];
  console.log(title,origTitle,lenguage,vote);
}

function searchMovie() {
  var search = $("#movie_search").val();
  console.log(search);
  var prova = "ritorno al futuro";
  results(prova);

}
function results(prova) {
  $.ajax({
    url:"https://api.themoviedb.org/3/search/movie",
    method:"GET",
    data: {
      "api_key":"044d0c2aa05cc2030718c5e50899f07d",
      "query": prova
    },
    success: function(data,state){
      var moviesnum = data["total_results"];
      var movies = data["results"];

      console.log(moviesnum);
      for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        // var title = movie["title"];
        // console.log(title);
        movieData(movie);
      }
    },
    error: function (request,state,error) {
      console.log("request",request);
      console.log("state",state);
      console.log("error",error);
    }
  });
}

function getEventListener() {
  var btn = $("#btn_search")
  btn.click(searchMovie)
}

function init() {
  getEventListener();
}

$(document).ready(init);
