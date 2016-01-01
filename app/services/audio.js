/* global Howl */
import Ember from 'ember';

export default Ember.Service.extend({

  howl: null,
  track: null,
  duration: null,
  state: 'unloaded',
  loading: Ember.computed.equal('state', 'loading'),
  playing: Ember.computed.equal('state', 'playing'),
  paused: Ember.computed.equal('state', 'paused'),

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

  _reset: function() {
    if (this.get('howl')) {
      this.get('howl').unload();
      this.set('howl', null);
      this.set('track', null);
      this.set('state', 'unloaded');
      this.set('duration', null);
    }
  },

  _setState: function(state) {
    let validStates = Ember.A(['unloaded', 'loading', 'playing', 'paused']);
    Ember.assert(state + ' is a valid state', validStates.contains(state));
    this.set('state', state);
  },

  tearDown: Ember.on('willDestroy', function() {
    this._reset();
  })

});
