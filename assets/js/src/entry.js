
'use strict';

const daf_ani_31 = {};

daf_ani_31.CARD_OPEN_AUDIO_DELAY = 1000;
daf_ani_31.CARD_CLOSED_LISTNERS_DELAY = 1000;

daf_ani_31.removePreloader = () => {
  $('body').removeClass('loading');
};