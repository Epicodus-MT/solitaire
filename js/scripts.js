function GameBoard () {
  this.row1 = [];
  this.row2 = [];
  this.row3 = [];
  this.row4 = [];
  this.row5 = [];
  this.row6 = [];
  this.row7 = [];
}


function Card (suit,number,shade){
  this.suit = suit;
  this.number = number;
  this.shade = shade
  if (this.number === 13){ this.ace = true;}
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



$(document).ready(function(){
  solitaire = new CardDeck();
  solitaire.initialize();
  console.log(solitaire.deck);
})
