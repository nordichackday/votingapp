/** @jsx React.DOM */

var Results = (function () {
  
  var oldYes = 50;

  function getRandomNum() {
    var x = Math.floor((Math.random() * 10000));
    return x;
  }

  function createVoteDiv(unicode) {
    var emojiDiv = $("<div>").addClass("emojiVote");
    emojiDiv.html(unicode);
    emojiDiv.css("top", 470 + getRandomNum() % 35);
    emojiDiv.css("left", getRandomNum() % 360 + 360);
    return emojiDiv;
  }

  function spawnVote(data) {
    var newIcon = createVoteDiv(data.unicodeValue);
    $("#video_overlays").append(newIcon);

    var frameNum = Math.random();
    var originX = newIcon.css("left");

    var intervalId = window.setInterval(function() {
      frameNum = frameNum + 0.3;
      newIcon.css("left", (Math.sin(frameNum) * 5) + parseInt(originX))
    }, 1000/30);

    newIcon.animate(
      {
        top: "280px",
        opacity: "0.2"
      }, 1200);

    window.setTimeout(function() {
      newIcon.remove();
      window.clearInterval(intervalId);
    }, 1200);
  }

  function updateBars(yesVotes, noVotes) {
    var total = yesVotes + noVotes;
    var yesPercent = Math.floor(yesVotes / total * 100);
    if (oldYes == yesPercent) {
      return;
    }

    oldYes = yesPercent;

    $(".votes .no").css("width", "30px");
    $(".votes .yes").animate({ width: yesPercent + "%" }, function() {
    });
  }

  var initializePage = function () {
    var socket = io.connect();
    
    jQuery(function ($) {
      socket.on('vote', function (data) {
        spawnVote(data);  
      });

      socket.on('users', function (data) {
        $("#users .num").text(data + " stemmere");
      });      

      socket.on('aggregate', function (data) {
        var first = data[0];
        var second = data[1];

        if (first == undefined || second == undefined)
          return;

        if (first.name == "yes") {
          var yesVotes = first.votes;
          var noVotes = second.votes;
          updateBars(yesVotes, noVotes);
        } else if (first.name == "no") {
          var noVotes = first.votes; 
          var yesVotes = second.votes;
          updateBars(yesVotes, noVotes);
        }
      });
    });        
  };

  return {
    init: initializePage
  };

})();