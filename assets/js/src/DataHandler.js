
daf_ani_31.DataHandler = () => {

  'use strict';
  const instance = {};

  /* API */
  instance.init = () => {
    daf_ani_31.DATA = i18n.t('data', {returnObjectTrees: true});
  };
  instance.getData = () => {
    return daf_ani_31.DATA;
  };
  instance.getCardsData = () => {
    return daf_ani_31.DATA.cards;
  };
  instance.getTitle = () => {
    return daf_ani_31.DATA.title;
  };
  
  console.log('DataHandler ready');
  return instance;
};