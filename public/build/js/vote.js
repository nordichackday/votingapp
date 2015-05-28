/** @jsx React.DOM */

var Vote = (function () {
  
  var voteUrl = "api/vote";

  function vote(value) {

    $.ajax({
      method: "POST",
      url: voteUrl,
      contentType: "application/json",
      data: {
        type: "vote",
        value: value,
      },

      success: function(data, error) {
        
      },
      error: function (data, error) {
        
      }
    });
  }  

  var initializePage = function () {
    initButtons();
  };

  var initButtons = function () {
    $('button#yes').on('click', function() {
      vote(1);
    });

    $('button#no').on('click', function() {
      vote(0);
    });
  };
  return {
    init: initializePage
  };

})();