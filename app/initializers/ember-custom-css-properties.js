import Component from 'ember-component'
import ENV from '../config/environment'
import CustomCSSPropertyBindings from '../mixins/custom-css-properties'
import { assign } from 'ember-platform'

export function initialize() {
  const defaults = {
    addToAllComponents: true
  }

  const options = assign({}, defaults, ENV['ember-custom-css-properties'] || {})

  if (options.addToAllComponents) {
    Component.reopen(CustomCSSPropertyBindings)
  }
}

export default {
  name: 'ember-custom-css-properties',
  initialize
}
