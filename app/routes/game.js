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

  buildEquationObj: function() {
    var equation = Ember.Object.create({
      operation: "+",
      user_input: null,
      operator_one: null,
      operator_two: null,
      to_str: null,
      is_correct_result: null
    });

    equation.set('operator_one', this.getRandom(1, 10));
    equation.set('operator_two', this.getRandom(1, 10));

    return equation;
  }
});
