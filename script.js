$(function () {
   var parent = $("#shuffle");
   var divs = parent.children();
   while (divs.length) {
       parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
   }
});

$(document).ready(function() {
  var matched = 0;
  var numSelected = 0;
  $("#shuffle").bind("mousedown", function(e) { // this 
    e.metaKey = true;                           // is
  }).selectable( {                              // magical
    selected: function() {
      numSelected++;
      $(".ui-selected").find("img").fadeIn(500);
      if (numSelected == 2) {
        var selectedClass = "";
        $(".ui-selected").each(function() {
          if (selectedClass == "") selectedClass = $("img", this).attr("class");
          else if (selectedClass == $("img", this).attr("class")) {
            // matching
            //console.log("matched");
            $(".ui-selected").each(function() {
              $(this).removeClass("ui-selected");
              $("img", this).delay(1000).fadeOut(500);
              $(this).delay(1000).queue(function(next) { // queue() is sehr important !!
                $(this).css("visibility", "hidden");
                next();
              });
            });
            matched++;
          }
          else {
            // not matching
            //console.log("not matched");
            $(".ui-selected").each(function() {
              $(this).removeClass("ui-selected");
              $("img", this).delay(1000).fadeOut(500);
            });
          }
        });
        numSelected = 0;
      }

      if (matched == 8) alert('Congratulations!!! You WIN !!!');
    }
  });
});