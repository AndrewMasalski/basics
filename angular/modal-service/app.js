var app = angular.module('sampleapp', ['angularModalService', 'ngAnimate']);

app.controller('SampleController', ['$scope', 'ModalService', function($scope, ModalService) {
    $scope.yesNoResult = null;
    $scope.complexResult = null;
    $scope.customResult = null;

    $scope.showYesNo = function() {
        ModalService.showModal({
            templateUrl: "yesNo.html",
            controller: "YesNoController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.yesNoResult = result ? "ответ Да" : "ответ Нет";
            });
        });
    };

}]);


app.controller('YesNoController', ['$scope', 'close', function($scope, close) {
    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
}]);