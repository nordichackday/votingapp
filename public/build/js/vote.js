/** @jsx React.DOM */

var Vote = (function () {
  
  var voteUrl = "api/vote";
  var socket; 

  function vote(name, unicodeValue) {
    var voteMsg = {
      type: "vote",
      name: name,
      unicodeValue: unicodeValue
    };

    $.ajax({
      method: "POST",
      url: voteUrl,
      contentType: "application/json",
      data: JSON.stringify(voteMsg),
      success: function(data, error) { },
      error: function (data, error) { }
    });
  }  

  var initializePage = function () {
    socket = io.connect('http://localhost:8081');
    initButtons();
  };

  var initButtons = function () {
    $('button').on('click', function(event) {
      var unicodeValue = $(event.target).data("unicode");
      var name = $(event.target).data("name");
      vote(name, unicodeValue);
    });
  };
  return {
    init: initializePage
  };

})();