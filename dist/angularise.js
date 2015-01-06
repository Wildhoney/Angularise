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

        if (typeof $angular === 'undefined') {

            // Angular.js must of course have been defined.
            throwException('Angular.js has not been loaded');

        }

        // Discover the node in which we're using for the scope.
        targetNode      = targetNode || $document.querySelector('*[' + NG_APP_ATTRIBUTE + ']');
        var rootElement = $angular.element(targetNode);

        // HTML template once it has been compiled against the desired scope.
        var compiledHtml = '';

        if (rootElement.length === 0) {

            // Unable to locate node with "ng-app" attribute.
            throwException('Unable to locate node with "' + NG_APP_ATTRIBUTE + '" attribute');

        }

        $angular.forEach(['scope', 'injector'], function forEach(methodName) {

            if (!(methodName in rootElement)) {

                // Ensure the necessary methods exist on the "rootElement" element.
                throwException('Method "' + methodName + '" is unavailable on "' + NG_APP_ATTRIBUTE + '" node');

            }

        });

        // Process of compiling the HTML.
        rootElement.injector().invoke(function invoke($compile) {
            compiledHtml = $compile(html)(rootElement.scope());
        });

        /**
         * Determine if it's safe to invoke the $apply method.
         *
         * @method safeApply
         * @return {void}
         */
        (function safeApply() {

            var phase = compiledHtml.scope().$$phase;

            if (phase !== '$apply' || phase !== '$digest') {
                rootElement.scope().$apply();
            }

        })();

        return compiledHtml;

    };

})(window, window.document, window.angular);