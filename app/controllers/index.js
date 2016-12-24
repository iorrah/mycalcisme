import Ember from 'ember';
import StopwatchMixin from '../mixins/stopwatch';

let timeToStart = 10;

export default Ember.Controller.extend(StopwatchMixin, {
  timeToStart,

  observesTimeRemaining: (function() {
    if (this.timeRemaining.seconds == 0) this.redirectToGamePage();
  }).observes('timeRemaining.seconds'),

  redirectToGamePage: function() {
    this.transitionToRoute('game', 1);
  }
});
