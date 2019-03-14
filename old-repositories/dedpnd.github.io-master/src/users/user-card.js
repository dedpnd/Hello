import app from './../app.js';
import toastr from 'toastr';

/**Карточки юзеров */
app.component("userCard", {
    templateUrl: "./users/user-card.tmpl.html",
    controller: function(userApi) {
        this.users = [];

        this.select_card = (user) => {
            user.selected = !user.selected;
        }

        this.check_photo = (condion_cb, boolean_photo) => {
            if (condion_cb) {
                return boolean_photo
            }
            return true
        }

        userApi.getUsers().then((data) => {
            this.users = data
        })

        this.remove_user = (id) => {
            _.remove(this.users, { "_id": id });
            userApi.removeUser(id).then(() => {
                toastr.success('User delete', 'Success');
            });
        }

    }
});

/**Аватар пользователя */
app.component("avatarCard", {
    bindings: {
        picture: '<'
    },
    template: '<img ng-src="{{$ctrl.picture}}" style="width: 100%;">',
    controller: function() {
        //Empty
    }
});

/**Отдельная карточка юзера */
app.component("aboutUser", {
    bindings: {
        user: '<'
    },
    templateUrl: './users/user_edit/user_edit.tmpl.html',

    controller: function(userApi) {
        this.email_pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        this.$onInit = function() {
            if (this.user) {
                userApi.getUser(this.user).then((data) => {
                    this.user_ = data;
                    this.user_.birthdate = new Date(this.user_.birthdate);
                })
            }
        }

        this.save = () => {
            let el = document.querySelectorAll('span.error');
            if (el.length > 0) {
                toastr.info('Please fill in the fields correctly', 'Information');
            } else {
                userApi.saveUser(this.user_).then((data) => {
                    toastr.info('User ' + data, 'Information');
                })
            }
        }
    }
});

app.service('userApi', function($http) {
    this.getUsers = () => {
        return $http.get('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/').then((data) => {
            return data.data
        });
    };

    this.getUser = (id) => {
        return $http.get('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/' + id).then((data) => {
            return data.data
        })
    }

    this.saveUser = (user) => {
        if (user._id) {
            let id = user._id || '';
            let data = JSON.stringify(user);

            return $http.patch('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/' + id, data).then(() => 'update');
        } else {
            let data = JSON.stringify(user);
            return $http.post('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/', data).then(() => 'create');;
        }
    }

    this.removeUser = (id) => {
        return $http.delete('https://test-api.javascript.ru/v1/dmitrii.baluyk/users/' + id)
    }
});