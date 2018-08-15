// Creat initial buttons
var initialButtons = ["Beyonce", "Selena", "Cher", "Michael Jackson"];

function renderInitialButtons() {

    $("#more-buttons").empty();

    for (var i = 0; i < initialButtons.length; i++) {
        var button = $("<button>");
        button.addClass("topic-btn");
        button.attr("data-name", initialButtons[i]);
        button.text(initialButtons[i]);
        $("#more-buttons").append(button);

    }
}


$("#add-topic").on("click", function (event) {

    event.preventDefault();
    var input = $("#topic-input").val().trim();
    initialButtons.push(input);
    renderInitialButtons();

});


function displaystillGIFS() {

    var something = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + something + "&api_key=dc6zaTOxFJmzC&limit=10";

    $("#gifs-appear-here").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);

            personImage.attr("data-active", results[i].images.fixed_height.url);


            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);


            $(personImage).on("click", function displayactiveGIFS(event) {
   
                    $(this).attr("src", $(this).attr("data-active"));
                    

            })

        }

    })
}



// Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displaystillGIFS);


renderInitialButtons();

