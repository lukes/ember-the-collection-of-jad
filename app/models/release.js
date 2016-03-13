import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'ember-collection-of-jad/config/environment';
const { cdnHost } = ENV;

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
    return cdnHost + '/covers/' + this.get('id') + 'f.jpg';
  }),

  coverImageSmall: Ember.computed(function() {
    return cdnHost + '/covers/' + this.get('id') + 'fs.jpg';
  }),

  backImage: Ember.computed(function() {
    return 'http://www.regalzonophone.com/images/SXLP50013%20-%20Citadel%20Highlights%20Record%20Cover%20Back.jpg'.htmlSafe();
  }),

  backImageSmall: Ember.computed(function() {
    return 'http://www.regalzonophone.com/images/SXLP50013%20-%20Citadel%20Highlights%20Record%20Cover%20Back.jpg'.htmlSafe();
  }),

  asideImage: Ember.computed(function() {

  }),

  bsideImage: Ember.computed(function() {

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
