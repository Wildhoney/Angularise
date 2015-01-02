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
        throwException('Angular.js has not been loaded.');

    }

    /**
     * @module angularise
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/Angularise
     * @param html {String}
     * @param [scope=undefined] {Object}
     * @return {String}
     */
    $window.angularise = function angularise(html, scope) {

        var compiledHtml = '';

        if (!scope) {

            var ngAppNode = $document.querySelector('*[ng-app]');

            if (!ngAppNode) {

                // Unable to locate node with "ng-app" attribute.
                throwException('Unable to locate node with "ng-app" attribute.');

            }

            if (!('scope' in ngAppNode)) {

                // Unable to locate "scope" method on node.
                throwException('Method "scope" is unavailable on "ng-app" node.');

            }

            // We'll attempt to locate the root scope if a child scope hasn't been specified.
            scope = ngAppNode.scope();

        }

        // Process of compiling the HTML.
        $angular.element($document).injector().invoke(function invoke($compile) {
            compiledHtml = $compile(html)(scope);
        });

        return compiledHtml;

    };

})(window, window.document, window.angular);