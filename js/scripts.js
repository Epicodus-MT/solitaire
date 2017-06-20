//TOMORROW: Create constructor for game rows, they'll work nicer as objects
//Empty out player and give pile to a new Player constructor

//The game board will keep track of cards and victory
function Player () {
  this.pile = [];
}

//Constructor for playing cols
function PlayingCols (){
  this.row = [];
}

PlayingCols.prototype.lastCardFlip = function (card) {
  let lastCard = this.row.length - 1;
  if (this.row[lastCard].faceDown === true) {
    this.row[lastCard].faceDown === false;
  }
}

PlayingCols.prototype.addToCol = function (card) {
  let lastCard = this.row.length - 1;
  if (this.row.length === 0) {
    this.row.push(card);
  } else if (this.row[lastCard].shade !== card.shade && this.row[lastCard].number - card.number === 1) {
    this.row.push(card);
  }
}

//creates rows needed for winning
function FoundationRows (){
  this.foundationRow = [];
  this.suit = "";
}
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
  //flips last card in row face up
  function presentCards (playingCol) {
    let lastCard = playingCol.row.length - 1;
    playingCol.row[lastCard].faceDown = false;
    for (let x = 0; x < playingCol.row.length; x++){
      if (playingCol.row[x].faceDown === true){
          $('body').append("<img class = 'card' src='cardimg/deck-haunted-house.png' />")
      } else {
          $('body').append("<img class = 'card' src='cardimg/" + playingCol.row[x].number + "_of_" + playingCol.row[x].suit + ".png' />")
      }
    }
  }
  presentCards(playingCol1);
  presentCards(playingCol2);
  presentCards(playingCol3);
  presentCards(playingCol4);
  presentCards(playingCol5);
  presentCards(playingCol6);
  presentCards(playingCol7);
}


//Deals cards
CardDeck.prototype.deal = function(){
  //Pulls a random card from the deck and leaves it in the player's pile
  let x = Math.floor(Math.random() * (this.deck.length - 1)) + 1;
  this.deck[x].faceDown = false;
  player.pile.push(this.deck[x]);
  this.deck.splice(x, 1);
  console.log(player.pile);
  //Displays dealt card to html by appending the appropriate img
  let lastCard = player.pile.length - 1;
  player.pile[lastCard].faceDown = false;
  $('body').append("<img class = 'card' src='cardimg/" + player.pile[lastCard].number + "_of_" + player.pile[lastCard].suit + ".png' />")
}
//Deals cards back to deck when deck is empty
CardDeck.prototype.backToDeck = function () {
  if (this.deck.length === 0) {
    let lastCard = player.pile.length;
    for (let x = 0; x < lastCard; x++) {
      this.deck.push(player.pile[x]);
      player.pile.splice(x, 1);
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


//console log testing
$(document).ready(function(){
  victory = false;
  player = new Player();
  solitaire = new CardDeck();
  playingCol1 = new PlayingCols();
  playingCol2 = new PlayingCols();
  playingCol3 = new PlayingCols();
  playingCol4 = new PlayingCols();
  playingCol5 = new PlayingCols();
  playingCol6 = new PlayingCols();
  playingCol7 = new PlayingCols();
  fRow1 = new FoundationRows();
  fRow2 = new FoundationRows();
  fRow3 = new FoundationRows();
  fRow4 = new FoundationRows();
  solitaire.initializeDeck();
  solitaire.startGame();
  //solitaire.deal();
});
