

(() => {

  'use strict';
  $(document).one('i18nComplete', oni18nComplete);


  function oni18nComplete(e) {
    FastClick.attach(document.body);

    daf_ani_31.Bootstrap();
    // $('body').removeClass('loading');

    // $('.card').on('click', function() {

    //   $('#contentWrapper').attr({
    //     "data-cardselected" : true
    //   });

    //   if($(this).hasClass('active')) {
    //     $(this).removeClass('active');

    //     $('#contentWrapper').attr({
    //       "data-cardselected" : false
    //     });
    //   } else {
    //     $(this).addClass('active');
    //   }

    //   if( $(this).attr('data-open') ) {
    //     $(this).attr({
    //       'data-open': false
    //     })
    //     $('#contentWrapper').attr({
    //       "data-cardselected" : false
    //     });
    //   } else {
    //     $(this).attr({
    //       'data-open': true
    //     })
    //   }

    // });
  
  };


})();