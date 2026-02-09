$(document).ready(function () {

  $("#btnGo").on("click", function () {
    $("#weatherResult").html("<p>Button clicked. JavaScript is working.</p>");
    $("#artResult").html("<p>Waiting for API data...</p>");
    $("#keywordResult").text("Not selected yet.");
  });

  $("#btnClear").on("click", function () {
    $("#cityInput").val("");
    $("#weatherResult").html("<p class='text-muted mb-0'>No weather loaded yet</p>");
    $("#artResult").html("<p class='text-muted mb-0'>No artwork loaded yet</p>");
    $("#keywordResult").text("None yet");
  });

});
