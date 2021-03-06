import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('release', { path: 'album/:release_id'} );
  this.route('genre', { path: 'genre/:slug' });
  this.route('year', { path: 'year/:year' });
});

export default Router;
