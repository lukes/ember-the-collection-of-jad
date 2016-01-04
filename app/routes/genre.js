import Ember from 'ember';

export default Ember.Route.extend({

  // Return releases that have an association with a genre with
  // the given slug
  model: function(params) {
    let genreSlug = params.slug;
    let genre = this.store.peekAll('genre').findBy('slug', genreSlug);
    let releases = this.store.peekAll('release').filter((release) => {
      let genres = release.get('genres');
      return genres.indexOf(genre) >= 0;
    });

    return {
      genre: genre,
      releases: releases
    }
  }

});
