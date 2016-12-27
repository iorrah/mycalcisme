import Ember from 'ember';
import Constants from 'mycalcisme/constants';

export default Ember.Route.extend({
  model: function() {
    return this.getEquationObj();
  },

  setupController: function(controller, model, transition) {
    this._super(controller, model);
    controller.set('equation', model);
    controller.set('journey_id', transition.params.game.journey_id);
  },

  getEquationObj: function() {
    return this.buildEquationObj();
  },

  getRandom: function(rangeStartsAt, rangeLimit) {
    return Math.floor((Math.random() * rangeLimit) + rangeStartsAt);
  },

  generateOperation: function() {
    var operations = Constants.OPERATIONS;
    var operatorIndex = this.getRandom(1, Constants.OPERATIONS_INDEX_LENGTH);
    return operations[operatorIndex];
  },

  generateOperator: function() {
    return this.getRandom(1, Constants.OPERATORS_RANGE_LIMIT);
  },

  setOperationalValues: function(equation) {
    equation.set('operation', this.generateOperation());
    equation.set('operator_one', this.generateOperator());
    equation.set('operator_two', this.generateOperator());

    return equation;
  },

  buildEquationObj: function() {
    var equation = Ember.Object.create({
      operation: null,
      user_input: null,
      operator_one: null,
      operator_two: null,
      to_str: null,
      is_correct_result: null
    });

    equation = this.setOperationalValues(equation);

    return equation;
  }
});
