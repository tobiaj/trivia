const Player = require('./player.js');

const winningPoints = 6;
let currentPlayer = 0;
let activePlayer = null;

function createDeck (numberOfQuestions) {
  const deck = {
    Pop: [...Array(numberOfQuestions)].map((x, i) => `popQuestions ${i}`),
    Science: [...Array(numberOfQuestions)].map((x, i) => `scienceQuestions ${i}`),
    Sports: [...Array(numberOfQuestions)].map((x, i) => `sportsQuestions ${i}`),
    Rock: [...Array(numberOfQuestions)].map((x, i) => `rockQuestions ${i}`)
  };

  return deck;
}

function createBoard () {
  const board = ['Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Science', 'Sports', 'Rock'];
  return board;
}

class Game {
  constructor (numberOfQuestions) {
    this.players = [];
    this.board = createBoard();
    this.deck = createDeck(numberOfQuestions);
  }

  isPlayable () {
    return this.players.length >= 2;
  }

  hasPlayerWon () {
    return (this.players[currentPlayer].getPurse() < winningPoints);
  }

  nextPlayer () {
    currentPlayer += 1;
    if (currentPlayer === this.players.length) {
      currentPlayer = 0;
    }
  }

  howManyPlayers () {
    return this.players.length;
  }

  addPlayer (player) {
    this.players.push(player);
  }

  updatePosition (player, steps) {
    let place = player.getPlace();
    place += steps;
    if (place > 11) {
      place -= 12;
    }
    player.setPlace(place);
  }

  currentCategory (position) {
    return this.board[position];
  }

  movePlayerPosition (roll) {
    activePlayer = this.players[currentPlayer];
    console.log(`${activePlayer.getName()} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (activePlayer.getIsInPeneltyBox() && roll % 2 === 0) {
      console.log(`${activePlayer.getName()} is not getting out of the penalty box`);
    } else {
      console.log(`${activePlayer.getName()} is getting out of the penalty box or was never there`);
      activePlayer.setIsInPeneltyBox(false);
      this.updatePosition(activePlayer, roll);
      console.log(this.deck[this.currentCategory(activePlayer.getPlace())].splice(0, 1));
    }
  }

  correctAnswer () {
    activePlayer = this.players[currentPlayer];
    if (!activePlayer.getIsInPeneltyBox()) {
      console.log('Answer was correct!!!!');
      activePlayer.addToPurse(1);
      console.log(`${activePlayer.getName()} now has ${activePlayer.getPurse()} gold coins`);

      const won = this.hasPlayerWon();
      this.nextPlayer();
      return won;
    }
    this.nextPlayer();
    return true;
  }

  wrongAnswer () {
    activePlayer = this.players[currentPlayer];
    console.log('Question was incorrectly answered');
    console.log(`${activePlayer.getName()} was sent to the penalty`);
    activePlayer.setIsInPeneltyBox(true);
    this.nextPlayer();
    return true;
  }
}

let notAWinner = false;

const game = new Game(50);
const Player1 = new Player('Chet', 0, 0);
const Player2 = new Player('Pat', 0, 0);
const Player3 = new Player('Sue', 0, 0);

game.addPlayer(Player1);
game.addPlayer(Player2);
game.addPlayer(Player3);

do {
  game.movePlayerPosition(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) === 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.correctAnswer();
  }
} while (notAWinner);

module.exports = Game;
