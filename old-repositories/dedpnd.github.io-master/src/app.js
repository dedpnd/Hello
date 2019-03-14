import './../node_modules/toastr/build/toastr.css';
import './../node_modules/angular-material/angular-material.css';
import './app.css';
import './mails/mails.css';
import 'bootstrap';
import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import auth from './authorization.js';

let app = angular.module("mailApp", ['ui.router', 'ngMaterial']);;

app.config(($stateProvider, $urlRouterProvider) => {

    $stateProvider.state({
        name: 'login',
        url: '/login',
        template: '<login-page></login-page>'
    });

    $stateProvider.state({
        name: 'inbox',
        url: '/',
        template: '<mail-box></mail-box>'
    });

    $stateProvider.state({
        name: 'box',
        url: '/:mailBoxId',
        template: '<mail-box box="$ctrl.mailBoxId"></mail-box>',
        controller: function($stateParams) {
            this.mailBoxId = $stateParams.mailBoxId;
        },
        controllerAs: '$ctrl'
    });

    $stateProvider.state({
        name: 'single_mail',
        url: '/mail/:mailId',
        template: '<single-mail mailid="$ctrl.mailid"></single-mail>',
        controller: function($stateParams) {
            this.mailid = $stateParams.mailId;
        },
        controllerAs: '$ctrl'
    });

    $stateProvider.state({
        name: 'new_letter',
        url: '/new_letter',
        template: '<new-letter></new-letter>'
    })

    $stateProvider.state({
        name: 'users',
        url: '/users',
        template: '<user-card></user-card>'
    });

    $stateProvider.state({
        name: 'about',
        url: '/user/:userId',
        template: '<about-user user="$ctrl.userId"></about-user>',
        controller: function($stateParams) {
            this.userId = $stateParams.userId;
        },
        controllerAs: '$ctrl'
    });

    $stateProvider.state({
        name: 'new_user',
        url: '/new_user',
        template: '<about-user></about-user>'
    });

    $urlRouterProvider.otherwise("/");
})

app.run(function($rootScope, $state) {
    $rootScope.$on('$locationChangeSuccess', function(event, toState) {
        if (toState !== 'login' && !auth.islogin()) {
            event.preventDefault();
            $state.go('login');
        }
    })
})


/*--------------------------------------------SERVICE-------------------------------------------------------------------*/

/*-----------------------------------------------//-------------------------------------------------------------------*/

export default app;

/*Other functions*/

function randomId() {
    return String.fromCharCode(randomInteger(1, 10000)) + randomInteger(1, 20);
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}