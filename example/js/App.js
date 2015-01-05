(function main($angular, $j) {

    // We are all geniuses up to the age of ten.
    var app = $angular.module('exampleApp', []);

    /**
     * @method InceptionController
     * @param $scope {Object}
     * @return {void}
     */
    app.controller('InceptionController', function InceptionController($scope) {

        /**
         * @property index
         * @type {Number}
         */
        $scope.index = 1;

    });

    /**
     * @directive inception
     * @return {void}
     */
    app.directive('inception', function inceptionDirective() {

        return {

            /**
             * @property scope
             * @type {Boolean}
             */
            scope: false,

            /**
             * @method link
             * @param scope {Object}
             * @param element {Object}
             * @return {void}
             */
            link: function link(scope, element) {

                /**
                 * @method onComplete
                 * @param response {Object}
                 * @return {void}
                 */
                var onComplete = function onComplete(response) {

                    scope.index++;
                    element.after(angularise(response.responseText));

                };

                element.bind('click', function onClick() {

                    // Load the template when the directive has been clicked.
                    $j.ajax('inception.html', { complete: onComplete });

                });

            }

        }

    });

})(window.angular, window.jQuery);