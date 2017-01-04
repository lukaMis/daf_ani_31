
daf_ani_31.Bootstrap = () => {

  'use strict';
  const instance = {};

  const data = daf_ani_31.DataHandler();

  const soundControl = daf_ani_31.SoundControl();
  $(soundControl).on('onAudioLoadComplete', (e) => {
    console.log('audio loaded');
    cardsControl.init( data.getCardsData() );
  });

  const cardsControl = daf_ani_31.CardsControl({
    soundControl: soundControl
  });
  $(cardsControl).on('onCardsReady', (e) => {
    console.log('cards ready');
    titleControl.init( data.getTitleData() );
    controller.init();
    daf_ani_31.removePreloader();
  });

  const titleControl = daf_ani_31.TitleControl({
    soundControl: soundControl
  });

  const controller = daf_ani_31.Controller({
    soundControl: soundControl,
    cardsControl: cardsControl,
    titleControl: titleControl
  });




  data.init();
  soundControl.init( data.getData() );

  /* API */
  instance.init = () => {};
  
  console.log('Bootstrap ready');
  return instance;
};