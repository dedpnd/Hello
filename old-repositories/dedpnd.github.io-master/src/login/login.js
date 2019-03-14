import app from './../app.js';
import toastr from 'toastr';
import './login.css';
import auth from './../authorization.js';

app.component('loginPage', {
    templateUrl: './login/login.tmpl.html',
    controller: function($location) {
        this.start_login = () => {
            if (auth.login(this.username, this.userpassword)) {
                $location.path('/')
            } else {
                toastr.warning('User does not exist', 'Warning');
                this.username = '';
                this.userpassword = '';
            }
        }
    }
})