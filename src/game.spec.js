/* eslint-env mocha */
const Should = require('should');
const Game = require('./game.js');
const Player = require('./player.js');

describe('The test environment', () => {
  it('should pass', () => {
    (true).should.equal(true);
  });

  it('should access game', () => {
    Should(Game).not.equal(undefined);
  });
});

describe('Test game', () => {
  const game = new Game(50);

  it('Unplayable game', () => {
    game.isPlayable().should.equal(false);
  })
});


describe('Test Player', () => {
  const player1 = new Player('Chet', 0, 0);

  it('created Player', () => {
    player1.getName().should.equal('Chet');
  })
});
