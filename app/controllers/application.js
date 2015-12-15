import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    // Transition to a random release
    randomAlbum: function() {
      let releases = this.store.peekAll('release')
      let random = Math.floor(Math.random() * releases.get('length'))
      let release = releases.objectAt(random)

      this.transitionTo('album', release)
    }

  }

});
