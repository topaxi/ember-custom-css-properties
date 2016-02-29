import Ember from 'ember';
import CustomCssPropertiesMixin from 'ember-custom-css-properties/mixins/custom-css-properties';
import { module, test } from 'qunit';

module('Unit | Mixin | custom css properties');

// Replace this with your real tests.
test('it works', function(assert) {
  let CustomCssPropertiesObject = Ember.Object.extend(CustomCssPropertiesMixin);
  let subject = CustomCssPropertiesObject.create();
  assert.ok(subject);
});
