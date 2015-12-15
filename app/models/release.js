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
});
