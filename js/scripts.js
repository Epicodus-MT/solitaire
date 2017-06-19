//The game board will keep track of cards and victory
function GameBoard () {
  this.pile = [];
  this.row1 = [];
  this.row2 = [];
  this.row3 = [];
  this.row4 = [];
  this.row5 = [];
  this.row6 = [];
  this.row7 = [];
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
CardDeck.prototype.startGame = function(gameboard){
  //loop to draw random card
  for (let z = 0; z <= 27; z++) {
    //generates random number to pull element/card from array
    let x = Math.floor(Math.random() * (this.deck.length - 1)) + 1;
    //pulledCard = the card drawn
    let pulledCard = this.deck[x];
    //deletes pulled card drom this.deck
    this.deck.splice(x, 1);
    //pushes pulled card to the appropriate row
    if (z === 0 )        {gameboard.row1.push(pulledCard); }
    if (z >= 1 && z <= 2 ) {gameboard.row2.push(pulledCard); }
    if (z >= 3 && z <= 5 ) {gameboard.row3.push(pulledCard); }
    if (z >= 6 && z <= 9 ) {gameboard.row4.push(pulledCard); }
    if (z >= 10 && z<= 14 ) {gameboard.row5.push(pulledCard); }
    if (z >= 15 && z <= 20 ) {gameboard.row6.push(pulledCard); }
    if (z >= 21 && z <= 27 ) {gameboard.row7.push(pulledCard); }
  }
  //flips last card in row face up
  gameboard.row1[0].faceDown = false;
  gameboard.row2[1].faceDown = false;
  gameboard.row3[2].faceDown = false;
  gameboard.row4[3].faceDown = false;
  gameboard.row5[4].faceDown = false;
  gameboard.row6[5].faceDown = false;
  gameboard.row7[6].faceDown = false;
}

//Deals cards
CardDeck.prototype.deal = function(gameboard){
  let x = Math.floor(Math.random() * (this.deck.length - 1)) + 1;
  this.deal[x].faceDown = false;
  gameboard.pile.push(this.deck[x]);
  this.deck.splice(x, 1);
  console.log(gameboard.pile);
}



//console log testing
$(document).ready(function(){
  game = new GameBoard();
  solitaire = new CardDeck();
  fRow1 = new FoundationRows();
  solitaire.initialize();
  fRow1.defineRow(solitaire.deck[0]);
  fRow1.addToRow(solitaire.deck[2]);
})
