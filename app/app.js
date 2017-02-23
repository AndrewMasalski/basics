angular
    .module('PhoneBook', ['angularModalService', 'ngAnimate'])
    .controller('ContactDetailsController', function($scope, close, action, contact) {
        $scope.groups = ['None', 'Friends', 'Family', 'Spam', 'Favorites', 'Work'];
        $scope.contact = contact || {group: $scope.groups[0]};
        $scope.action = action;
        if ($scope.action === 'Delete') {
            $scope.readOnly = true;
        }
        $scope.close = function(result) {
            close(result, 333);
        };
    })
    .controller('PhoneBookCtrl', function($scope, ModalService, $http) {
        $scope.contact = {};
        $scope.contacts = {};

        $http.get('http://localhost:3003/api/contacts')
            .then(function(response) {
                $scope.contacts = response.data;
            })
            .catch(onError);

        function onError(err) {
            $scope.error = err;
        }

        function ask(action, data, callback) {
            var modalOptions = {
                templateUrl: 'contactDetails.html',
                controller: "ContactDetailsController",
                inputs: {
                    action: action,
                    contact: data
                }
            };
            ModalService.showModal(modalOptions)
                .then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {
                        if (result) {
                            callback(result)
                        }
                    });
                })
        }

        $scope.create = function() {
            $scope.error = undefined;
            ask('Create', undefined, $scope.addToStorage);
        };

        $scope.edit = function(contact) {
            $scope.error = undefined;
            var clone = angular.copy(contact);
            ask('Edit', clone, function(edited) { $scope.saveToStorage(contact, edited); });
        };

        $scope.delete = function(contact) {
            $scope.error = undefined;
            ask('Delete', contact, $scope.deleteFromStorage);
        };

        $scope.addToStorage = function(contact) {
            var newContact = {
                id: new Date().getTime(),
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                group: contact.group
            };
            $http.post('http://localhost:3003/api/contacts', newContact)
                .then(function() {
                    $scope.contacts[newContact.id] = newContact;
                })
                .catch(onError);
        };

        $scope.saveToStorage = function(contact, edited) {
            $http.put('http://localhost:3003/api/contacts', edited)
                .then(function() {
                    angular.merge(contact, edited);
                })
                .catch(onError);
        };

        $scope.deleteFromStorage = function(contact) {
            $http.delete('http://localhost:3003/api/contacts/' + contact.id)
                .then(function() {
                    delete $scope.contacts[contact.id];
                })
                .catch(onError);
        };
    });