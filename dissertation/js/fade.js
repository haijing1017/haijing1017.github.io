// Fades away as you scroll down
$(window).scroll(function(){
    $(".notpicture").css("opacity", 1 - $(window).scrollTop() / 700);
  //700 is fade pixels
  });