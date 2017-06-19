function GameBoard () {
  this.row1 = [];
  this.row2 = [];
  this.row3 = [];
  this.row4 = [];
  this.row5 = [];
  this.row6 = [];
  this.row7 = [];
}

function CardDeck () {
  this.deck = [0];
}

CardDeck.prototype.initialize = function(){
  for (let x = 1; x < 53;x++){
    if (x <= 13){
      this.deck[x] = new Card("spades",x,"black");
    }
  }
}

function Card (suit,number,shade){
  this.suit = suit;
  this.number = number;
  this.shade = shade
  this.faceDown = true;
}

solitaireDeck = new CardDeck();
solitaireDeck.initialize();
console.log(solitaireDeck.deck);
