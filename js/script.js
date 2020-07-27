function movieData(movie,target,compiled) {
  var moviedata = {
    "title":movie["title"],
    "original_title":movie["original_title"],
    "original_language":movie["original_language"],
    "vote_average":movie["vote_average"]
  }

  console.log(moviedata);
  var moviedataHtml = compiled(moviedata);
  target.append(moviedataHtml);
}

function searchMovie() {
  var search = $("#movie_search").val();
  console.log(search);
  // var prova = "ritorno al futuro";
  results(search);

}
function results(search) {
  $.ajax({
    url:"https://api.themoviedb.org/3/search/movie",
    method:"GET",
    data: {
      "api_key":"044d0c2aa05cc2030718c5e50899f07d",
      "query": search
    },
    success: function(data,state){
      var moviesnum = data["total_results"];
      var movies = data["results"];

      console.log(moviesnum);
      var template = $("#movie-template").html();
      var compiled = Handlebars.compile(template);
      var target = $("#results");

      for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        movieData(movie,target,compiled);
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
