$(document).ready(function() {
  $("#search").click(search);
});

function search() {
  var input = $("#userinput").val();
  var url = ("https://en.wikipedia.org/w/api.php?"
    + "action=query&format=json&list=search&utf8=&srsearch="
    + encodeURIComponent(input));
  $("#spinner").removeClass("d-none");
  $.ajax({
    url,
    dataType: "jsonp",
    success: createEntries
  });
}

function createEntries(json) {
  var data = json.query.search;
  var entries = $("#entries");
  var template = $("#template");

  $("#spinner").addClass("d-none");
  entries.empty();
  for (var i = 0; i < data.length; i++) {
    var instance = template.clone().removeClass("d-none");
    instance.attr("href", "https://en.wikipedia.org/?curid=" + data[i].pageid);
    instance.find("h5").text(data[i].title);
    instance.find("p").html(data[i].snippet + "...");
    entries.append(instance);
  }
}
