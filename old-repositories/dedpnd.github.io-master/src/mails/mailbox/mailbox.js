import app from './../../app.js';

/*Вывод почтовых ящиков*/
app.component('mailBoxes', {
    templateUrl: './mails/mailbox/mailbox.tmpl.html',
    controller: function(mailBoxesApi) {
        this.class_menu = ['profile', 'messages', 'settings'];
        this.mailboxes = '';

        mailBoxesApi.get_mailBoxes().then((data) => {
            this.mailboxes = data;
        })

    }
});

app.service('mailBoxesApi', function($http, lettersApi) {
    this.get_mailBoxes = () => {
        return $http.get('https://test-api.javascript.ru/v1/dmitrii.baluyk/mailboxes')
            .then((data) => {
                let res_arr = data.data
                res_arr.forEach((a, i) => {
                    lettersApi.getLetters(a._id).then((data) => {
                        res_arr[i].count = data.length;
                    })
                })
                return res_arr
            });
    }

    this.getMailBoxTitle = (id) => {
        return $http.get('https://test-api.javascript.ru/v1/dmitrii.baluyk/mailboxes/' + id)
            .then((data) => {
                return data.data
            })
    }
});