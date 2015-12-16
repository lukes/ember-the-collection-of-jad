import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    let genre = params.genre
    return this.store.peekAll('release').filter((release) =>
      release.get('genres').indexOf(genre) >= 0
    )
  }

});
