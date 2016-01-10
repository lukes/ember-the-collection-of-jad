import Ember from 'ember';

export default Ember.Component.extend({
  elementId: 'audio-player',
  classNameBindings: 'audio.track:visible',

  audio: Ember.inject.service(),

  progressStyle: Ember.computed('audio.progress', function() {
    return ('width:' + this.get('audio.progress') + '%').htmlSafe();
  }),

  applyKeyBindings: Ember.on('didInsertElement', function() {
    Em.$('body').on('keyup.audioPlayer', (e) => {
      // alert(e.which);
      if(e.which === 32) { // Space
        this.get('audio').togglePlay();
      }
    });
  }),

  removeKeyBindings: Ember.on('willDestroyElement', function() {
    Em.$('body').off('keyup.audioPlayer');
  }),

  actions: {

    pause: function() {
      this.get('audio').pause();
    },

    play: function() {
      this.get('audio').play();
    },

    previousTrack: function() {
      this.get('audio').playPreviousTrack();
    },

    nextTrack: function() {
      this.get('audio').playNextTrack();
    }

  }
});
