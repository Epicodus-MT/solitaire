
//The  player will own the playing pile
function Player () {
  this.pile = [];
};

//Constructor for playing cols
function PlayingCols (num){
  this.row = [];
  this.num = num;
};
//PlayingCols METHODS

//tests to see if a card can be added to a column based on number and suit
PlayingCols.prototype.addToCol = function (card) {
  let lastCard = this.row.length - 1;
  if (this.row.length === 0) {
    this.row.push(card);
  } else if (this.row[lastCard].shade !== card.shade && this.row[lastCard].number - card.number === 1) {
    this.row.push(card);
  }
}

//Foundation rows which are needed for winning
function FoundationRows (){
  this.foundationRow = [];
  this.suit = "";
}

//FoundationRows METHODS

//Starts and defines a row
FoundationRows.prototype.defineRow = function (card) {
  if (this.foundationRow.length === 0 && card.number === 1) {
    this.foundationRow.push(card);
    this.suit = card.suit;
    console.log(this.foundationRow[0]);
  } else {console.log("NO");}
}
//adds card to rows
FoundationRows.prototype.addToRow = function (card){
  let numToSub = card.number - this.foundationRow.length;
  if (numToSub === 1 && this.suit === card.suit){
    this.foundationRow.push(card);
    console.log(card);
  } else {
    console.log("NO");
  }

}


//The card objects
function Card (suit,number,shade){
  this.suit = suit;
  this.number = number;
  this.shade = shade
  if (this.number === 1){ this.ace = true;}
  this.faceDown = true;
}



//The card deck
function CardDeck () {
  this.deck = [];
}

//CardDeck METHODS

//puts 52 card objects into a deck

CardDeck.prototype.initializeDeck = function(){
  for (let x = 0; x < 52;x++){
    let y = x + 1;
    if (x <= 12){
      card = new Card("spades",y,"black");
      this.deck.push(card);
    } else if (x <= 25 && x > 12) {
      card = new Card("hearts", y - 13, "red");
      this.deck.push(card);
    } else if (x <= 38 && x > 25) {
      card = new Card("diamonds", y - 26, "red");
      this.deck.push(card);
    } else {
      card = new Card("clubs", y - 39, "black");
      this.deck.push(card);
    }
  }
}

//shuffles deck
CardDeck.prototype.shuffle = function (){
  let currentIndex = this.deck.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -=1;
    temporaryValue = this.deck[currentIndex];
    this.deck[currentIndex] = this.deck[randomIndex];
    this.deck[randomIndex] = temporaryValue;
  }
  console.log(this.deck);
}

//Pushes the cards out onto the board
function presentCards (playingCol) {
  let lastCard = playingCol.row.length - 1;
  playingCol.row[lastCard].faceDown = false;
  for (let x = 0; x < playingCol.row.length; x++){
    if (playingCol.row[x].faceDown === true){
        $('#playingCol' + playingCol.num).append("<img class = 'card' id='" + playingCol.row[x].number + playingCol.row[x].suit +"' src='img/deck-haunted-house.png' />")
    } else {
        $('#playingCol' + playingCol.num).append("<img class = 'card' id='" + playingCol.row[x].number + playingCol.row[x].suit +"' src='img/" + playingCol.row[x].number + "_of_" + playingCol.row[x].suit + ".jpeg' draggable='true' ondragstart='drag(event)' ondragstart='drag(event)'  />")
    }
  }
}

//puts the game board together
CardDeck.prototype.startGame = function(){
  //loop to draw random card
  for (let z = 0; z <= 27; z++) {
    //generates random number to pull element/card from array
    let x = Math.floor(Math.random() * (this.deck.length - 1)) + 1;
    //pulledCard = the card drawn
    let pulledCard = this.deck[x];
    //deletes pulled card drom this.deck
    this.deck.splice(x, 1);
    //pushes pulled card to the appropriate row
    if (z === 0 )        {playingCol1.row.push(pulledCard); }
    if (z >= 1 && z <= 2 ) {playingCol2.row.push(pulledCard); }
    if (z >= 3 && z <= 5 ) {playingCol3.row.push(pulledCard); }
    if (z >= 6 && z <= 9 ) {playingCol4.row.push(pulledCard); }
    if (z >= 10 && z<= 14 ) {playingCol5.row.push(pulledCard); }
    if (z >= 15 && z <= 20 ) {playingCol6.row.push(pulledCard); }
    if (z >= 21 && z <= 27 ) {playingCol7.row.push(pulledCard); }
  }
  presentCards(playingCol1);
  presentCards(playingCol2);
  presentCards(playingCol3);
  presentCards(playingCol4);
  presentCards(playingCol5);
  presentCards(playingCol6);
  presentCards(playingCol7);
  $('#deck').append("<img class = 'card' src='img/deck-haunted-house.png'  />");
  this.shuffle();
}

//Deals cards
CardDeck.prototype.deal = function(){
  if (this.deck.length === 0) {
    for (let x = 0; x < 24; x++){
      this.deck.push(player.pile[x]);
    }
    for (let x = 0; x < 24; x++){
      player.pile.splice(0,1);
    }
    $('#deck').append("<img class = 'card' src='img/deck-haunted-house.png'  />");
    $('#pile').empty();
  } else {
    //Pulls a random card from the deck and leaves it in the player's pile
    this.deck[0].faceDown = false;
    player.pile.push(this.deck[0]);
    this.deck.splice(0, 1);

    //Displays dealt card to html by appending the appropriate img
    let lastCard = player.pile.length - 1;
    player.pile[lastCard].faceDown = false;
    $('#pile').append("<img class = 'card' id='" + player.pile[lastCard].number + player.pile[lastCard].suit + "' src='img/" + player.pile[lastCard].number + "_of_" + player.pile[lastCard].suit + ".jpeg' draggable='true' ondragstart='drag(event)' />")
    if (this.deck.length === 0) {
      $('#deck').empty();
    }
  }
}

//check for victory!
function checkForVictory(){
  if(
    fRow1.row.length === 13 &&
    fRow2.row.length === 13 &&
    fRow3.row.length === 13 &&
    fRow4.row.length === 13
  ) {victory = true;}
}


//functions for drag and drop
function allowDrop(ev) {
  ev.preventDefault();
  console.log("allowDrop");
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log("drag");
}

function drop(ev) {
  ev.preventDefault();
  console.log("drop");
  var data = ev.dataTransfer.getData("text");
  console.log(data)
  ev.currentTarget.appendChild(document.getElementById(data));

}

//Run Game
$(document).ready(function(){
  victory = false;
  player = new Player();
  solitaire = new CardDeck();
  firstCard = 0;
  playingCol1 = new PlayingCols(1);
  playingCol2 = new PlayingCols(2);
  playingCol3 = new PlayingCols(3);
  playingCol4 = new PlayingCols(4);
  playingCol5 = new PlayingCols(5);
  playingCol6 = new PlayingCols(6);
  playingCol7 = new PlayingCols(7);
  fRow1 = new FoundationRows();
  fRow2 = new FoundationRows();
  fRow3 = new FoundationRows();
  fRow4 = new FoundationRows();
  solitaire.initializeDeck();
  solitaire.startGame();



  $('.card').click(function(){
    let cardId = '#' + this.id;
    let cardCol = '#' + $(this).parent().attr('id');
    let idArray = this.id.split(/(\d+)/g);
    idArray.splice(0,1);
    $(cardId).remove();
    $(cardCol).append("<img class = 'card' id='" + idArray[0] + idArray[1] +"' src='img/" + idArray[0] + "_of_" + idArray[1] + ".jpeg' draggable='true' ondragstart='drag(event)'   />");
  });
  $('#deck').click(function(){
    solitaire.deal();
    console.log(solitaire.deck);
    console.log(player.pile);
  });
});
