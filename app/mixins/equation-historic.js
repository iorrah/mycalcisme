import Ember from 'ember';

export default Ember.Mixin.create({
  equationHistoric: Ember.A(),

  addEquationInHistoric: function(equation) {
    var historicEquation = this.adaptEquationToHistoric(equation);
    this.get('equationHistoric').pushObject(historicEquation);
  },

  adaptEquationToHistoric: function(equation) {
    var historicEquation = Ember.Object.create();

    historicEquation.set('operation', equation.get('operation'));
    historicEquation.set('user_input', equation.get('user_input'));
    historicEquation.set('operator_one', equation.get('operator_one'));
    historicEquation.set('operator_two', equation.get('operator_two'));

    historicEquation.set('equationToString', equation.equationToString());
    historicEquation.set('calcCorrectResult', equation.calcCorrectResult());
    historicEquation.set('is_correct_result', equation.is_correct_result());

    this.get('equationHistoric').pushObject(historicEquation);
  }
});
