var apiKey = 'ojoFt2bRZRKMEQNJRwcOPONrkcM4PZKK';
var myButton = ['cats', 'dogs', 'tigers', 'elephants', 'monkey', 'mouses'];
var imageSrc = '';
var imageGif = '';

$(function () {
  for (var i = 0; i < myButton.length; i++) {
    $("#myButtons").append("<button value='" + myButton[i] + "'>" + myButton[i].toUpperCase() + "</button>")
  }

  $("button").on("click", function () {

    $.ajax({
      url: "http://api.giphy.com/v1/gifs/search?q=" + this.value + "&api_key=" + apiKey + "&limit=15",
      method: "GET"
    }).then(function (response) {

      $("#flex-container").html("")

      for (var j = 0; j < response.data.length; j++) {
        imageSrc = response.data[j].images.fixed_height_still.url;
        $("#flex-container").append("<img src='" + imageSrc + "' value='" + j + "' move='no'>")
      }
      //console.log(response.data[0].images);

      setTimeout(function () {
        $("img").on("click", function () {
          imageGif = response.data[$(this).attr("value")].images.fixed_height.url;
          imageSrc = response.data[$(this).attr("value")].images.fixed_height_still.url;
          if ($(this).attr("move") == 'no') {
            $(this).attr("src", imageGif).attr("move", "yes");
          } else {
            $(this).attr("src", imageSrc).attr("move", "no");
          }
        });
      }, 2000);

    });

  });

});

