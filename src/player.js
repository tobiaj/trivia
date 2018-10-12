class Player {
  constructor (name, place, purse) {
    this.name = name;
    this.place = place;
    this.purse = purse;
    this.isPeneltybox = false;
  }

  getName () {
    return this.name;
  }

  getPlace () {
    return this.place;
  }

  setPlace (roll) {
    this.place = roll;
  }

  setIsInPeneltyBox (penelty) {
    this.isPeneltybox = penelty;
  }

  getIsInPeneltyBox () {
    return this.isPeneltybox;
  }

  addToPurse (points) {
    this.purse += points;
  }

  getPurse () {
    return this.purse;
  }
}

module.exports = Player;
