import Ember from 'ember';

export default Ember.Route.extend({

  // Return releases that have an association with a genre with
  // the given slug
  model: function(params) {
    let genreSlug = params.slug;
    return this.store.peekAll('release').filter((release) => {
      let releaseGenreSlugs = release.get('genres').mapBy('slug');
      return releaseGenreSlugs.indexOf(genreSlug) >= 0;
    });
  }

});
