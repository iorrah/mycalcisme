import Ember from 'ember';
import StopwatchMixin from 'mycalcisme/mixins/stopwatch';
import { module, test } from 'qunit';

module('Unit | Mixin | stopwatch');

// Replace this with your real tests.
test('it works', function(assert) {
  let StopwatchObject = Ember.Object.extend(StopwatchMixin);
  let subject = StopwatchObject.create();
  assert.ok(subject);
});
