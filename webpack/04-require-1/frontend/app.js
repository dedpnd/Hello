/**
 * Created by Balyuk-D on 15.03.2017.
 */

/*Убрать лишнию подгрузку из стороних библиотек*/
let moment = require('moment');
let today = moment(new Date()).locale("ru");
console.log(today.format("DD MMM YYYY"));

let moduleName = location.pathname.slice(1);
moduleName = moduleName.slice(0, moduleName.indexOf('.'));

/*bundle это для роутинга по ссылкам + динамическая загрузка*/
let context = require.context('bundle!./route', false);

/*
 // Посмотреть все ключи
 context.keys().forEach(function(path){
 let module = context(path);
 module();
 });
 */


let route;
try {
    route = context('./' + moduleName);
} catch (e) {
    alert("No module path");
}

if (route) {
    route(function (route) {
        route();
    });
}

/*Динамическая подгрузка при нажатие*/

let button1 = document.getElementById('mybutton'),
    button2 = document.getElementById('mybutton2');

try {
    button1.onclick = function () {

        require.ensure([], function (require) {
            let login = require('./login');
            login();
        }, 'auth') /*auth объеденяет все в один модуль*/
    };

    button2.onclick = function () {

        require.ensure([], function (require) {
            let logout = require('./logout');
            logout();
        }, 'auth')
    };
} catch (e) {
    alert("No button this page")
}

