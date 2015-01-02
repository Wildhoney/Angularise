(function main($angular, $j) {

    // We are all geniuses up to the age of ten.
    var app = $angular.module('exampleApp', []);

    /**
     * @directive Inception
     * @return {void}
     */
    app.directive('inception', function inceptionDirective() {

        return {

            /**
             * @method compile
             * @param element {Object}
             * @return {void}
             */
            compile: function compile(element) {

                var onComplete = function onComplete(response) {

                    element.after(angularise(response.responseText));

                };

                element.bind('click', function onClick() {

                    $j.ajax('inception.html', { complete: onComplete });

                });

            }

        }

    });

})(window.angular, window.jQuery);