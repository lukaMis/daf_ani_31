
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

  /* API */
  instance.init = (data) => {
    instance.data = data;
    makeTitle(instance.data);
  };
  instance.play = () => {
    soundControl.play(instance.data.audio);
  };

  
  console.log('TitleControl ready');
  return instance;
};

/*
<div id="titleWrapper">
            <p>Gluckwunshe</p>
          </div>
*/