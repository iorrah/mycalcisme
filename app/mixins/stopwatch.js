import Ember from 'ember';

let timeRemaining = null;

export default Ember.Mixin.create({
  timeRemaining,

  onInitStopwatch: (function() {
    this.initializeClock(60000);
  }).on('init'),

  getTimeRemaining: function (endTime) {
    var t          = Date.parse(endTime) - Date.parse(new Date());

    var seconds    = Math.floor((t / 1000) % 60);
    var minutes    = Math.floor((t / 1000 / 60) % 60);
    var hours      = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days       = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds
    };
  },

  initializeClock: function(endTime) {
    var _this = this;

    var timeInterval = setInterval(function() {
      var t = _this.getTimeRemaining(endTime);
      _this.set('timeRemaining', t);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }, 1000);
  }
});
