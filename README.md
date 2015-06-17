# koco-select2-binding-handler
This binding handler is intended to integrate with the select2 ui component.


#Getting started

## Install bower component
```shell
  bower install koco-select2-binding-handler
```

## Usage with KOCO

This is a shared module that is used in many other modules. The convention is to require the handler in the `knockout-binding-handlers.js` file like so:

```javascript
define([
  ...
  'bower_components/koco-order-by-updater-binding-handler/src/koco-select2-binding-handler'
  ...
],
```

It also depends upon an older version of the select2 library, which also happens to be an amd-compatible fork, which you will need to include in the `require.configs.js` file:

```javascript
paths: {
  ...
  'select2': 'bower_components/select2-amd/select2'
  ...
}
```

You can then put the binding handler into action like this:

```html
<select data-bind="select2: { minimumResultsForSearch: 10 }"></select>
],
```