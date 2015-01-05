(function main($window, $document, $angular) {

    "use strict";

    /**
     * @method throwException
     * @param message {String}
     * @throws Exception
     * @return {void}
     */
    var throwException = function throwException(message) {
        throw "Angularise: " + message + ".";
    };

    if (typeof $angular === 'undefined') {

        // Angular.js must of course have been defined.
        throwException('Angular.js has not been loaded');

    }

    /**
     * @constant NG_APP_ATTRIBUTE
     * @type {String}
     */
    var NG_APP_ATTRIBUTE = 'ng-app';

    /**
     * @module angularise
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Angularise
     * @param html {String}
     * @param [targetNode="*[ng-app]"] {Object}
     * @return {String}
     */
    $window.angularise = function angularise(html, targetNode) {

        // Discover the node in which we're using for the scope.
        targetNode    = targetNode || $document.querySelector('*[' + NG_APP_ATTRIBUTE + ']');
        var scopeNode = $angular.element(targetNode);

        // HTML template once it has been compiled against the desired scope.
        var compiledHtml = '';

        if (scopeNode.length === 0) {

            // Unable to locate node with "ng-app" attribute.
            throwException('Unable to locate node with "' + NG_APP_ATTRIBUTE + '" attribute');

        }

        if (!('scope' in scopeNode)) {

            // Unable to locate "scope" method on node.
            throwException('Method "scope" is unavailable on "' + NG_APP_ATTRIBUTE + '" node');

        }

        // Process of compiling the HTML.
        scopeNode.injector().invoke(function invoke($compile) {
            compiledHtml = $compile(html)(scopeNode.scope());
        });

        // Determine if it's safe to invoke the $apply method.
        var phase = compiledHtml.scope().$$phase;

        if (phase !== '$apply' || phase !== '$digest') {
            scopeNode.scope().$apply();
        }

        return compiledHtml;

    };

})(window, window.document, window.angular);