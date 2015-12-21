import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:audio', 'Unit | Service | audio', {
  // Specify the other units that are required for this test.
  // needs: ['model:track']
});

test('play() should convert a track to a howl', function(assert) {
  let service = this.subject();
  let audioAssetUrl = 'https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.ogg';
  let track = Ember.Object.create({
    audioUrl: audioAssetUrl
  });
  service.play(track);
  assert.equal(service.get('howl')._src, audioAssetUrl);
});

test('play() should save the track', function(assert) {
  let service = this.subject();
  let track = Ember.Object.create({
    audioUrl: 'https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.ogg'
  });
  service.play(track);
  assert.equal(service.get('track'), track);
});

test('reset() should reset the service', function(assert) {
  let service = this.subject();
  let track = Ember.Object.create({
    audioUrl: 'https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.ogg'
  });
  service.play(track);
  service.reset();
  assert.equal(service.get('howl'), null);
  assert.equal(service.get('duration'), null);
  assert.equal(service.get('track'), null);
});
