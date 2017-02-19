angular
    .module('Phone', ['angularModalService', 'ngAnimate'])
    .constant('availGroups',['NoGrouped', 'Friends', 'Family', 'Spam', 'Favorites', 'Work'])
    .controller('modalAddController', function ($scope, close, name, phone, email) {
        $scope.name = name;
        $scope.phone = phone;
        $scope.email = email;
        $scope.close = function(result) {
            close(result, 500);
        };          
    })
    .controller('modalDelController', function ($scope, close) {
        $scope.close = function(result) {
            close(result, 500);
        }; 
    })
    .controller('modalEditController', function ($scope, close, availGroups, name, phone, email, selectedOption) {
        $scope.name = name;
        $scope.phone = phone;
        $scope.email = email;
        $scope.selectedOption = selectedOption;
        $scope.groups = availGroups;
        $scope.close = function(result) {
            if (result === 'Yes') {
                result = {
                    name: $scope.name,
                    phone: $scope.phone,
                    email: $scope.email,
                    group: $scope.selectedOption
                };
            }
            close(result, 500);
        };
    })
    .controller('PhoneController', function ($scope, ModalService, availGroups) {
        /*models*/
        $scope.groups = availGroups;
        $scope.contacts = [
            {id:1, name: 'Kirill Starovoitov', phone:'+375293433221', email: 'kirill@gmail.com', group: 'Spam'},
            {id:2, name: 'Mariya Panasiuk', phone:'+375332344500', email: 'panasiuk@mail.ru', group: 'Friends'},
            {id:3, name: 'Alina Ivanova', phone:'+375441234555', email: 'ivanova_alina@yandex.ru', group: 'Favorites'},
            {id:4, name: 'Vasilij Kruchkov', phone:'+375290988778', email: 'fedcsd@tut.by', group: 'NoGrouped'},
            {id:5, name: 'Ivan Sidorov', phone:'+375291116700', email: 'bublikfbhm@tut.by', group: 'NoGrouped'},
            {id:6, name: 'Aleks Petrov', phone:'+375293434776', email: 'vadfyndf@tut.by', group: 'NoGrouped'},
            {id:7, name: 'Igor Polkin', phone:'+375299987679', email: 'arvsvfv@tut.by', group: 'NoGrouped'},
            {id:8, name: 'Roman Byk', phone:'+375293245641', email: 'kigmf@tut.by', group: 'NoGrouped'},
            {id:9, name: 'Vladimir Semenov', phone:'+375297670123', email: 'dcsdcs@tut.by', group: 'NoGrouped'},
            {id:10, name: 'Robert Okun', phone:'+375297777777', email: 'trdc@tut.by', group: 'NoGrouped'},
            {id:11, name: 'Demis Zardecki', phone:'+375292344588', email: 'vfvsdcs@tut.by', group: 'NoGrouped'},
            {id:12, name: 'John Rybalko', phone:'+375299934123', email: 'h h fdfd@tut.by', group: 'NoGrouped'},
            {id:13, name: 'Mike Konoval', phone:'+375295435567', email: 'csdcrfdc@tut.by', group: 'NoGrouped'},
            {id:14, name: 'Olga Sidorenko', phone:'+375299903488', email: 'bbtbsf@tut.by', group: 'NoGrouped'},
            {id:15, name: 'Irina Sanko', phone:'+375293453211', email: 'rreadc@tut.by', group: 'NoGrouped'},
            {id:16, name: 'Elena Lapkin', phone:'+37529432793', email: 'zavrnur@tut.by', group: 'NoGrouped'},
            {id:17, name: 'Lubov Sokol', phone:'+375296435678', email: 'xegtvsf@tut.by', group: 'NoGrouped'},
            {id:18, name: 'Valentina Belov', phone:'+375294567877', email: 'ubvtv@tut.by', group: 'NoGrouped'},
            {id:19, name: 'Sara Plavnik', phone:'+375292453464', email: 'yvdfvsd@tut.by', group: 'NoGrouped'},
            {id:20, name: 'Iosif Pivovar', phone:'+375297658853', email: 'racdc@tut.by', group: 'NoGrouped'},
            {id:21, name: 'Izia Timaev', phone:'+375295535654', email: 'mvsvdfv@tut.by', group: 'NoGrouped'},
            {id:22, name: 'Moisha Karpuk', phone:'+37529', email: 'cbdbv@tut.by', group: 'NoGrouped'}
        ];
        $scope.id = '';
        $scope.name = '';
        $scope.phone = '';
        $scope.email = '';
        $scope.selectedOption = '';
        /*Sort*/
        $scope.propertyName = 'name';

        $scope.sortBy = function (propertyName) {
            $scope.propertyName = propertyName;
        };
        /*Filter*/

        /*behaviors*/
        $scope.add = function () {
            ModalService.showModal({
                templateUrl: 'modalAdd.html',
                controller: "modalAddController",
                inputs: {name: $scope.name, phone: $scope.phone, email: $scope.email}
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result === 'Yes') {
                        $scope.contacts.push({
                            id: new Date().getTime() - 1487243560000,
                            name: $scope.name,
                            phone: $scope.phone,
                            email: $scope.email,
                            group: $scope.selectedOption})
                    }
                    $scope.id = '';
                    $scope.name = '';
                    $scope.phone = '';
                    $scope.email = '';
                    $scope.group = '';
                    $scope.selectedOption = '';
                });
            });
        };
        $scope.delete = function (contact) {
            ModalService.showModal({
                templateUrl: 'modalDel.html',
                controller: "modalDelController"
                }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result === 'Yes') {
                        var index = $scope.contacts.indexOf(contact);
                        $scope.contacts.splice(index, 1);
                    }
                });
            });
        };
        $scope.edit = function (contact) {
            ModalService.showModal({
                templateUrl: 'modalEdit.html',
                controller: "modalEditController",
                inputs: {name: $scope.name, phone: $scope.phone, email: $scope.email, selectedOption: $scope.selectedOption}
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (angular.isObject(result)) {
                        contact.name = result.name;
                        contact.phone = result.phone;
                        contact.email = result.email;
                        contact.group = result.group;

                    }
                });
            });
        };
    });

