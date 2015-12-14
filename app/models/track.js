import DS from 'ember-data';

export default DS.Model.extend({
  duration: DS.attr(),
  position: DS.attr(),
  sequence: DS.attr(),
  title: DS.attr(),

  release: DS.belongsTo('release')
});
