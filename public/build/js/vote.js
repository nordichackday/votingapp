/** @jsx React.DOM */

(function($) {
  var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
  $.fn.nodoubletapzoom = function() {
    if (IS_IOS)
      $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp
          , t1 = $(this).data('lastTouch') || t2
          , dt = t2 - t1
          , fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) return; // not double-tap

        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(this).trigger('click').trigger('click');
      });
  };
})(jQuery);

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
    socket = io.connect();
    socket.on('users', function (data) {
      $("#users .num").text(data + " stemmere");  
    });
    initButtons();
  };

  var initButtons = function () {
    $('button').on('click', function(event) {
      var unicodeValue = $(event.target).data("unicode");
      var name = $(event.target).data("name");
      vote(name, unicodeValue);
    });

    $('button').nodoubletapzoom();
  };
  return {
    init: initializePage
  };

})();