import DS from 'ember-data';

export default DS.Model.extend({
  duration: DS.attr(),
  position: DS.attr(),
  sequence: DS.attr(),
  title: DS.attr(),

  audioUrl: 'https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.ogg',

  release: DS.belongsTo('release', { async: false })
});
