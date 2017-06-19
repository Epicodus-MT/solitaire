function Player (){
  this.cards[];
}

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
  this.heartsRow   = [];
  this.diamondsRow = [];
  this.spadesRow   = [];
  this.clubsRow    = [];
}

GameBoard.prototype.checkSuitsRow = function (card){
  if (this.heartsRow.length === 0) {
    if (card.suit === "hearts" && card.number === 1) {
      this.heartsRow.push(card);
    } else if (card.number - heartsRow.last.number === 1){
      this.heartsRow.push(card);
    }
  }
  //player.cards[x]
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
  //loop to draw random card
  for (let z = 1; z <= 28; z++) {
    //generates random number to pull element/card from array
    let x = Math.floor(Math.random() * (this.deck.length - 1)) + 1;
    //pulledCard = the card drawn
    let pulledCard = this.deck[x];
    //deletes pulled card drom this.deck
    this.deck.splice(x, 1);
    //pushes pulled card to the appropriate row
    if (z === 1 )        {gameboard.row1.push(pulledCard); }
    if (z >= 2 && z <= 3 ) {gameboard.row2.push(pulledCard); }
    if (z >= 4 && z <= 6 ) {gameboard.row3.push(pulledCard); }
    if (z >= 7 && z <= 10 ) {gameboard.row4.push(pulledCard); }
    if (z >= 11 && z<= 15 ) {gameboard.row5.push(pulledCard); }
    if (z >= 16 && z <= 21 ) {gameboard.row6.push(pulledCard); }
    if (z >= 22 && z <= 28 ) {gameboard.row7.push(pulledCard); }
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
  solitaire.initialize();
  solitaire.startGame(game);
  solitaire.deal(game);
  // console.log(game.row1);
  // console.log(game.row2);
  // console.log(game.row3);
  // console.log(game.row4);
  // console.log(game.row5);
  // console.log(game.row6);
  // console.log(game.row7);
  console.log(solitaire.deck);
  solitaire.deal(game);
  console.log(solitaire.deck);
  solitaire.deal(game);
  console.log(solitaire.deck);
  solitaire.deal(game);

})
