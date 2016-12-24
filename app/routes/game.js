import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.getEquationObj();
  },

  setupController: function(controller, model, transition) {
    this._super(controller, model);
    controller.set('equation', model);
    controller.set('journey_id', transition.params.game.journey_id);
  },

  getEquationObj: function(level = null) {
    return this.buildEquationObj();
  },

  getRandom: function() {
    return parseInt(Math.random() * 5);
  },

  buildEquationObj: function() {
    var equation = Ember.Object.create({
      operation: "+",
      user_input: null,
      operator_one: null,
      operator_two: null,

      equationToString: function() {
        return (this.operator_one) + " " +
               (this.operation) + " " +
               (this.operator_two);
      },

      calcCorrectResult: function() {
        return eval(this.equationToString());
      },

      is_correct_result: function() {
        return this.calcCorrectResult() == this.get('user_input');
      }
    });

    equation.set('operator_one', this.getRandom());
    equation.set('operator_two', this.getRandom());

    return equation;
  }
});
