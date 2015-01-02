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
     * @module angularise
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Angularise
     * @param html {String}
     * @param [targetNode=undefined] {Object}
     * @return {String}
     */
    $window.angularise = function angularise(html, targetNode) {

        // Discover the node in which we're using for the scope.
        var scopeNode = targetNode ? $angular.element(targetNode) : $document.querySelector('*[ng-app]');

        // HTML template once it has been compiled against the desired scope.
        var compiledHtml = '';

        if (!scopeNode) {

            // Unable to locate node with "ng-app" attribute.
            throwException('Unable to locate node with "ng-app" attribute');

        }

        // Ensure the node we're dealing with is an instance of $angular.element!
        scopeNode = $angular.element(scopeNode);

        if (!('scope' in scopeNode)) {

            // Unable to locate "scope" method on node.
            throwException('Method "scope" is unavailable on "ng-app" node');

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