

(() => {

  'use strict';
  $(document).one('i18nComplete', oni18nComplete);


  function oni18nComplete(e) {
    FastClick.attach(document.body);
    $('body').removeClass('loading');

    $('.card').on('click', function() {
      if($(this).hasClass('active')){
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    });
  };


})();