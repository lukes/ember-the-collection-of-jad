import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  artist: DS.attr(),
  country: DS.attr(),
  format: DS.attr(),
  label: DS.attr(),
  catno: DS.attr(),
  title: DS.attr(),
  year: DS.attr(),
  manual: DS.attr(),
  manual_reason: DS.attr(),

  genres: DS.hasMany('genre', { async: false }),
  tracks: DS.hasMany('track', { async: false }),

  coverImage: Ember.computed(function() {
    return 'http://blog.wanken.com/wp-content/uploads/2012/07/vintage-polish-record-covers-06.jpg'.htmlSafe();
  }),

  backImage: Ember.computed(function() {
    return 'http://www.regalzonophone.com/images/SXLP50013%20-%20Citadel%20Highlights%20Record%20Cover%20Back.jpg'.htmlSafe();
  }),

  aSideTracks: Ember.computed('tracks.@each.position', function() {
    return this.get('tracks').filter((track) => {
      return track.get('position').toLowerCase().substr(0, 1) === 'a';
    });
  }),

  bSideTracks: Ember.computed('tracks.@each.position', 'aSideTracks.[]', function() {
    return this.get('tracks').reject((track) => {
      return this.get('aSideTracks').contains(track);
    });
  })

});
