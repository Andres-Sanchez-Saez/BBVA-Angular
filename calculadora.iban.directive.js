(function (angular) {
    'use strict';

    angular.module('calculadoraIban')
        .directive('calculadoraIbanDirective', calculadoraIbanDirective)
        .constant("MAX_INPUTS", 4);

    calculadoraIbanDirective.$inject = ['MAX_INPUTS', '$timeout'];
    function calculadoraIbanDirective(MAX_INPUTS, $timeout) {
        return {
            link: function (scope, element, attrs) {
                $timeout(function () {
                    //Hacer foco en el primer input siempre que entres al componente
                    angular.element(document.querySelector("#c1"))[0].focus();
                }, 0);


                var initIndex = 1;
                applyEvent(initIndex);
                function applyEvent(index) {
                    if (index <= MAX_INPUTS && index > 0) {
                        angular.element("#c" + index).bind('keydown', function (e) {
                            if(e.key === "Backspace" && angular.element(this).val().length === 0 && Number(angular.element(this)[0].id.split('')[1])>1){
                                var indice = Number(angular.element(this)[0].id.split('')[1])-1;
                                $("#c" + indice).focus();
                                applyEvent(indice);
                            }
                        });
                        angular.element("#c" + index).bind('keyup', function (e) {
                            if (angular.element(this).val().length == angular.element(this).attr("maxlength")) {
                                $("#c" + index).focus();
                                applyEvent(index);
                            }
                        });
                        index++;
                    } else {
                        applyEvent(1);
                    }
                }
                angular.element("#c1").bind('focus', function (e) {
                    scope.$parent.$ctrl.c1OLD = angular.element("#c1").val() ? angular.element("#c1").val() : "";
                });
                angular.element("#c2").bind('focus', function (e) {
                    scope.$parent.$ctrl.c2OLD = angular.element("#c2").val() ? angular.element("#c2").val() : "";
                });
                angular.element("#c3").bind('focus', function (e) {
                    scope.$parent.$ctrl.c3OLD = angular.element("#c3").val() ? angular.element("#c3").val() : "";
                });
                angular.element("#c4").bind('focus', function (e) {
                    scope.$parent.$ctrl.c4OLD = angular.element("#c4").val() ? angular.element("#c4").val() : "";
                });

            },
            controller: function () {

            }
        }
    }
})(window.angular);
