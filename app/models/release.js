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

  genres: DS.hasMany('genre'),
  tracks: DS.hasMany('track'),

  aSideTracks: Ember.computed('tracks.@each.position', function() {
    return this.get('tracks').filter((track) => {
      return track.get('position').toLowerCase().substr(0, 1) == 'a';
    });
  }),

  bSideTracks: Ember.computed('tracks.@each.position', 'aSideTracks.[]', function() {
    return this.get('tracks').reject((track) => {
      return this.get('aSideTracks').contains(track);
    });
  })

});
