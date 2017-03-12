
daf_ani_31.TitleControl = (config) => {

  'use strict';
  const instance = {};

  const soundControl = config.soundControl;

  const makeTitle = (data) => {
    const titleString = 
    `<div id="titleWrapper">
      <p>${data.text}</p>
    </div>`;
    $('#contentWrapper').append(titleString);
  };


  const createPlayButton = () => {
    $('#wrapper').one('click', onPlayButtonClickHandler);
    setTimeout(() => {
      $('#wrapper').append('<div id="playButton"></div>');
    }, 20);
  };


  const onPlayButtonClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    $('#playButton').remove();

    soundControl.play(instance.data.audio);
  };


  /* API */
  instance.init = (data) => {
    instance.data = data;
    makeTitle(instance.data);
    createPlayButton();
  };
  // instance.play = () => {
  //   soundControl.play(instance.data.audio);
  // };

  
  console.log('TitleControl ready');
  return instance;
};

/*
<div id="titleWrapper">
            <p>Gluckwunshe</p>
          </div>
*/