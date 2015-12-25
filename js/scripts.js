// $('#myCarousel3450857').touchwipe({
//   wipeLeft: function() {
//     $('#myCarousel3450857').carousel('next');
//   },
//   wipeRight: function() { $('#myCarousel3450857').carousel('prev');},
//   min_move_x: 0         
// });

// $(document).ready(function(){
//   // $("#myCarousel3450857").touchwipe({
//   //    wipeLeft: function() { $('#myCarousel3450857').carousel('next'); },
//   //    wipeRight: function() { alert("right"); },
//   //    min_move_x: 20,
//   //    preventDefaultEvents: true
//   // });
//   $('#myCarousel3450857').bcSwipe({ threshold: 20 });
// });

// jQuery(document).ready(function($) {
//   var myElement = document.getElementById('myCarousel3450857');
//   var mc = new Hammer(myElement);
//   mc.on("swipeleft", function(ev) {
//     $('#myCarousel3450857').carousel('next');
//   });
//   mc.on("swiperight", function(ev) {
//     $('#myCarousel3450857').carousel('prev');
//   });
// });

$(document).ready(function() {  
  //Enable swiping...
  $("#myCarousel3450857").swipe( {
    //Generic swipe handler for all directions
    swipeLeft:function(event, direction, distance, duration, fingerCount) {
      $(this).parent().carousel('prev'); 
    },
    swipeRight: function() {
      $(this).parent().carousel('next'); 
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold: 30
  });
});