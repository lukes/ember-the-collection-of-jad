import Ember from 'ember';

export default Ember.Controller.extend({

  years: Ember.computed(function() {
    return this.store.peekAll('release').rejectBy('year', 0).mapBy('year').uniq();
  }),

  actions: {

    // Transition to a random release
    randomRelease: function() {
      let releases = this.store.peekAll('release')
      let random = Math.floor(Math.random() * releases.get('length'))
      let release = releases.objectAt(random)

      this.transitionTo('release', release)
    }

  }

});
