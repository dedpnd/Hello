/**
 * Created by Balyuk-D on 17.03.2017.
 */

/*Это для экстернал*/
//let _ = require("lodash");

let users = [
    {id: "abcd", name: "Vasya"},
    {id: "defa", name: "Petya"},
    {id: "erwq", name: "Masha"}
];

console.log(_.map(users, 'name'));

let work = require('old');
work();