import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    let year = parseInt(params.year);
    return {
      releases: this.store.peekAll('release').filterBy('year', year),
      year: year
    }
  }

});
