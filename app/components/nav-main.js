import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'nav',

  store: Ember.inject.service(),

  show: null,
  showGenres: computed.equal('show', 'genres'),
  showYears: computed.equal('show', 'years'),

  genres: computed(function() {
    return this.get('store').peekAll('genre').sortBy('id');
  }),

  years: computed(function() {
    return this.get('store').peekAll('release').rejectBy('year', 0).mapBy('year').uniq().sort();
  }),

  actions: {

    show: function(type) {
      this.set('show', type);
    },

    hide: function() {
      this.set('show', null);
    },

    toggle: function(type) {
      if (this.get('show') === type) {
        this.send('hide');
      } else {
        this.send('show', type);
      }
    }

  }

});
