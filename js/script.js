// movies

function movieData(movie,target,compiled) {
  var moviedata = {
    "title":movie["title"],
    "original_title":movie["original_title"],
    "original_language":movie["original_language"],
    "vote":movie["vote_average"]/2,
    "star1":"",
    "star2":"",
    "star3":"",
    "star4":"",
    "star5":"",
    "flag": "",
    "poster":"https://image.tmdb.org/t/p/w185/"+movie["poster_path"]
    }
    var vote5 = Math.ceil(moviedata["vote"]);
    console.log(vote5);
    for (var i = 1; i <= vote5; i++) {
      moviedata["star"+i] = "gialla";
    }
    if (moviedata["original_language"] == "en") {
      moviedata["flag"] = "img/USAflag.gif";
    }
    else if (moviedata["original_language"] == "it") {
      moviedata["flag"] = "img/italflag.png";
    }
    else if (moviedata["original_language"] == "ja") {
      moviedata["flag"] = "img/jpflag.svg";
    }
  // console.log(moviedata);
  var moviedataHtml = compiled(moviedata);
  target.append(moviedataHtml);

  // for (var i = 1; i <= vote5; i++) {
  //   $("#stars i:nth-child("+i+")").addClass("gialla");
  //   console.log("ciclo di stelline",i);
  // }
}


function movieResults(search) {
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
// tv series
function tvserieData(serie,target,compiled) {
  var seriedata = {
    "name":serie["name"],
    "original_name":serie["original_name"],
    "original_language":serie["original_language"],
    "origin_country":serie["origin_country"],
    "vote":serie["vote_average"]/2,
    "star1":"",
    "star2":"",
    "star3":"",
    "star4":"",
    "star5":"",
    "flag": "",
    "poster":"https://image.tmdb.org/t/p/w185/"+serie["poster_path"]
    }
    var vote5 = Math.ceil(seriedata["vote"]);
    console.log(vote5);
    for (var i = 1; i <= vote5; i++) {
      seriedata["star"+i] = "gialla";
    }
    if (seriedata["origin_country"] == "US") {
      seriedata["flag"] = "img/USAflag.gif";
    }
    else if (seriedata["origin_country"] == "IT") {
      seriedata["flag"] = "img/italflag.png";
    }
    else if (seriedata["origin_country"] == "JP") {
      serieata["flag"] = "img/jpflag.svg";
    }
  // console.log(moviedata);
  var serieHtml = compiled(seriedata);
  target.append(serieHtml);
}
function tvseriesResults(search) {
  $.ajax({
    url:"https://api.themoviedb.org/3/search/tv",
    method:"GET",
    data: {
      "api_key":"044d0c2aa05cc2030718c5e50899f07d",
      "query": search
    },
    success: function(data,state){
      var seriesnum = data["total_results"];
      var series = data["results"];

      // console.log(moviesnum);
      var template = $("#serietv-template").html();
      var compiled = Handlebars.compile(template);
      var target = $("#resultstvs");
      target.text("");

      for (var i = 0; i < series.length; i++) {
        var serie = series[i];
        tvserieData(serie,target,compiled);

      }
    },
    error: function (request,state,error) {
      console.log("request",request);
      console.log("state",state);
      console.log("error",error);
    }
  });
}
// button
function search() {
  var search = $("#search").val();
  console.log(search);
  // var prova = "ritorno al futuro";
  movieResults(search);
  tvseriesResults(search);

}
function getEventListener() {
  var btn = $("#btn_search");
  btn.click(function(){
    search();
  });

}

function init() {
  getEventListener();
}

$(document).ready(init);
