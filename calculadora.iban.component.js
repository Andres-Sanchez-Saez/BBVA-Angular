(function (angular) {
    'use strict';
    /**
     * @ngdoc directive
     * @name component.calculadoraIban
     * @description
     * Componente de la calculadora IBAN
     */
    angular
        .module('calculadoraIban', [])
        .factory('IBANcalculatorService', IBANcalculatorService)
        .component('calculadoraIban', {
            templateUrl: '../bower_components/calculadora-iban/calculadora-iban.html',
            bindings: {
                ibanModel: '=',
                showIcon: '=',
                calcPosition: '@'
            },
            controller: CalculadoraIbanController
        });

    /**
     * @ngdoc method
     * @name CalculadoraIbanController
     * @methodOf component.calculadoraIban
     * @description
     * Controlador para el componente de la calculadora IBAN
     */
    CalculadoraIbanController.$inject = ['IBANcalculatorService', 'configApp', '$translatePartialLoader', '$translate', '$scope'];
    function CalculadoraIbanController(IBANcalculatorService, configApp, $translatePartialLoader, $translate, $scope) {
        var ctrl = this;
        if(!ctrl.calcPosition) ctrl.calcPosition = 'bottom';
        ctrl.validCCC = true;
        ctrl.juntionResources = configApp.junctionResources;
        ctrl.popoverTemplate = '../bower_components/calculadora-iban/calculadora-iban-modal.html';
        ctrl.c1OLD ="pepito";

        //var _junction = (configApp.junction_calculadora === undefined) ? '' : configApp.junction_calculadora;
        //$translatePartialLoader.addPart(_junction + 'i18n/calculadora-iban-');
        //$translate.refresh();
        ctrl.animationsEnabled = true;
        ctrl.calculadoraForm = {};
        ctrl.ccc2iban = function (form) {
            var _c1 = ctrl.calculadoraForm.c1;
            var _c2 = ctrl.calculadoraForm.c2;
            var _c3 = ctrl.calculadoraForm.c3;
            var _c4 = ctrl.calculadoraForm.c4;
            if (IBANcalculatorService.validateCCC(_c1 + _c2 + _c3 + _c4)) {
                //if (ctrl.ibanClase != 'CNR') {
                var _iban = IBANcalculatorService.calcularIban('ES', _c1 + _c2 + _c3 + _c4);
                var _iban = _iban.replace(/[^\dA-Z]/g, '');

                ctrl.ibanModel = _iban;
                //}
                ctrl.validCCC = true;
                ctrl.close(form);
            } else {
                ctrl.validCCC = false;
            }
        };
        ctrl.close = function (form) {
            ctrl.calculadoraForm.c1 = '';
            ctrl.calculadoraForm.c2 = '';
            ctrl.calculadoraForm.c3 = '';
            ctrl.calculadoraForm.c4 = '';
            ctrl.validCCC = true;
            ctrl.isOpen = false;

        };
        function getInputFocus(){
            /*if(ctrl.calculadoraForm.c1.length <4){
             $("#c1").focus();
             }else if(ctrl.calculadoraForm.c2.length <4){
             $("#c2").focus();
             }else if(ctrl.calculadoraForm.c3.length <2){
             $("#c3").focus();
             }else{
             $("#c4").focus();
             }*/
        }
        ctrl.handlePaste = function(e, pos){
            if(e.originalEvent.clipboardData && e.originalEvent.clipboardData.items){
                var item = e.originalEvent.clipboardData.items[0];
                var stringPaste = "";
                item.getAsString(function (data) {
                    stringPaste = data;
                    stringPaste = stringPaste.replace(/[^0-9]/g, "");
                    if(pos===1){
                        ctrl.c2OLD = "";
                        ctrl.c3OLD = "";
                        ctrl.c4OLD = "";
                        var lngthC1 = ctrl.c1OLD.length;
                        ctrl.calculadoraForm.c1 = ctrl.c1OLD + stringPaste.substr(0,4-lngthC1);
                        ctrl.calculadoraForm.c2 = stringPaste.substr(4-lngthC1,4);
                        ctrl.calculadoraForm.c3 = stringPaste.substr(8-lngthC1,2);
                        ctrl.calculadoraForm.c4 = stringPaste.substr(10-lngthC1,10);
                        getInputFocus();
                        $scope.$apply();
                    }
                    if(pos===2){
                        ctrl.c3OLD = "";
                        ctrl.c4OLD = "";
                        var lngthC2 = ctrl.c2OLD.length;
                        ctrl.calculadoraForm.c2 = ctrl.c2OLD + stringPaste.substr(0,4-lngthC2);
                        ctrl.calculadoraForm.c3 = stringPaste.substr(4-lngthC2,2);
                        ctrl.calculadoraForm.c4 = stringPaste.substr(6-lngthC2,10);
                        getInputFocus();
                        $scope.$apply();
                    }
                    if(pos===3){
                        ctrl.c4OLD = "";
                        var lngthC3 = ctrl.c3OLD.length;
                        ctrl.calculadoraForm.c3 = ctrl.c3OLD + stringPaste.substr(0,2-lngthC3);
                        ctrl.calculadoraForm.c4 = stringPaste.substr(2-lngthC3,10);
                        getInputFocus();
                        $scope.$apply();
                    }
                    if(pos===4){
                        var lngthC4 = ctrl.c4OLD.length;
                        ctrl.calculadoraForm.c4 = ctrl.c4OLD + stringPaste.substr(0,10-lngthC4);
                        getInputFocus();
                        $scope.$apply();
                    }
                });
            } else {
                stringPaste = e.originalEvent.clipboardData.getData('Text');;
                stringPaste = stringPaste.replace(/[^0-9]/g, "");
                if(pos===1){
                    ctrl.c2OLD = "";
                    ctrl.c3OLD = "";
                    ctrl.c4OLD = "";
                    var lngthC1 = ctrl.c1OLD.length;
                    ctrl.calculadoraForm.c1 = ctrl.c1OLD + stringPaste.substr(0,4-lngthC1);
                    ctrl.calculadoraForm.c2 = stringPaste.substr(4-lngthC1,4);
                    ctrl.calculadoraForm.c3 = stringPaste.substr(8-lngthC1,2);
                    ctrl.calculadoraForm.c4 = stringPaste.substr(10-lngthC1,10);
                    getInputFocus();
                    $scope.$apply();
                }
                if(pos===2){
                    ctrl.c3OLD = "";
                    ctrl.c4OLD = "";
                    var lngthC2 = ctrl.c2OLD.length;
                    ctrl.calculadoraForm.c2 = ctrl.c2OLD + stringPaste.substr(0,4-lngthC2);
                    ctrl.calculadoraForm.c3 = stringPaste.substr(4-lngthC2,2);
                    ctrl.calculadoraForm.c4 = stringPaste.substr(6-lngthC2,10);
                    getInputFocus();
                    $scope.$apply();
                }
                if(pos===3){
                    ctrl.c4OLD = "";
                    var lngthC3 = ctrl.c3OLD.length;
                    ctrl.calculadoraForm.c3 = ctrl.c3OLD + stringPaste.substr(0,2-lngthC3);
                    ctrl.calculadoraForm.c4 = stringPaste.substr(2-lngthC3,10);
                    getInputFocus();
                    $scope.$apply();
                }
                if(pos===4){
                    var lngthC4 = ctrl.c4OLD.length;
                    ctrl.calculadoraForm.c4 = ctrl.c4OLD + stringPaste.substr(0,10-lngthC4);
                    getInputFocus();
                    $scope.$apply();
                }
            }

            var item = e.originalEvent.clipboardData.items[0];
            var stringPaste = "";
            item.getAsString(function (data) {
                stringPaste = data;
                stringPaste = stringPaste.replace(/[^0-9]/g, "");
                if(pos===1){
                    ctrl.c2OLD = "";
                    ctrl.c3OLD = "";
                    ctrl.c4OLD = "";
                    var lngthC1 = ctrl.c1OLD.length;
                    ctrl.calculadoraForm.c1 = ctrl.c1OLD + stringPaste.substr(0,4-lngthC1);
                    ctrl.calculadoraForm.c2 = stringPaste.substr(4-lngthC1,4);
                    ctrl.calculadoraForm.c3 = stringPaste.substr(8-lngthC1,2);
                    ctrl.calculadoraForm.c4 = stringPaste.substr(10-lngthC1,10);
                    getInputFocus();
                    $scope.$apply();
                }
                if(pos===2){
                    ctrl.c3OLD = "";
                    ctrl.c4OLD = "";
                    var lngthC2 = ctrl.c2OLD.length;
                    ctrl.calculadoraForm.c2 = ctrl.c2OLD + stringPaste.substr(0,4-lngthC2);
                    ctrl.calculadoraForm.c3 = stringPaste.substr(4-lngthC2,2);
                    ctrl.calculadoraForm.c4 = stringPaste.substr(6-lngthC2,10);
                    getInputFocus();
                    $scope.$apply();
                }
                if(pos===3){
                    ctrl.c4OLD = "";
                    var lngthC3 = ctrl.c3OLD.length;
                    ctrl.calculadoraForm.c3 = ctrl.c3OLD + stringPaste.substr(0,2-lngthC3);
                    ctrl.calculadoraForm.c4 = stringPaste.substr(2-lngthC3,10);
                    getInputFocus();
                    $scope.$apply();
                }
                if(pos===4){
                    var lngthC4 = ctrl.c4OLD.length;
                    ctrl.calculadoraForm.c4 = ctrl.c4OLD + stringPaste.substr(0,10-lngthC4);
                    getInputFocus();
                    $scope.$apply();
                }
            });
        };
    }
    IBANcalculatorService.$inject = [];
    function IBANcalculatorService() {
        function codigoIban(codigo) {
            codigo = codigo.replace(/A/ig, '10');
            codigo = codigo.replace(/B/ig, '11');
            codigo = codigo.replace(/C/ig, '12');
            codigo = codigo.replace(/D/ig, '13');
            codigo = codigo.replace(/E/ig, '14');
            codigo = codigo.replace(/F/ig, '15');
            codigo = codigo.replace(/G/ig, '16');
            codigo = codigo.replace(/H/ig, '17');
            codigo = codigo.replace(/I/ig, '18');
            codigo = codigo.replace(/J/ig, '19');
            codigo = codigo.replace(/K/ig, '20');
            codigo = codigo.replace(/L/ig, '21');
            codigo = codigo.replace(/M/ig, '22');
            codigo = codigo.replace(/N/ig, '23');
            codigo = codigo.replace(/O/ig, '24');
            codigo = codigo.replace(/P/ig, '25');
            codigo = codigo.replace(/Q/ig, '26');
            codigo = codigo.replace(/R/ig, '27');
            codigo = codigo.replace(/S/ig, '28');
            codigo = codigo.replace(/T/ig, '29');
            codigo = codigo.replace(/U/ig, '30');
            codigo = codigo.replace(/V/ig, '31');
            codigo = codigo.replace(/W/ig, '32');
            codigo = codigo.replace(/X/ig, '33');
            codigo = codigo.replace(/Y/ig, '34');
            codigo = codigo.replace(/Z/ig, '35');

            return codigo;
        }

        return {
            validarIBAN: validarIBAN,
            calcularIban: calcularIban,
            validateCCC: validateCCC,
            transformAcountCCC: transformAcountCCC,
            calcularDC: calcularDC
        };


        function calcularIban(paisIban, cuenta) {

            var IBAN = 0;
            var CIN = codigoIban(cuenta);
            var codigoPais = codigoIban(paisIban);

            var iban = CIN.substring(0, 8);
            var MOD_1 = iban % 97;
            iban = '' + MOD_1 + CIN.substring(8, 16);
            MOD_1 = iban % 97;
            iban = '' + MOD_1 + CIN.substring(16, CIN.length) + codigoPais + '00';
            var MOD_iban = iban % 97;
            var CC_iban = 98 - MOD_iban;

            var Ctrl_IBAN = '';

            if (CC_iban < 10) {
                Ctrl_IBAN = '0';
            } else {
                Ctrl_IBAN = '';
            }


            return paisIban + Ctrl_IBAN + CC_iban + cuenta;


        }

        function validateCCC(cuenta) {
            if (cuenta != null && cuenta.length == 24) {
                cuenta = transformAcountCCC(cuenta);
            }
            if (cuenta == null || cuenta.length != 20) {
                return false;
            }
            var entidad = cuenta.substring(0, 4);
            var oficina = cuenta.substring(4, 8);
            var dc = cuenta.substring(8, 10);
            var cc = cuenta.substring(10);
            var bResultado = true;
            var entidadOficina = entidad + '' + oficina;
            var pesos = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
            var primerDigito = 0;
            var segundoDigito = 0;

            for (var i = 0; i < entidadOficina.length; i++) {
                primerDigito = primerDigito + entidadOficina.charAt(entidadOficina.length - 1 - i) * pesos[i];
            }
            primerDigito = 11 - (primerDigito % 11);
            if (primerDigito == 11) {
                primerDigito = 0;
            }
            if (primerDigito == 10) {
                primerDigito = 1;
            }
            for (var j = 0; j < cc.length; j++) {
                segundoDigito = segundoDigito + cc.charAt(cc.length - 1 - j) * pesos[j];
            }
            segundoDigito = (11 - (segundoDigito % 11));
            if (segundoDigito == 11) {
                segundoDigito = 0;
            } else if (segundoDigito == 10) {
                segundoDigito = 1;
            }
            if (primerDigito != dc.charAt(0)) {
                bResultado = false;
            }
            if (segundoDigito != dc.charAt(1)) {
                bResultado = false;
            }
            return bResultado;
        }

        function transformAcountCCC(cuenta) {
            if (cuenta != null && cuenta.length == 24 && /^[a-zA-Z()]+$/.test(cuenta.substring(0, 2))) {
                cuenta = cuenta.substring(4);
            }
            return cuenta;
        }

        function calcularDC(ccc) {
            // Habría que comprobar que sólo se han escrito números.
            if (ccc.length === 20) {
                var valores = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6];
                var controlCS = 0;
                var controlCC = 0;
                var dc = '';
                for (var i = 0; i <= 7; i++) {
                    controlCS += parseInt(ccc.charAt(i)) * valores[i + 2];
                }
                controlCS = 11 - (controlCS % 11);
                if (controlCS == 11) controlCS = 0;
                else if (controlCS == 10) controlCS = 1;

                for (i = 10; i <= 19; i++) {
                    controlCC += parseInt(ccc.charAt(i)) * valores[i - 10];
                }
                controlCC = 11 - (controlCC % 11);
                if (controlCC === 11) {
                    controlCC = 0;
                } else if (controlCC == 10) {
                    controlCC = 1;
                }

                dc = controlCS + '' + controlCC;
                return dc;
            }
        }

        function validarIBAN(IBAN) {
            //Se pasa a Mayusculas
            IBAN = IBAN.toUpperCase();
            //Se quita los blancos de principio y final.
            IBAN = IBAN.trim();
            IBAN = IBAN.replace(/\s/g, ""); //Y se quita los espacios en blanco dentro de la cadena

            var letra1, letra2, num1, num2;
            var isbanaux;
            var numeroSustitucion;
            //La longitud debe ser siempre de 24 caracteres
            if (IBAN.length != 24) {
                return false;
            }

            // Se coge las primeras dos letras y se pasan a números
            letra1 = IBAN.substring(0, 1);
            letra2 = IBAN.substring(1, 2);
            num1 = getnumIBAN(letra1);
            num2 = getnumIBAN(letra2);
            //Se sustituye las letras por números.
            isbanaux = String(num1) + String(num2) + IBAN.substring(2);
            // Se mueve los 6 primeros caracteres al final de la cadena.
            isbanaux = isbanaux.substring(6) + isbanaux.substring(0, 6);

            //Se calcula el resto, llamando a la función modulo97, definida más abajo
            var resto = modulo97(isbanaux);
            if (resto == 1) {
                return true;
            } else {
                return false;
            }
        }

        function modulo97(iban) {
            var parts = Math.ceil(iban.length / 7);
            var remainer = "";

            for (var i = 1; i <= parts; i++) {
                remainer = String(parseFloat(remainer + iban.substr((i - 1) * 7, 7)) % 97);
            }

            return remainer;
        }

        function getnumIBAN(letra) {
            var ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return ls_letras.search(letra) + 10;
        }
    }
})(window.angular);