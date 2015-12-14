import Ember from 'ember';
import Payload from 'ember-collection-of-jad/fixtures/data'

export default Ember.Route.extend({

  beforeModel: function() {
    this.store.pushPayload(Payload);
  },

  model: function() {
    return this.store.peekAll('release');
  }

});
