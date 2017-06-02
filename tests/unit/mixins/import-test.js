import Ember from 'ember';
import ImportMixin from 'nonprofit-templates/mixins/import';
import { module, test } from 'qunit';

module('Unit | Mixin | import');

// Replace this with your real tests.
test('it works', function(assert) {
  let ImportObject = Ember.Object.extend(ImportMixin);
  let subject = ImportObject.create();
  assert.ok(subject);
});
