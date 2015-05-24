$(document).ready(function(){
  $(".navbar a").on('click', function(event) {
    event.preventDefault(); //preventDefault blokuje domyślne zachowanie przeglądaki, mam tutaj linki
    var element = $(event.target).attr('data-target');

    $('html, body').animate({
        scrollTop: $(element).offset().top -200
    }, 1000);
  });
});
