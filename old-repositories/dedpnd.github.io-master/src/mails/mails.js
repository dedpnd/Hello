/**
 * TODO:
 * Разделить в ui-router mail и mails
 * Дисейблить Delete при отсутсвие выбранных чекбоксов.
 * Генерация пользователя ? 
 */

import toastr from 'toastr';
import app from './../app.js';

/**Письма главный контейнер */
app.component("mailBox", {
    bindings: {
        box: "<"
    },
    templateUrl: './mails/mails.tmpl.html',
    controller: function($timeout, lettersApi, mailBoxesApi) {
        this.mails = [];
        this.limit_mails = 5;
        this.search_mails = '';
        this.delete_mails = {};
        this.title = 'Inbox'

        this.$onInit = function() {
            lettersApi.getLetters(this.box).then((data) => {
                data.forEach((a) => {
                    a['time_start'] = Date.now();
                });
                this.mails = data;
            })

            if (this.box) {
                mailBoxesApi.getMailBoxTitle(this.box).then((data) => {
                    this.title = data.title;
                })
            }

        }

        this.delete_mail = (id) => {
            _.remove(this.mails, { "_id": id });
            lettersApi.removeLetter(id);
        };

        this.set_delete_flag_mail = (id, flag) => {
            this.delete_mails[id] = flag;
        }

        this.remove_select_mails = () => {
            for (let key in this.delete_mails) {
                if (this.delete_mails[key] === true) {
                    this.delete_mail(key);
                }
            }
        }

    }
});

/**Письма */
app.component("userMail", {
    bindings: {
        mail: "<",
        deleteMail: "&",
        setDeleteFlagMail: "&"
    },
    templateUrl: './mails/mail/mail.tmpl.html',
    controller: function() {

        this.$onDestroy = function() {
            //empty
        };

        this.change_cb = () => {
            this.setDeleteFlagMail({ id: this.mail._id, flag: this.trash_cb })
        }

        this.stop = (event) => {
            event.stopPropagation()
        }

        this.delete = (id, event) => {
            event.preventDefault();
            let time_life = new Date(Date.now() - this.mail.time_start).getSeconds();
            toastr.success('Time life mail: ' + time_life + 'secs');
            this.deleteMail({ id: id });
            console.log(this.trash_cb)
        };

        this.show_short_format = (txt) => {
            return txt.substr(0, 100) + '...'
        }
    }
});

/**Вывод пиьма польностью */
app.component('singleMail', {
    bindings: {
        mailid: '<'
    },
    template: `
    <div class="s_mail">
        <h2 class="s_mail_header">{{$ctrl.mail.subject}}</h2>
        <span class="s_mail_to">{{$ctrl.mail.to}}</span>
        <span class="s_mail_text">{{$ctrl.mail.body}}</span>
    </div>
    `,
    controller: function(lettersApi) {
        this.mail = {};

        this.$onInit = function() {
            lettersApi.getLetter(this.mailid).then((data) => {
                this.mail = data;
            })
        }
    }
});

/*Создание нового письма */
app.component('newLetter', {
    templateUrl: './mails/new_letter/new_letter.tmpl.html',
    controller: function(userApi, lettersApi) {
        this.users = [];
        this.user = '';
        this.searchText = '';
        this.subject = '';
        this.body = '';

        userApi.getUsers().then((data) => {
            this.users = data;
        })

        this.querySearch = (query) => {
            return query ? this.users.filter(createFilterFor(query)) : this.users
        }

        this.newUser = (email) => {

            let email_pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
            if (email.match(email_pattern)) {
                let name = prompt('Enter the user name');
                let user = {
                    fullName: name,
                    email: email
                }

                userApi.saveUser(user).then((data) => {
                    toastr.info('User ' + data, 'Information');
                })
            } else {
                toastr.info("It's not email", 'Information');
            }

        }

        this.send_mail = () => {
            if (this.user && this.subject && this.body) {
                lettersApi.sendMail(this.subject, this.user.email, this.body).then(() => {
                    toastr.info('Mail send, thank you', 'Information');

                    this.user = '';
                    this.subject = '';
                    this.body = '';
                });
            } else {
                toastr.info('Please fill in all the fields', 'Information');
            }
        }
    }
})

app.service('lettersApi', function($http) {
    this.getLetters = (mailbox) => {
        return $http.get('https://test-api.javascript.ru/v1/dmitrii.baluyk/letters').then((data) => {
            const inbox = "5935431c55fc9c1d0458850d"
            let mailbox_call = mailbox || inbox;
            return data.data.filter((a) => {
                return a.mailbox == mailbox_call
            })
        })
    };

    this.getLetter = (id) => {
        return $http.get('https://test-api.javascript.ru/v1/dmitrii.baluyk/letters/' + id).then((data) => {
            return data.data
        })
    }

    this.removeLetter = (id) => {
        return $http.delete('https://test-api.javascript.ru/v1/dmitrii.baluyk/letters/' + id).then((data) => {
            console.log("Delete OK")
            return data.data
        })
    };

    this.sendMail = (subject, email, body) => {
        let mailbox_send = '593f933855fc9c1d045888f5'
        let data = JSON.stringify({
            mailbox: mailbox_send,
            subject: subject,
            to: email,
            body: body
        });

        return $http.post('https://test-api.javascript.ru/v1/dmitrii.baluyk/letters/', data)
    }

});

function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(state) {
        return (state.email.indexOf(lowercaseQuery) === 0);
    };

}