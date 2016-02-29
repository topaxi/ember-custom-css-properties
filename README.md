# Ember-custom-css-properties

WARNING: This addon is a proof of concept and should not be used in production yet!

## Installation

```bash
ember install ember-custom-css-properties
```

## Usage

You may define `cssPropertyBindings` on all your components, just like `attributeBindings` this will
set and bind your property to a custom css property.

Example:

```javascript
import Component from `ember-component`

export default Component.extend({
  cssPropertyBindings: [ 'fooBar', 'baz' ],

  fooBar: 5,
  baz: '5px'
})
```

Will result in a element like this:

```html
<div style="--foo-bar:5;--baz:5px"></div>
```

Currently, javascript numbers, CSS number values and hex colors are treated as `safe` by default,
anything else should be escaped using the `Ember.String.htmlSafe()` function. Otherwise a warning will be
printed to your developer console.

## Configuration

By default, this addon adds the `ember-custom-css-properties` mixin to all components by default.
To disable this behaviour, you can set the `addToAllComponents` in your config file at `config/environment` to `false`.

```javascript
module.exports = function(environment) {
  var ENV = {
    // ...
    'ember-custom-css-properties': {
      addToAllComponents: false
    }
  }
}
```

After disabling the mixin, you need to add it to all components which want to bind custom CSS properties.

Example:

```javascript
import Component from 'ember-component'
import CustomCSSPropertyBindings from 'ember-custom-css-properties/mixins/custom-css-properties'

export default Component.extend(CustomCSSPropertyBindings, {
  // ...
})
```

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
