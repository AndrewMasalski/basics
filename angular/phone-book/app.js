angular
    .module('PhoneBook', ['LocalStorageModule', 'angularModalService', 'ngAnimate'])
    .config(function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('PhoneBook').setNotify(true, true);
    })
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
    .controller('PhoneBookCtrl', function($scope, ModalService, localStorageService) {
        $scope.contact = {};
        $scope.contacts = localStorageService.get('contacts') || [];

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
            ask('Create', undefined, $scope.addToStorage);
        };

        $scope.edit = function(contact) {
            var clone = angular.copy(contact);
            ask('Edit', clone, $scope.saveToStorage);
        };

        $scope.delete = function(contact) {
            ask('Delete', contact, $scope.deleteFromStorage);
        };

        $scope.addToStorage = function(contact) {
            $scope.contacts.push({
                id: new Date().getTime(),
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                group: contact.group
            });
            localStorageService.set('contacts', $scope.contacts);
        };

        $scope.saveToStorage = function(clone) {
            for (var i = 0; i < $scope.contacts.length; i++) {
                var contact = $scope.contacts[i];
                if (contact.id == clone.id) {
                    angular.merge(contact, clone);
                    localStorageService.set('contacts', $scope.contacts);
                    break;
                }
            }
        };

        $scope.deleteFromStorage = function(contact) {
            var index = $scope.contacts.indexOf(contact);
            $scope.contacts.splice(index, 1);
            localStorageService.set('contacts', $scope.contacts);
        };
    });