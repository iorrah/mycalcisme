import Ember from 'ember';
import MCIModesMixin from '../mixins/mcim-modes';

export default Ember.Controller.extend(MCIModesMixin, {
  journey_id: 0,
  score: 0,

  getNextJourneyID: function() {
    var journeyID = this.get('journey_id') || 0;
    journeyID = ++journeyID;
    return journeyID;
  },

  goToNextJourneyID: function() {
    this.transitionToRoute('game', this.getNextJourneyID());
  },

  incrementScore: function() {
    this.set('score', this.get('score') + 1);
  },

  decrementScore: function() {
    this.set('score', this.get('score') - 1);
  },

  actions: {
    submit: function() {
      var equation = this.get('equation');

      if (equation.user_input) {
        if (equation.is_correct_result()) {
          this.send('treatCorrectUserResult');
        } else {
          this.send('treatIncorrectUserResult');
        }
      }
    },

    treatCorrectUserResult: function() {
      this.goToNextJourneyID();
      this.incrementScore();
      this.send('mcimSuccessMode');
    },

    treatIncorrectUserResult: function() {
      this.goToNextJourneyID();
      this.decrementScore();
      this.send('mcimDangerMode');
    }
  }
});
