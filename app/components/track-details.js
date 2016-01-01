import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'track-details',

  audio: Ember.inject.service(),

  trackIsPlaying: Ember.computed('track', 'audio.track', 'audio.playing', function() {
    return this.get('track') === this.get('audio.track') && this.get('audio.playing') === true;
  }),

  click: function() {
    if (this.get('trackIsPlaying')) {
      this.send('pause');
    } else {
      this.send('play');
    }
  },

  actions: {

    play: function() {
      this.get('audio').play(this.get('track'));
    },

    pause: function() {
      this.get('audio').pause();
    },

  }
});
