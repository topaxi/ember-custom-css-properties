/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import CustomCssPropertiesMixin from 'ember-custom-css-properties/mixins/custom-css-properties';

describe('CustomCssPropertiesMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let CustomCssPropertiesObject = Ember.Object.extend(CustomCssPropertiesMixin);
    let subject = CustomCssPropertiesObject.create();
    expect(subject).to.be.ok;
  });
});
