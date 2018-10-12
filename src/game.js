const Player = require('./player.js');

const winningPoints = 6;
let currentPlayer = 0;
let activePlayer = null;

class Game {
  constructor (numberOfQuestions) {
    this.players = [];
    this.popQuestions = [...Array(numberOfQuestions)].map((x, i) => `popQuestions ${i}`);
    this.scienceQuestions = [...Array(numberOfQuestions)].map((x, i) => `scienceQuestions ${i}`);
    this.sportsQuestions = [...Array(numberOfQuestions)].map((x, i) => `sportsQuestions ${i}`);
    this.rockQuestions = [...Array(numberOfQuestions)].map((x, i) => `rockQuestions ${i}`);
    this.board = ['Pop', 'Science', 'Sports', 'Rocks', 'Pop', 'Science', 'Sports', 'Rocks', 'Pop', 'Science', 'Sports', 'Rocks'];
  }

  isPlayable () {
    return this.players.length >= 2;
  }

  hasPlayerWon () {
    console.log(this.players[currentPlayer].getPurse() < winningPoints);
    return (this.players[currentPlayer].getPurse() < winningPoints);
  }

  nextPlayer () {
    console.log(currentPlayer);
    currentPlayer += 1;
    if (currentPlayer === this.players.length) {
      currentPlayer = 0;
    }
    console.log(currentPlayer);
  }

  howManyPlayers () {
    return this.players.length;
  }

  addPlayer (player) {
    this.players.push(player);
    console.log(this.players);
  }

  movePlayer (player, steps) {
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

  rollDice (roll) {
    console.log(`${this.players[currentPlayer].getName()} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (this.players[currentPlayer].getIsInPeneltyBox()) {
      if (roll % 2 !== 0) {
        this.players[currentPlayer].setIsInPeneltyBox(false);

        console.log(`${this.players[currentPlayer].getName()} is getting out of the penalty box`);
        this.movePlayer(this.players[currentPlayer], roll);

        console.log(`${this.players[currentPlayer].getName()} s new location is ${this.players[currentPlayer].getPlace()}`);
        console.log(`The category is ${this.currentCategory(this.players[currentPlayer].getPlace())}`);
        // askQuestion();
      } else {
        console.log(`${this.players[currentPlayer].getName()} is not getting out of the penalty box`);
        this.players[currentPlayer].setIsInPeneltyBox(true);
      }
    } else {
      this.movePlayer(this.players[currentPlayer], roll);

      console.log(`${this.players[currentPlayer].getName()} s new location is ${this.players[currentPlayer].getPlace()}`);
      console.log(`The category is ${this.currentCategory(this.players[currentPlayer].getPlace())}`);
      // askQuestion();
    }
  }

  correclyAnswered () {
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
    return false;
  }

  wronglyAnswered () {
    activePlayer = this.players[currentPlayer];
    console.log('Question was incorrectly answered');
    console.log(`${activePlayer.getName()} was sent to the penalty`);
    activePlayer.setIsInPeneltyBox(true);
    this.nextPlayer();
    return true;
  }
}

let notAWinner = false;

const game = new Game();
const Player1 = new Player('Chet', 0, 0);
const Player2 = new Player('Pat', 0, 0);
const Player3 = new Player('Sue', 0, 0);

game.addPlayer(Player1);
game.addPlayer(Player2);
game.addPlayer(Player3);

do {
  game.rollDice(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) === 7) {
    notAWinner = game.wronglyAnswered();
  } else {
    notAWinner = game.correclyAnswered();
  }
} while (notAWinner);

module.exports = Game;
