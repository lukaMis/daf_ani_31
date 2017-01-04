
daf_ani_31.SoundControl = () => {

  'use strict';
  const instance = {};

  let filesLoaded = 0;
  let filesToLoad = 0;

  
  const loadAudio = (data) => {
    createjs.Sound.on('fileload', onSoundLoaded);
    
    // cards
    for (let i = 0; i < data.cards.length; i++) {
      filesToLoad++;
      createjs.Sound.registerSound( `assets/audio/${data.cards[i].audio}.mp3`, data.cards[i].audio );
    }

    // title
    filesToLoad++;
    createjs.Sound.registerSound( `assets/audio/${data.title.audio}.mp3`, data.title.audio );
  };


  const onSoundLoaded = (e) => {
    filesLoaded++;
    if(filesLoaded === filesToLoad) {
      filesLoaded = null;
      filesToLoad = null;
      $(instance).trigger('onAudioLoadComplete');
    }
  };


  const playAudio = (id) => {
    const player = createjs.Sound.play(id);
    player.on('complete', onAudioCompleted);
  };


  const onAudioCompleted = (e) => {
    e.target.off('complete', onAudioCompleted);
    $(instance).trigger('onAudioCompleted');
  };


  /* API */
  instance.init = (config) => {
    loadAudio(config);
  };
  instance.play = (id) => {
    playAudio(id);
  };

  console.log('SoundControl ready.');
  return instance;
};