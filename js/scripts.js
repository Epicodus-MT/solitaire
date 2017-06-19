//The game board will keep track of cards and victory

function GameBoard () {
  this.dealDeck    = [];
  this.discardPile = [];
  this.row1 = [];
  this.row2 = [];
  this.row3 = [];
  this.row4 = [];
  this.row5 = [];
  this.row6 = [];
  this.row7 = [];
  this.heartsRow   = [];
  this.diamondsRow = [];
  this.spadesRow   = [];
  this.clubsRow    = [];
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
    if (x <= 13){
      card = new Card("spades",y,"black");
      this.deck.push(card);
    } else if (x <= 26 && x > 13) {
      card = new Card("hearts", y - 13, "red");
      this.deck.push(card);
    } else if (x <= 39 && x > 26) {
      card = new Card("diamond", y - 26, "red");
      this.deck.push(card);
    } else {
      card = new Card("clubs", y - 39, "black");
      this.deck.push(card);
    }
  }
}

//puts the game board together

CardDeck.prototype.startGame = function(gameboard){
  for (let z = 1; z < 29; z++) {
    let x = Math.floor(Math.random() * (this.deck.length - 1 + 1)) + 1;
    let pulledCard = this.deck[x];
    this.deck.splice(x, 1);
    gameboard.row1.push(pulledCard);
  }
}

//console log testing
$(document).ready(function(){
  game = new GameBoard();
  solitaire = new CardDeck();
  solitaire.initialize();
  solitaire.startGame(game)
  console.log(game.row1);
  console.log(solitaire.deck);
})
