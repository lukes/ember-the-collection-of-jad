/* global Howl */
import Ember from 'ember';

export default Ember.Service.extend({

  howl: null,
  track: null,
  duration: null,
  loading: false,
  playing: false,

  play: function(track) {
    if (track && this.get('track') !== track) {
      this.reset();
      this.set('loading', true);
      let howl = new Howl({
        src: [track.get('audioUrl')]
      });
      howl.on('load', () => {
        Ember.run(() => {
          if (!this.get('isDestroyed')) {
            this.set('duration', howl.duration());
            this.set('loading', false);
          }
        });
      });
      howl.on('pause', () => {
        Ember.run(() => {
          if (!this.get('isDestroyed')) {
            this.set('playing', false);
          }
        });
      });
      howl.on('play', () => {
        Ember.run(() => {
          if (!this.get('isDestroyed')) {
            this.set('playing', true);
          }
        });
      });
      this.set('howl', howl);
      this.set('track', track);
    }
    this.get('howl').play();
  },

  pause: function() {
    if (this.get('howl')) {
      this.get('howl').pause();
    }
  },

  reset: function() {
    if (this.get('howl')) {
      this.get('howl').unload();
      this.set('howl', null);
      this.set('track', null);
      this.set('duration', null);
    }
  },

  tearDown: Ember.on('willDestroy', function() {
    this.reset();
  })

});
