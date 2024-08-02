// fix the nav when scroll down
$(function(){
        var stickyHeaderTop = $('.nav').offset().top;
 
        $(window).scroll(function(){
                if( $(window).scrollTop() >= stickyHeaderTop ) {
                        $('.nav').css({position: 'fixed', top: '0px'});
                } else {
                        $('.nav').css({position: 'relative', top: '0px'});
                }
        });
  });