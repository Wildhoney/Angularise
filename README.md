Angularise
==========

`Angularise` is a simple module for compiling HTML templates outside of the Angular.js runloop &ndash; such as asynchronous AJAX requests &ndash; in the case of `Angularise` you don't even require the scope to compile the HTML.

## Getting Started

By default `Angularise` uses the scope which the `ng-app` attribute is assigned to &ndash; the root scope &ndash; [you may override this default functionality](#scope-element).

In order to work with the `Angularise` module you simply need to pass in your HTML to the global `angularise()` method:

```javascript
var compiledHtml = angularise('<strong>My HTML</strong>');
targetNode.append(compiledHtml);
```

All of this is especially useful when you consider an example with loading the HTML via an AJAX call &ndash; naturally you should be using the Angular.js approach of [templates](https://docs.angularjs.org/api/ng/directive/ngInclude), but in legacy systems this is not always possible:

```javascript
$.ajax('inception.html', { complete: function onComplete(response) {

    // Compiled the response text and then append it to a node.
    targetNode.append(angularise(response.responseText));

}});
```

## Scope Element

Instead of using the node with the `ng-app` attribute, pass in a valid HTML element as the second argument of the `angularise()` method:

```javascript
angularise('<strong>My HTML</string>', document.querySelector('div'));
```