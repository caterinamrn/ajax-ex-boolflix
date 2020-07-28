

function movieData(movie,target,compiled) {
  var moviedata = {
    "title":movie["title"],
    "original_title":movie["original_title"],
    "original_language":movie["original_language"],
    "vote":movie["vote_average"]/2
    }
    var vote5 = Math.ceil(moviedata["vote"])
    console.log(vote5);

  // console.log(moviedata);
  var moviedataHtml = compiled(moviedata);
  target.append(moviedataHtml);
  // Stars(vote5);
  for (var i = 0; i < vote5; i++) {
    $("#stars i").eq(i).addClass("gialla");
    console.log("success",i);
  }
  // var priamstella =  $("#stars i").eq(1);
  // console.log(priamstella);
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

      // console.log(moviesnum);
      var template = $("#movie-template").html();
      var compiled = Handlebars.compile(template);
      var target = $("#resultsmovie");
      target.text("");

      for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        movieData(movie,target,compiled);
        // var movieHtml = compiled(movie);
        // target.append(movieHtml);
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
  var btn = $("#btn_search");
  btn.click(function(){
    searchMovie();
    // searchTvseries();
  });

}

function init() {
  getEventListener();
}

$(document).ready(init);
