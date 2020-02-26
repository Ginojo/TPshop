
$(document).on("scroll", function(){

       if ($(document).scrollTop() > 200){
           $(".primary-nav").addClass("shrink");
       } else {
           $(".primary-nav").removeClass("shrink");
       }

 });
