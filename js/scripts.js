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

$(document).ready(function() {  
$('#myCarousel3450857').hammer().on('swipeleft', function(){
$(this).carousel('next'); 
})
$('#myCarousel3450857').hammer().on('swiperight', function(){
$(this).carousel('prev'); 
})
}); 