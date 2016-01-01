import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',

  store: Ember.inject.service(),

  show: null,
  showGenres: Ember.computed.equal('show', 'genres'),
  showYears: Ember.computed.equal('show', 'years'),

  genres: Ember.computed(function() {
    return this.get('store').peekAll('genre').sortBy('id');
  }),

  years: Ember.computed(function() {
    return this.get('store').peekAll('release').rejectBy('year', 0).mapBy('year').uniq().sort();
  }),

  actions: {

    show: function(type) {
      this.set('show', type);
    }

  }

});
