import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'release-thumb-wrapper pure-u-md-1-1 pure-u-lg-1-2',

  image: Ember.computed(function() {
    return 'http://placehold.it/200x150'.htmlSafe();
  })

});
