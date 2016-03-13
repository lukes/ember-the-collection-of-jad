/* global Howl */
import Ember from 'ember';

const { computed } = Ember;

export default Ember.Service.extend({

  howl: null,
  track: null,
  duration: null,
  time: 0,
  release: computed.alias('track.release'),

  state: 'unloaded',
  loading: computed.equal('state', 'loading'),
  playing: computed.equal('state', 'playing'),
  paused: computed.equal('state', 'paused'),

  indexOfCurrentTrack: computed('track.id', 'release.tracks.[]', function() {
    return this.get('release.tracks').indexOf(this.get('track'));
  }),

  previousTrack: computed('indexOfCurrentTrack', 'release.tracks.[]', function() {
    let i = this.get('indexOfCurrentTrack');
    return this.get('release.tracks').objectAt(i-1) || this.get('release.tracks.lastObject');
  }),

  nextTrack: computed('indexOfCurrentTrack', 'release.tracks.[]', function() {
    let i = this.get('indexOfCurrentTrack');
    return this.get('release.tracks').objectAt(i+1) || this.get('release.tracks.firstObject');
  }),

  progress: computed('duration', 'time', function() {
    if (this.get('time') && this.get('duration')) {
      return (this.get('time') / this.get('duration')) * 100;
    } else {
      return 0;
    }
  }),

  play: function(track) {
    if (track && this.get('track') !== track) {
      this._reset();
      this._setState('loading');

      let howl = new Howl({
        src: [track.get('audioUrl')]
      });

      howl.on('load', () => {
        Ember.run(() => {
          if (!this.get('isDestroyed')) {
            this.set('duration', howl.duration());
          }
        });
      });

      howl.on('pause', () => {
        Ember.run(() => {
          if (!this.get('isDestroyed')) {
            this._setState('paused');
          }
        });
      });

      howl.on('play', () => {
        Ember.run(() => {
          if (!this.get('isDestroyed')) {
            this._setState('playing');
          }
        });
      });

      howl.on('end', () => {
        Ember.run(() => {
          if (!this.get('isDestroyed')) {
            // Auto-play the next track if at the time this track has
            // ended, the user hasn't selected another track
            if (this.get('track') === track) {
              Ember.Logger.debug('Auto-playing next track');
              this.playNextTrack();
            }
          }
        });
      });

      howl.on('loaderror', () => {
        Ember.run(() => {
          if (!this.get('isDestroyed')) {
            alert('Unable to find audio for track ' +
              this.get('track.title') + ' (' +
              this.get('track.id') +')'
            );
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

  togglePlay: function() {
    if (!this.get('howl')) {
      return;
    }

    if (this.get('howl').playing()) {
      this.get('howl').pause();
    } else {
      this.get('howl').play();
    }
  },

  playNextTrack: function() {
    this.play(this.get('nextTrack'));
  },

  playPreviousTrack: function() {
    this.play(this.get('previousTrack'));
  },

  // Howl doesn't allow us to receive time updates as a track is playing,
  // so bind our own events to track time
  _handleTimeUpdateBindings: Ember.observer('playing', function() {
    if (this.get('playing')) {
      this._startTimer();
    } else {
      this._stopTimer();
    }
  }),

  _reset: function() {
    if (this.get('howl')) {
      this.get('howl').unload();
      this.set('howl', null);
      this.set('track', null);
      this.set('duration', null);
      this.set('state', 'unloaded');
      this.set('time', 0);
    }
  },

  _startTimer: function() {
    this.set('timer', setInterval(() => {
      let time = parseFloat(this.get('howl').seek().toPrecision(2)); // Only record to 1 decimal place
      this.set('time', time);
    }));
  },

  _stopTimer: function() {
    clearInterval(this.get('timer'));
  },

  _setState: function(state) {
    let validStates = Ember.A(['unloaded', 'loading', 'playing', 'paused']);
    Ember.assert(state + ' is a valid state', validStates.contains(state));
    this.set('state', state);
  },

  _tearDown: Ember.on('willDestroy', function() {
    this._reset();
  })

});
