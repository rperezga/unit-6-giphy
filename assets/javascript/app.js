
var myButton = ['cats', 'dogs', 'tigers', 'elephants', 'monkey', 'mouses'];
var apiKey = 'ojoFt2bRZRKMEQNJRwcOPONrkcM4PZKK';

var imageSrc = '';
var imageGif = '';

$(function () {
    function renderButtons() {
        $(".navbar-nav").empty();
        for (var i = 0; i < myButton.length; i++) {
            $(".navbar-nav").append("<li class='nav-item'><a class='nav-link animal' data-name='" + myButton[i] + "'>" + myButton[i].toUpperCase() + "</a></li>");
        }
    }

    function displayAnimalInfo() {
        var animalClicked = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalClicked + "&api_key=" + apiKey + "&limit=15";

        // Creates AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#flex-container").html("")

            for (var j = 0; j < response.data.length; j++) {
                imageSrc = response.data[j].images.fixed_height_still.url;
                $("#flex-container").append("<img src='" + imageSrc + "' value='" + j + "' move='no' style='margin: 5px;'>")
            }

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
    }

    // Adding new animal button
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        myButton.push(animal);
        renderButtons();
    });


    //Adding click event listeners to all elements with a class of "animal"
    $(document).on("click", ".animal", displayAnimalInfo);

    renderButtons();
});



