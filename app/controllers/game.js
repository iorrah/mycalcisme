import Ember from 'ember';
import MCIModesMixin from '../mixins/mcim-modes';

let journey_id = null;

export default Ember.Controller.extend(MCIModesMixin, {
  journey_id: 0,

  getNextJourneyID: function() {
    var journeyID = this.get('journey_id') || 0;
    journeyID = ++journeyID;
    return journeyID;
  },

  goToNextJourneyID: function() {
    this.transitionToRoute('game', this.getNextJourneyID());
  },

  actions: {
    submit: function() {
      var equation = this.get('equation');

      if (equation.is_correct_result()) {
        this.send('treatCorrectUserResult');
      } else {
        this.send('treatIncorrectUserResult');
      }
    },

    treatCorrectUserResult: function() {
      this.goToNextJourneyID();
      this.send('mcimSuccessMode');
    },

    treatIncorrectUserResult: function() {
      this.goToNextJourneyID();
      this.send('mcimDangerMode');
    }
  }
});
