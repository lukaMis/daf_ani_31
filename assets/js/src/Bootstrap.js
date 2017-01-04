
daf_ani_31.Bootstrap = () => {

  'use strict';
  const instance = {};

  const data = daf_ani_31.DataHandler();

  const soundControl = daf_ani_31.SoundControl();
  $(soundControl).on('onAudioLoadComplete', (e) => {
    console.log('audio loaded');
    cardsControl.init( data.getCardsData() );
  });

  const cardsControl = daf_ani_31.CardsControl();
  $(cardsControl).on('onCardsReady', (e) => {
    console.log('cards ready');
  });




  data.init();
  soundControl.init( data.getData() );

  /* API */
  instance.init = () => {};
  
  console.log('Bootstrap ready');
  return instance;
};