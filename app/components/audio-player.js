import Ember from 'ember';

export default Ember.Component.extend({
  elementId: 'audio-player',
  classNameBindings: 'audio.track:visible',

  audio: Ember.inject.service(),

  actions: {

    pause: function() {
      this.get('audio').pause();
    }

  }
});
