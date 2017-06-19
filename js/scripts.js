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


function Card (suit,number,shade){
  this.suit = suit;
  this.number = number;
  this.shade = shade
  if (this.number === 1){ this.ace = true;}
  this.faceDown = true;
}

function CardDeck () {
  this.deck = [0];
}

CardDeck.prototype.initialize = function(){
  for (let x = 1; x < 53;x++){
    if (x <= 13){
      card = new Card("spades",x,"black");
      this.deck.push(card);
    } else if (x <= 26 && x > 13) {
      card = new Card("hearts", x - 13, "red");
      this.deck.push(card);
    } else if (x <= 39 && x > 26) {
      card = new Card("diamond", x - 26, "red");
      this.deck.push(card);
    } else {
      card = new Card("clubs", x - 39, "black");
      this.deck.push(card);
    }
  }
}

CardDeck.prototype.startGame = function(gameboard){
  while (true) {
    x = Math.floor(Math.random() * (this.deck.length - 1 + 1)) + 1;
    let y = x + 1;
    let pulledCard = this.deck.slice(x,y);
    this.deck.splice(x, 1);
    gameboard.row1.push(pulledCard);
    break;
  }
}



$(document).ready(function(){
  game = new GameBoard();
  solitaire = new CardDeck();
  solitaire.initialize();
  solitaire.startGame(game)
  console.log(game.row1);
  console.log(solitaire.deck);
})
