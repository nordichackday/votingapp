/** @jsx React.DOM */

var Results = (function () {
  

  var initializePage = function () {
    var socket = io.connect('http://localhost:8081');
    
    jQuery(function ($) {
      socket.on('vote', function (data) {
        console.log(data);
      });
    });        
  };

  return {
    init: initializePage
  };

})();