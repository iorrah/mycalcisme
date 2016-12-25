import Ember from 'ember';

export default Ember.Mixin.create({
  equationHistoric: Ember.A(),

  addEquationInHistoric: function(equation) {
    var historicEquation = this.adaptEquationToHistoric(equation);
    this.get('equationHistoric').pushObject(historicEquation);
  },

  adaptEquationToHistoric: function(equation) {
    this.get('equationHistoric').pushObject(equation);
  }
});
