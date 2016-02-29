import Ember from 'ember'
import Mixin from 'ember-metal/mixin'
import observer from 'ember-metal/observer'
import computed from 'ember-computed'
import on from 'ember-evented/on'

import {
  scheduleOnce
} from 'ember-runloop'

import {
  dasherize,
  htmlSafe
} from 'ember-string'

const {
  propertyWillChange,
  propertyDidChange,
  defineProperty: defineEmberProperty,
  Handlebars: { SafeString }
} = Ember

const VALIDATE_CSS_PROPERTY_NAME = /^[\w-_]+$/
const VALIDATE_CSS_NUMBER = /^\d+(?:\.\d+)?(?:%|px|mm|cm|in|pt|pc|r?em|ex|ch|vh|vw|vmin|vmax|m?s|deg)$/
//const VALIDATE_RGBA = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*\d*\.?\d*)?\)$/
const VALIDATE_HEX_COLOR = /^#([\da-fA-F]{3}){1,2}$/

export default Mixin.create({
  attributeBindings: [ 'style' ],
  cssPropertyBindings: [],

  setupPropertyBindings: on('didInsertElement', function() {
    scheduleOnce('afterRender', () => this._updateComputedStyle())
  }),

  _computeStyle(propertyMap) {
    let isSafe = true
    let css = Object.keys(propertyMap)
      .filter(propertyName => this.get(propertyName) !== undefined)
      .map(propertyName => {
        let value           = this.get(propertyName)
        let cssPropertyName = propertyMap[propertyName]

        isSafe = isSafe &&
          this._validateCSSPropertyName(cssPropertyName) &&
          this._validateCSSValue(value)

        return `--${cssPropertyName}:${value}`
      })
      .join(';')

    return isSafe ? htmlSafe(css) : css
  },

  _validateCSSPropertyName(cssPropertyName) {
    let valid = VALIDATE_CSS_PROPERTY_NAME.test(cssPropertyName)

    if (!valid) {
      console.warn(`The css property name of ${cssPropertyName} might be unsafe`)
    }

    return valid
  },

  _validateCSSValue(value) {
    let valid = typeof value === 'number' ||
      value instanceof SafeString ||
      typeof value === 'string' && (
        value === 'none' ||
        VALIDATE_CSS_NUMBER.test(value) ||
        VALIDATE_HEX_COLOR.test(value)/* ||
        VALIDATE_RGBA.test(value)*/
      )

    if (!valid) {
      console.warn(`The css value of ${value} might be unsafe`)
    }

    return valid
  },

  _updateComputedStyle: observer('cssPropertyBindings.[]', function() {
    let dependentKeys = []
    let propertyMap   = {}
    let bindings      = this.get('cssPropertyBindings')

    for (let i = 0; i < bindings.length; i++) {
      let [
        propertyName,
        cssPropertyName = dasherize(propertyName)
      ] = bindings[i].split(':')

      dependentKeys.push(propertyName)
      propertyMap[propertyName] = cssPropertyName
    }

    propertyWillChange(this, 'style')
    defineEmberProperty(this, 'style', computed(...dependentKeys, function() {
      return this._computeStyle(propertyMap)
    }))
    propertyDidChange(this, 'style')
  })
})
