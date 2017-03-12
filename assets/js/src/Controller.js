
daf_ani_31.Controller = (config) => {

  'use strict';
  const instance = {};
  const soundControl = config.soundControl;
  const cardsControl = config.cardsControl;
  const titleControl = config.titleControl;


  const onInit = () => {
    $(cardsControl).on('onCardIsOpen', onCardIsOpenHandler);
    $(cardsControl).on('onAudioCompleted', onAudioCompletedHandler);
  };

  const onCardIsOpenHandler = (e) => {
    cardsControl.play();
  };

  const onAudioCompletedHandler = (e) => {
    cardsControl.enableCloseCard();
  };


  /* API */
  instance.init = () => {
    onInit();
  };
  
  console.log('Controller ready');
  return instance;
};