var phonebook = angular
    .module('Phone', ['angularModalService', 'ngAnimate'])
    .controller('ModalController', function($scope, close, name, phone, email) {
        $scope.name = name;
        $scope.phone = phone;
        $scope.email = email;
        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };

    })
    .controller('PhoneCtrl', function($scope, ModalService) {
        $scope.show = function() {
            if (!$scope.userForm.$valid) {
                angular.forEach($scope.userForm.$error.required, function(field) { field.$setDirty(); });
            } else {
                ModalService.showModal({
                    templateUrl: 'modal.html',
                    controller: "ModalController",
                    inputs: {name: $scope.name, phone: $scope.phone, email: $scope.email}
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {
                        /*$scope.message = "You said " + result;*/
                        if (result === 'Yes') {$scope.add()}
                    });
                });
            }
        };

        $scope.groups = ['Friends', 'Family', 'Spam', 'Favorites', 'NoGrouped', 'Work'];
        $scope.contacts = [];
        $scope.id = 0;
        $scope.name = '';
        $scope.phone = '';
        $scope.email = '';
        $scope.group = '';
        $scope.selectedOption = '';
        $scope.add = function() {
            $scope.contacts.push({
                id: $scope.id,
                name: $scope.name,
                phone: $scope.phone,
                email: $scope.email,
                group: $scope.selectedOption
            });
            $scope.id = 0;
            $scope.name = '';
            $scope.phone = '';
            $scope.email = '';
            $scope.group = '';
            $scope.selectedOption = '';
        };
    });