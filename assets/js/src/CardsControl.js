
daf_ani_31.CardsControl = (config) => {

  'use strict';
  const instance = {};
  let cardsDataArray = [];

  const CARD_OPACITY_DELAY_MULTIPLYER = 250;

  let maxCards = 0;
  let cardCounter = 0;
  let sidesCounter = 0;
  let cardData;
  let cardsVisible = 0;

  let clickedCardId;
  let $currentCard;

  const soundControl = config.soundControl;

  const loadCards = (data) => {
    maxCards = data.length;
    cardData = data;
    processCard(cardData[cardCounter]);
  };

  const processCard = (card) => {
    console.log(card);

    let cardObject = {};
    cardsDataArray[cardCounter] = cardObject;
    cardsDataArray[cardCounter].audio = card.audio;

    Snap.load(`assets/images/cards/${card.front}.svg`, (svg, side) => {
      onSvgload(svg, 'front');
    });
    Snap.load(`assets/images/cards/${card.left}.svg`, (svg, side) => {
      onSvgload(svg, 'left');
    });
    Snap.load(`assets/images/cards/${card.right}.svg`, (svg, side) => {
      onSvgload(svg, 'right');
    });
  };

  const onSvgload = (svg, side) => {
    console.log(svg);
    console.log(side);
    cardsDataArray[cardCounter][side] = svg;
    sidesCounter++;
    if(sidesCounter === 3) {
      sidesCounter = 0;
      cardCounter++;
      if(cardCounter < maxCards) {
        processCard(cardData[cardCounter]);
      }
      else {
        console.log('all cards loaded');
        addCardsToDom();
      }
    }
  };

  const addCardsToDom = () => {
    let cardsString = '';
    // let closeDiv = '</div>';
    for (let i = 0; i < cardsDataArray.length; i++) {
      // let sStart = `<div class="card opacity-0" id="card-${i}" data-open="false" data-audio="${cardsDataArray[i].audio}">`;
      // let f = `<div class="card-side front"></div>`;
      // let l = `<div class="card-side left"></div>`;
      // let r = `<div class="card-side right"></div>`;
      // let sEnd = '</div>';
      // cardsString += sStart + f + l + r + sEnd;
      cardsString += 
      `<div class="card opacity-0" 
        id="card-${i}" 
        data-open="false" 
        data-audio="${cardsDataArray[i].audio}">

        <div class="card-side front"></div>
        <div class="card-side left"></div>
        <div class="card-side right"></div>
      </div>`
    }
    // return;
    $('#contentWrapper').append(cardsString);

    setTimeout(() => {
      insertSvgs();
    }, 50);
  };

  const insertSvgs = () => {
    for (let i = 0; i < cardsDataArray.length; i++) {
      Snap(`#card-${i} .front`).append( cardsDataArray[i].front );
      Snap(`#card-${i} .left`).append( cardsDataArray[i].left );
      Snap(`#card-${i} .right`).append( cardsDataArray[i].right );
      setTimeout(() => {
        showCardsInDom( $(`#card-${i}`) );
      }, i * CARD_OPACITY_DELAY_MULTIPLYER + 50);
    }
  };

  const showCardsInDom = (target) => {
    target.removeClass('opacity-0');
    cardsVisible++;
    console.log('cardsVisible', cardsVisible);
    if(cardsVisible === maxCards) {
      console.log('all the cards visible');
      $(instance).trigger('onCardsReady');
      addListnerToCards();
    }
  };

  const addListnerToCards = () => {
    $('.card').on('click', cardClickedHandler);
  };

  const removeListnerFromCards = () => {
    $('.card').off('click', cardClickedHandler);
  };

  const cardClickedHandler = (e) => {
    removeListnerFromCards();
    clickedCardId = $(e.currentTarget)[0].id.slice(-1);
    handleCard(clickedCardId);
  };

  const handleCard = (id) => {
    $currentCard = $('#card-' + id);
    
    $currentCard.one('transitionend', onCardIsOpen);

    $currentCard.attr({
      'data-open' : true
    });
    $('#contentWrapper').attr({
      "data-cardselected" : true
    });
  };

  const onCardIsOpen = (e) => {
    $currentCard.off('transitionend', onCardIsOpen);
    console.log('card is open');
    
    setTimeout(() => {
      $(instance).trigger('onCardIsOpen');
    }, daf_ani_31.CARD_OPEN_AUDIO_DELAY);
  };

  const playAudio = () => {
    $(soundControl).one('onAudioCompleted', onAudioCompletedHandler);
    soundControl.play( $currentCard.attr('data-audio') );
  };

  const onAudioCompletedHandler = (e) => {
    console.log('marker onAudioCompleted');
    $(instance).trigger('onAudioCompleted');
  };

  const enableCloseCard = () => {
    $currentCard.one('click', closecardHandler).addClass('close-button');
  };

  const closecardHandler = (e) => {
    $currentCard.one('transitionend', onCardIsClosed).removeClass('close-button');
    $currentCard.attr({
      'data-open' : false
    });
  };

  const onCardIsClosed = (e) => {
    $currentCard.off('transitionend', onCardIsClosed);
    console.log('card is closed');
    setTimeout(() => {
      $('#contentWrapper').attr({
        "data-cardselected" : false
      });
      $(instance).trigger('onCardIsClosed');
      addListnerToCards();
    }, daf_ani_31.CARD_CLOSED_LISTNERS_DELAY );
  };



  /* API */
  instance.init = (data) => {
    loadCards(data);
  };
  instance.play = () => {
    playAudio();
  };
  instance.enableCloseCard = () => {
    enableCloseCard();
  };
  
  console.log('CardsControl ready');
  return instance;
};


/*

        <div id="contentWrapper" data-cardselected="false">

          <div class="card active_" id="card-0" data-open="false">
            <div class="card-side front"></div>
            <div class="card-side left"></div>
            <div class="card-side right"></div>
          </div>

          <div class="card" id="card-1" data-open="false">
            <div class="card-side front"></div>
            <div class="card-side left"></div>
            <div class="card-side right"></div>
          </div>

          <div class="card" id="card-2" data-open="false">
            <div class="card-side front"></div>
            <div class="card-side left"></div>
            <div class="card-side right"></div>
          </div>

          <div class="card" id="card-3" data-open="false">
            <div class="card-side front"></div>
            <div class="card-side left"></div>
            <div class="card-side right"></div>
          </div>

          <div class="card" id="card-4" data-open="false">
            <div class="card-side front"></div>
            <div class="card-side left"></div>
            <div class="card-side right"></div>
          </div>

        </div>
        <!-- contentWrapper -->

*/