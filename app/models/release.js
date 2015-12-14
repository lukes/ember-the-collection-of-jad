import DS from 'ember-data';

export default DS.Model.extend({
  artist: DS.attr(),
  country: DS.attr(),
  format: DS.attr(),
  label: DS.attr(),
  title: DS.attr(),
  year: DS.attr(),

  genres: DS.hasMany('genre'),
  tracks: DS.hasMany('track'),
});
