$(document).ready(function() {
  $("#search").click(search);
});

function search() {
  var input = $("#userinput").val();
  var url = ("https://en.wikipedia.org/w/api.php?"
    + "action=query&format=json&list=search&utf8=&srsearch="
    + encodeURIComponent(input));
  console.log("search");
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
  var template = entries.children();

  $("#spinner").addClass("d-none");
  for (var i = 0; i < data.length; i++) {
    var instance = template.clone().removeClass("d-none");
    instance.attr("href", "https://en.wikipedia.org/?curid=" + data[i].pageid);
    instance.find("h5").text(data[i].title);
    instance.find("p").text(data[i].snippet + "...");
    entries.append(instance);
  }
}
