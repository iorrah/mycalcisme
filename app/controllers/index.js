import Ember from 'ember';

let timeToStart = 10;
let isCountingDown = true;

export default Ember.Controller.extend({
  timeToStart,
  isCountingDown,
  actions: {
    cancelTimeCountdown() {
      this.set('isCountingDown', false);
    }
  }
});
