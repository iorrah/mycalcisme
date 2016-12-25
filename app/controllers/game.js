import Ember from 'ember';
import MCIModesMixin from '../mixins/mcim-modes';
import EquationHistoricMixin from '../mixins/equation-historic';

export default Ember.Controller.extend(MCIModesMixin, EquationHistoricMixin, {
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

  buildEquationToStr: function() {
    var equation = this.get('equation');

    var equationToStr = equation.get('operator_one') + " " +
                        equation.get('operation')    + " " +
                        equation.get('operator_two');

    return equationToStr;
  },

  setEquationToStr: function(equationToStr) {
    var equation = this.get('equation');
    this.set('equation.to_str', equationToStr);
  },

  observesEquationToString: (function() {
    var equationToStr = this.buildEquationToStr();
    this.setEquationToStr(equationToStr);
  }).observes(
    'equation.operator_one',
    'equation.operation',
    'equation.operator_two'
  ),

  actions: {
    submit: function() {
      var equation = this.get('equation');
      this.addEquationInHistoric(equation);

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
