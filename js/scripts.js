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

CardDeck.prototype.initialize = function(){
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
  playingCol1.row[0].faceDown = false;
  playingCol2.row[1].faceDown = false;
  playingCol3.row[2].faceDown = false;
  playingCol4.row[3].faceDown = false;
  playingCol5.row[4].faceDown = false;
  playingCol6.row[5].faceDown = false;
  playingCol7.row[6].faceDown = false;
}


//Deals cards
CardDeck.prototype.deal = function(){
  let x = Math.floor(Math.random() * (this.deck.length - 1)) + 1;
  this.deck[x].faceDown = false;
  player.pile.push(this.deck[x]);
  this.deck.splice(x, 1);
  console.log(player.pile);
}



//console log testing
$(document).ready(function(){
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
  solitaire.initialize();
  fRow1.defineRow(solitaire.deck[0]);
  fRow1.addToRow(solitaire.deck[1]);
  solitaire.deal();
  solitaire.deal();
  solitaire.deal();
  solitaire.deal();
})
