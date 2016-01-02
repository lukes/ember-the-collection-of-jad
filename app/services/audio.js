/* global Howl */
import Ember from 'ember';

export default Ember.Service.extend({

  howl: null,
  track: null,
  duration: null,
  time: 0,
  release: Ember.computed.alias('track.release'),

  state: 'unloaded',
  loading: Ember.computed.equal('state', 'loading'),
  playing: Ember.computed.equal('state', 'playing'),
  paused: Ember.computed.equal('state', 'paused'),

  nextTrack: Ember.computed('track.sequence', function() {
    if (this.get('track') === this.get('release.tracks.lastObject')) {
      return this.get('release.tracks.firstObject');
    } else {
      let i = this.get('release.tracks').indexOf(this.get('track'));
      return this.get('release.tracks').objectAt(i+1);
    }
  }),

  progress: Ember.computed('duration', 'time', function() {
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

  playNextTrack: function() {
    this.play(this.get('nextTrack'));
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
      let time = parseInt(this.get('howl').seek(), 10); // Only record whole seconds
      this.set('time', time);
    }))
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
