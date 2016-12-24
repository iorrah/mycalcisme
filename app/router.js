import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('waiting');
  this.route('tldr');
  this.route('game', { path: '/game/:journey_id' });
  // this.route('game', { path: '/game' }, function() {
  //   this.route('index', { path: '/' };
  //   this.route('live-game', { path: '/live-game/:journey_id' };
  //   this.route('game-summary', { path: '/game-summary' };
  // });
});

export default Router;
