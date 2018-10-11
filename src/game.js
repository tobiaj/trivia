const Game = function () {
  const players = [];
  const places = [6];
  const purses = [6];
  const inPenaltyBox = [6];

  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  let currentPlayer = 0;
  let isGettingOutOfPenaltyBox = false;

  const didPlayerWin = function () {
    return !(purses[currentPlayer] === 6);
  };

  const currentCategory = function () {
    if (places[currentPlayer] === 0) {
      return 'Pop';
    }
    if (places[currentPlayer] === 4) {
      return 'Pop';
    }
    if (places[currentPlayer] === 8) {
      return 'Pop';
    }
    if (places[currentPlayer] === 1) {
      return 'Science';
    }
    if (places[currentPlayer] === 5) {
      return 'Science';
    }
    if (places[currentPlayer] === 9) {
      return 'Science';
    }
    if (places[currentPlayer] === 2) {
      return 'Sports';
    }
    if (places[currentPlayer] === 6) {
      return 'Sports';
    }
    if (places[currentPlayer] === 10) {
      return 'Sports';
    }
    return 'Rock';
  };

  this.createRockQuestion = function (index) {
    return `Rock Question ${index}`;
  };

  for (let i = 0; i < 50; i += 1) {
    popQuestions.push(`Pop Question ${i}`);
    scienceQuestions.push(`Science Question ${i}`);
    sportsQuestions.push(`Sports Question ${i}`);
    rockQuestions.push(this.createRockQuestion(i));
  }

  this.isPlayable = function (howManyPlayers) {
    return howManyPlayers >= 2;
  };

  this.add = function (playerName) {
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(`${playerName} was added`);
    console.log(`They are player number ${players.length}`);
    return true;
  };

  this.howManyPlayers = function () {
    return players.length;
  };

  const askQuestion = function () {
    if (currentCategory() === 'Pop') {
      console.log(popQuestions.shift());
    }
    if (currentCategory() === 'Science') {
      console.log(scienceQuestions.shift());
    }
    if (currentCategory() === 'Sports') {
      console.log(sportsQuestions.shift());
    }
    if (currentCategory() === 'Rock') {
      console.log(rockQuestions.shift());
    }
  };

  this.roll = function (roll) {
    console.log(`${players[currentPlayer]} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 !== 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(`${players[currentPlayer]} is getting out of the penalty box`);
        places[currentPlayer] += roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] -= 12;
        }

        console.log(`${players[currentPlayer]} s new location is ${places[currentPlayer]}`);
        console.log(`The category is ${currentCategory()}`);
        askQuestion();
      } else {
        console.log(`${players[currentPlayer]} is not getting out of the penalty box`);
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      places[currentPlayer] += roll;
      if (places[currentPlayer] > 11) {
        places[currentPlayer] -= 12;
      }

      console.log(`${players[currentPlayer]} s new location is ${places[currentPlayer]}`);
      console.log(`The category is ${currentCategory()}`);
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function () {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(`${players[currentPlayer]} now has ${purses[currentPlayer]} gold coins`);

        const winner = didPlayerWin();
        currentPlayer += 1;
        if (currentPlayer === players.length) {
          currentPlayer = 0;
        }
        return winner;
      }
      currentPlayer += 1;
      if (currentPlayer === players.length) {
        currentPlayer = 0;
      }
      return true;
    }
    console.log('Answer was correct!!!!');

    purses[currentPlayer] += 1;
    console.log(`${players[currentPlayer]} now has ${
      purses[currentPlayer]} Gold Coins.`);

    const winner = didPlayerWin();

    currentPlayer += 1;
    if (currentPlayer === players.length) currentPlayer = 0;

    return winner;
  };

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered');
    console.log(`${players[currentPlayer]} was sent to the penalty`);
    inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer === players.length) {
      currentPlayer = 0;
    }
    return true;
  };
};

let notAWinner = false;

const game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do {
  game.roll(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) === 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }
} while (notAWinner);

module.exports = Game;
