import Ember from 'ember';

export default Ember.Component.extend({
  audio: Ember.inject.service(),

  tagName: 'li',

  trackIsPlaying: Ember.computed('track', 'audio.track', 'audio.playing', function() {
    return this.get('track') === this.get('audio.track') && this.get('audio.playing') === true;
  }),

  actions: {

    play: function() {
      this.get('audio').play(this.get('track'));
    },

    pause: function() {
      this.get('audio').pause();
    },

  }
});
