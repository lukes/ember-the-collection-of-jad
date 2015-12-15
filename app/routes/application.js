import Ember from 'ember';
import Payload from 'ember-collection-of-jad/fixtures/data';

export default Ember.Route.extend({

  // Push compiled data onto the store (for all routes)
  beforeModel: function() {
    this.store.pushPayload(Payload);
  }

});
