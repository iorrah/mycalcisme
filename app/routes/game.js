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
    var operatorIndex = this.getRandom(1, Constants.OPERATIONS_INDEX_LENGTH);
    return operations[operatorIndex];
  },

  getRandomOperator: function(definedLimit) {
    return this.getRandom(1, definedLimit || Constants.OPERATORS_RANGE_LIMIT);
  },

  getRandomOperatorOne: function() {
    return this.getRandomOperator();
  },

  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  getRandomOperatorTwo: function(operation, operatorOne) {
    var operatorRangeLimit = 0;
    var methodName = "getRandomOperatorTwoFor";
    methodName += this.capitalize(operation.abbr);
    var randomOperatorTwo = this[methodName](operatorOne);

    return randomOperatorTwo;
  },

  getRandomOperatorTwoForSub: function(operatorOne) {
    return this.getRandomOperator(operatorOne);
  },

  getRandomOperatorTwoForAdd: function(operatorOne) {
    return this.getRandomOperatorOne();
  },

  getRandomOperatorTwoForMul: function(operatorOne) {
    return this.getRandomOperatorOne();
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
    var options = [1, "itself"];
    var indexChoosenOption = 0;
    var choosenOption = "";

    // http://www.mathgoodies.com/lessons/vol3/divisibility.html

    // if (this.isCompositeNumber(dividend)) {
    //   find a third factor
    //    ...

    //   and push to the array
    //   options.push("divisible");
    // }

    indexChoosenOption = this.getRandom(1, options.length - 1);
    choosenOption = options[indexChoosenOption];

    if (choosenOption == "itself") {
      choosenOption = operatorOne;
    }

    // } else if (choosenOption == "divisible") {
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
