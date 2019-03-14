describe("Application mailApp >>", function() {

    beforeEach(module('mailApp'));

    describe("login >>", function() {
        describe("component >>", function() {
            /*Не понял как отслеживать выполенение импортираваного модуля
             * start_login() -> auth.login(name, password)
             */
        });

    });

    describe("users >>", function() {

        describe("component >>", function() {
            let componentControllerUsers,
                componentControllerAboutUser,
                mockUsers = [{
                    id: 123,
                    name: 'Ivan'
                }],
                $rootScope;

            beforeEach(inject((userApi, $componentController, $q, _$rootScope_) => {
                $rootScope = _$rootScope_;

                spyOn(userApi, 'getUsers').and.returnValue($q.resolve(mockUsers));
                spyOn(userApi, 'removeUser').and.returnValue($q.resolve(mockUsers));
                componentControllerUsers = $componentController('userCard', null, {
                    users: mockUsers
                });

                spyOn(userApi, 'getUser').and.returnValue($q.resolve(mockUsers[0]));
                componentControllerAboutUser = $componentController('aboutUser', null, {
                    user: mockUsers[0]
                });

            }));

            it("should call userApi.getUsers", inject(function(userApi) {
                expect(userApi.getUsers).toHaveBeenCalled();
            }));

            it("should be set users", function() {
                expect(componentControllerUsers.users).toEqual(mockUsers);
            });

            it("should call userApi.removeUser", inject(function(userApi) {
                componentControllerUsers.remove_user(123);
                expect(userApi.removeUser).toHaveBeenCalled();
            }));

            it("should call userApi.getUser", inject(function(userApi) {
                componentControllerAboutUser.$onInit();
                expect(userApi.getUser).toHaveBeenCalled();
            }));

            it("should be set user", function() {
                expect(componentControllerAboutUser.user).toEqual(mockUsers[0]);
            });

            /*
             * Не понял как проверить удаление/сохранения, при такой записи выдает ошибку.
             * TypeError: undefined is not an object (evaluating 'componentController.remove_user(123).then') in karma-test/test.js 
             */

            /*it("should be set users", function(done) {
                componentController.remove_user(123).then(() => {
                    console.log(componentController.users)
                    expect(componentController.users).toEqual({});
                    done();
                });
                $rootScope.$digest();
            });*/
        });


        describe("service >>", function() {
            let userApi, $httpBackend,
                mockUsers = [{}],
                userId = '1';


            beforeEach(inject((_userApi_, _$httpBackend_) => {
                userApi = _userApi_;
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/' + userId)
                    .respond(mockUsers[0]);
                $httpBackend.whenGET('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/')
                    .respond(mockUsers);
                $httpBackend.whenDELETE('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/' + userId)
                    .respond('sucsses');
                $httpBackend.whenPOST('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/')
                    .respond('create');
                $httpBackend.whenPATCH('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/' + userId)
                    .respond(mockUsers);
            }));

            it("should get one user", function(done) {
                userApi.getUser(userId).then((user) => {
                    expect(user).toEqual(mockUsers[0]);
                    done();
                });
                $httpBackend.flush();
            });
            it("should get all user", function(done) {
                userApi.getUsers().then((users) => {
                    expect(users).toEqual(mockUsers);
                    done();
                });
                $httpBackend.flush();
            });
            it("should be delete user", function(done) {
                userApi.removeUser(userId).then((data) => {
                    expect(data.data).toEqual('sucsses');
                    done();
                });
                $httpBackend.flush();
            });
            it("should be add user", function(done) {
                userApi.saveUser({}).then((data) => {
                    expect(data).toEqual('create');
                    done();
                });
                $httpBackend.flush();
            });
            it("should be save user", function(done) {
                userApi.saveUser({ _id: userId }).then((data) => {
                    expect(data).toEqual('update');
                    done();
                });
                $httpBackend.flush();
            });

        });
    });

    describe("mails >>", function() {

        describe("component >>", function() {
            let componentControllerMails,
                componentControllerMail,
                componentControllerNewLetter,
                mockMails = [{}],
                title = '',
                mockUsers = [{}],
                $rootScope;

            beforeEach(inject((lettersApi, mailBoxesApi, userApi, $componentController, $q, _$rootScope_) => {
                $rootScope = _$rootScope_;

                spyOn(lettersApi, 'getLetters').and.returnValue($q.resolve(mockMails));
                spyOn(mailBoxesApi, 'getMailBoxTitle').and.returnValue($q.resolve(title));
                spyOn(lettersApi, 'removeLetter').and.returnValue($q.resolve('sucsses'));

                componentControllerMails = $componentController('mailBox', null, {
                    mails: mockMails,
                    title: title,
                    box: 123
                });

                spyOn(lettersApi, 'getLetter').and.returnValue($q.resolve(mockMails[0]));
                componentControllerMail = $componentController('singleMail', null, {
                    mail: mockMails[0]
                });

                spyOn(userApi, 'getUsers').and.returnValue($q.resolve(mockUsers));
                componentControllerNewLetter = $componentController('newLetter', null, {
                    users: mockUsers
                })
            }));

            it("should call lettersApi.getLetters", inject(function(lettersApi) {
                componentControllerMails.$onInit();
                expect(lettersApi.getLetters).toHaveBeenCalled();
            }));

            it("should be set mails", function() {
                expect(componentControllerMails.mails).toEqual(mockMails);
            });

            it("should call mailBoxesApi.getMailBoxTitle", inject(function(mailBoxesApi) {
                componentControllerMails.$onInit();
                expect(mailBoxesApi.getMailBoxTitle).toHaveBeenCalled();
            }));

            it("should be set title", function() {
                expect(componentControllerMails.title).toEqual(title);
            });

            it("should call mailBoxesApi.removeLetter", inject(function(lettersApi) {
                componentControllerMails.delete_mail(123);
                expect(lettersApi.removeLetter).toHaveBeenCalled();
            }));

            /*it("should set user", function(done) {
                componentControllerMails.delete_mail(123).then((data) => {
                    expect(componentControllerMails.mails).toEqual(mockMails);
                    done();
                });
                $rootScope.$digest();
            });*/

            /**/

            it("should call lettersApi.getLetter", inject(function(lettersApi) {
                componentControllerMail.$onInit();
                expect(lettersApi.getLetter).toHaveBeenCalled();
            }));

            it("should be set mail", function() {
                expect(componentControllerMail.mail).toEqual(mockMails[0]);
            });

            /**/

            it("should call userApi.getUsers", inject(function(userApi) {
                expect(userApi.getUsers).toHaveBeenCalled();
            }));

            it("should be set users", function() {
                expect(componentControllerNewLetter.users).toEqual(mockUsers);
            });

            /* Дальше удаление/сохранение/добавление которые не получились =(*/

        });

        describe("service >>", function() {
            let lettersApi, $httpBackend,
                mockLetters = [{}],
                letterId = '1';

            beforeEach(inject((_lettersApi_, _$httpBackend_) => {
                lettersApi = _lettersApi_;
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('https://test-api.javascript.ru/v1/dmitrii.baluyk/letters/' + letterId)
                    .respond(mockLetters[0]);
                $httpBackend.whenGET('https://test-api.javascript.ru/v1/dmitrii.baluyk/letters')
                    .respond(mockLetters);
                $httpBackend.whenDELETE('https://test-api.javascript.ru/v1/dmitrii.baluyk/letters/' + letterId)
                    .respond(mockLetters);
                $httpBackend.whenPOST('https://test-api.javascript.ru/v1/dmitrii.baluyk/letters/')
                    .respond(mockLetters);

            }));

            it("should get one letter", function(done) {
                lettersApi.getLetter(letterId).then((letter) => {
                    expect(letter).toEqual(mockLetters[0]);
                    done();
                });
                $httpBackend.flush();
            });
            it("should get all letters", function(done) {
                lettersApi.getLetters().then((letter) => {
                    expect(letter.__proto__).toEqual(mockLetters.__proto__);
                    done();
                });
                $httpBackend.flush();
            });
            it("should be delete letter", function(done) {
                lettersApi.removeLetter(letterId).then((data) => {
                    expect(data).toEqual(mockLetters);
                    done();
                });
                $httpBackend.flush();
            });
            it("should be send letter", function(done) {
                lettersApi.sendMail('', '', '').then((data) => {
                    expect(data.status).toEqual(200);
                    done();
                });
                $httpBackend.flush();
            });

        });

        describe("mailbox >>", function() {

            describe("component >>", function() {
                let componentController,
                    mailBoxes = [{}],
                    $rootScope;

                beforeEach(inject((mailBoxesApi, $componentController, $q, _$rootScope_) => {
                    $rootScope = _$rootScope_;

                    spyOn(mailBoxesApi, 'get_mailBoxes').and.returnValue($q.resolve(mailBoxes));
                    componentController = $componentController('mailBoxes', null, {
                        mailboxes: mailBoxes
                    });
                }));

                it("should call mailBoxesApi.get_mailBoxes", inject(function(mailBoxesApi) {
                    expect(mailBoxesApi.get_mailBoxes).toHaveBeenCalled();
                }));

                it("should be set mailboxes", function() {
                    expect(componentController.mailboxes).toEqual(mailBoxes);
                });
            });

            describe("service >>", function() {
                let mailBoxesApi, $httpBackend,
                    mockBoxs = [{}],
                    boxId = '1';


                beforeEach(inject((_mailBoxesApi_, _$httpBackend_) => {
                    mailBoxesApi = _mailBoxesApi_;
                    $httpBackend = _$httpBackend_;
                    $httpBackend.whenGET('https://test-api.javascript.ru/v1/dmitrii.baluyk/mailboxes/' + boxId)
                        .respond(mockBoxs[0]);
                    $httpBackend.whenGET('https://test-api.javascript.ru/v1/dmitrii.baluyk/mailboxes')
                        .respond(mockBoxs);
                    $httpBackend.whenGET('https://test-api.javascript.ru/v1/dmitrii.baluyk/letters')
                        .respond([{}]);
                }));

                it("should get title mailbox", function(done) {
                    mailBoxesApi.getMailBoxTitle(boxId).then((box) => {
                        expect(box).toEqual(mockBoxs[0]);
                        done();
                    });
                    $httpBackend.flush();
                });
                it("should get all mailbox", function(done) {
                    mailBoxesApi.get_mailBoxes().then((box) => {
                        expect(box).toEqual(mockBoxs);
                        done();
                    });
                    $httpBackend.flush();
                });
            });


        });
    });

});