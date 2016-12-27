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

  getRandom: function(rangeStartsAt, rangeLimit) {
    return Math.floor((Math.random() * rangeLimit) + rangeStartsAt);
  },

  generateOperation: function(rangeStartsAt, rangeLimit) {
    var operations = ["+", "-", "*", "/"];
    var operatorIndex = this.getRandom(1, 3);
    return operations[operatorIndex];
  },

  generateOperator: function() {
    return this.getRandom(1, 10);
  },

  buildEquationObj: function() {
    var equation = Ember.Object.create({
      operation: "+",
      user_input: null,
      operator_one: null,
      operator_two: null,
      to_str: null,
      is_correct_result: null
    });

    equation.set('operation', this.generateOperation());
    equation.set('operator_one', this.generateOperator());
    equation.set('operator_two', this.generateOperator());

    return equation;
  }
});
