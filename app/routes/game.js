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

  getRandomOperation: function() {
    var operations = Constants.OPERATIONS;
    var rangeLimit = Constants.OPERATIONS_INDEX_LENGTH + 1;
    var operatorIndex = this.getRandom(0, rangeLimit);
    return operations[operatorIndex];
  },

  getRandomOperator: function(definedLimit) {
    return this.getRandom(1, definedLimit || Constants.OPERATORS_RANGE_LIMIT);
  },

  getRandomOperatorOne: function() {
    return this.getRandomOperator();
  },

  getRandomOperatorTwo: function(operation, operatorOne) {
    var methodName = "getRandomOperatorTwoFor";
    methodName += Ember.String.capitalize(operation.abbr);
    return this[methodName](operatorOne);
  },

  getRandomOperatorTwoForSub: function(operatorOne) {
    return this.getRandomOperator(operatorOne);
  },

  getRandomOperatorTwoForAdd: function(operatorOne) {
    return this.getRandomOperator();
  },

  getRandomOperatorTwoForMul: function(operatorOne) {
    return this.getRandomOperator();
  },

  // isCompositeNumber: function(operatorOne) {
  //   return something;
  // },

  // findCompositeNumberDivisor: function(operatorOne) {
  //   return something;
  // },

  getRandomOperatorTwoForDiv: function(operatorOne) {
    var divisor = 0;
    var dividend = operatorOne;
    var options = [1, dividend];
    var indexChoosenOption = 0;
    var choosenOption = "";

    // http://www.mathgoodies.com/lessons/vol3/divisibility.html

    // if (this.isCompositeNumber(dividend)) {
    //   find a third factor
    //    ...

    //   and push to the array
    //   options.push('divisible');
    // }

    indexChoosenOption = this.getRandom(0, options.length - 1);
    choosenOption = options[indexChoosenOption];

    // if (choosenOption == 'divisible') {
    //   choosenOption = this.findCompositeNumberDivisor(operatorOne);
    // }

    return choosenOption;
  },

  setOperationalValues: function(equation) {
    var operation =   this.getRandomOperation();
    var operatorOne = this.getRandomOperatorOne();
    var operatorTwo = this.getRandomOperatorTwo(operation, operatorOne);

    equation.set('operation',    operation);
    equation.set('operator_one', operatorOne);
    equation.set('operator_two', operatorTwo);

    return equation;
  },

  getDefaultEquationObj: function() {
    return Ember.Object.create({
      operation: null,
      user_input: null,
      operator_one: null,
      operator_two: null,
      to_str: null,
      is_correct_result: null
    });
  },

  buildEquationObj: function() {
    var equation = this.getDefaultEquationObj();
    return this.setOperationalValues(equation);
  }
});
