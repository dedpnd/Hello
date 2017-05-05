/**
 * Created by Balyuk-D on 28.04.2017.
 */
/**
 * Created by Balyuk-D on 26.04.2017.
 */
var _ = require("lodash"),
    async = require("async");

/*13_Task*/
/*

function get_random_integer(min, max){
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand
}

class Electrostation{
    constructor(){
        this.kwat = get_random_integer(1,100);
    }

    sum_get_day(){
        return this.kwat
    }
}

class Sun_panel{
    constructor(){
        const CHARGE_NIGHT = 0;
        const SUN_PANEL= new Array(get_random_integer(0,50));
        this.charge_panels = _.map(SUN_PANEL,(a)=>{
            return get_random_integer(1,5)
        })
    }

    sum_get_day(){
        return this.charge_panels.reduce((a,b)=>{
            return a+b
        }, 0)
    }

}

class House{
    constructor(){
        const CHARGE_DAY = 4;
        const CHARGE_NIGHT = 1;

        this.room = get_random_integer(1,400);
        this.charge_day = this.room * CHARGE_DAY;
        this.charge_night = this.room * CHARGE_NIGHT;
    }

    sum_charge_day(){
        return this.charge_day + this.charge_night
    }
}

class Electro_line{
    constructor(){
        const KWAT = get_random_integer(1,1000);
        const COST_ONE_KWAT = get_random_integer(10,50);

        this.cost = COST_ONE_KWAT;
        this.max_kwat = KWAT;
    }
}

class Electroweb{
    constructor(){
        this.electrostations = _.map((new Array(get_random_integer(1,10))),()=>{
            return new Electrostation();
        });
        this.sun_panels = _.map((new Array(get_random_integer(1,50))),()=>{
            return new Sun_panel();
        });
        this.houses = _.map((new Array(get_random_integer(1,10))),()=>{
            return new House();
        });
        this.elect_lines = _.map((new Array(get_random_integer(1,10))), ()=>{
            return new Electro_line();
        });

        this.houses_charge = 0;
        for(let i=0; i<this.houses.length; i++){
            this.houses_charge += this.houses[i].sum_charge_day()
        }

        this.max_charge = 0;
        for(let i=0; i<this.electrostations.length; i++){
            this.max_charge += this.electrostations[i].sum_get_day()
        }

        for(let i=0; i<this.sun_panels.length; i++){
            this.max_charge += this.sun_panels[i].sum_get_day()
        }
    }

    calc_profit(){
        var profit_kwat = this.max_charge - this.houses_charge,
            profit_money = 0,
            i = 0,
            status = null;

        if(profit_kwat > 0 ){
            do{
                if(profit_kwat<0) return {status, profit_money}
                profit_kwat = profit_kwat - this.elect_lines[i].max_kwat;
                profit_money = profit_money + this.elect_lines[i].max_kwat * this.elect_lines[i].cost

                status = 1
                i++;
            }while (i != this.elect_lines.length );
        } else {
            do{
                if(profit_kwat>0) return {status, profit_money}
                profit_kwat = profit_kwat + this.elect_lines[i].max_kwat;
                profit_money = profit_money + this.elect_lines[i].max_kwat * this.elect_lines[i].cost

                status = -1
                i++;
            }while (i != this.elect_lines.length );
        }

        return {status, profit_money}
    }
}

var a = new Electroweb();
console.log("Потреблено: " + a.houses_charge);
console.log("Выработано: " + a.max_charge);
var b  = a.calc_profit();
console.log((b.status>0 ? 'Заработано: ' : 'Потрачено: ') +  b.profit_money);
*/
/*
console.log("Выработано в день: " + a.charge_max());
console.log("Общий расход: " + a.houses_charge());
a.elect_line_max();
*/
/*async.reduce([1,2,3], 0, function(memo, item, callback) {
    // pointless async:
    process.nextTick(function() {
        callback(null, memo + item)
    });
}, function(err, result) {
    console.log(result)
});*/

/*12_Task*/
/*
 /!*12_Task*!/
 const hamburger_size = [
 {"name" : "smal", "cost" : 50, "kal" : 20},
 {"name" : "big", "cost" : 100, "kal" : 40}
 ],
 hamburger_main = [
 {"name" : "chease", "cost" : 10, "kal" : 20},
 {"name" : "salad", "cost" : 20, "kal" : 5},
 {"name" : "potato", "cost" : 15, "kal" : 10}
 ],
 hamburger_topping = [
 {"name" : "paprika", "cost" : 15, "kal" : 0},
 {"name" : "mazik", "cost" : 20, "kal" : 5}
 ];

 function UserException(message, value){
 this.message = message;
 this.value = value;
 }

 function Hamburger(size, main){
 var arr_size = _.map(hamburger_size,'name');
 var arr_main = _.map(hamburger_main,'name');

 try{
 if(arr_size.indexOf(size)==-1){
 throw new UserException("Error size",size);
 } else if(arr_main.indexOf(main)==-1){
 throw new UserException("Error stuff",main);
 }

 this.size = size;
 this.main = main;
 this.topping = [];

 } catch (e){
 console.log(e.message + ": " + e.value)
 }
 }

 Hamburger.prototype.addTopping = function(topping){
 var arr_topping = _.map(hamburger_topping,"name");

 try{
 if(arr_topping.indexOf(topping)==-1){
 throw new UserException("Error topping",topping);
 } else if(this.topping.indexOf(topping) >= 0){
 throw new UserException("Topping exist",topping);
 }

 this.topping.push(topping);

 } catch(e){
 console.log(e.message + ": " + e.value)
 }
 }

 Hamburger.prototype.removeTopping = function(topping){
 _.remove(this.topping,(a)=>{
 return a==topping
 });
 }

 Hamburger.prototype.getToping = function(){
 console.log(this.topping);
 }

 Hamburger.prototype.calculateKal = function(){
 console.log(calcProperty.call(this,'kal'));
 }

 Hamburger.prototype.calculateCost = function(){
 console.log(calcProperty.call(this,'cost'));
 };

 function calcProperty(name){
 var self = this,
 size = _.compact(hamburger_size.map((a)=>{
 if(a.name==self.size){
 return a[name]
 }
 return false
 })),
 stuff = _.compact(hamburger_main.map((a)=>{
 if(a.name==self.main){
 return a[name]
 }
 return false
 })),
 topping = _.compact(hamburger_topping.map((a)=>{
 if(self.topping.indexOf(a.name) != -1){
 return a[name]
 }
 return false
 })),
 summ = _.concat(size,stuff,topping).reduce(function(a,b){
 return a + b
 })

 return summ
 }

 var zakaz_one = new Hamburger("smal","chease");
 zakaz_one.addTopping("mazik");
 zakaz_one.calculateKal();
 zakaz_one.calculateCost();
 zakaz_one.addTopping("paprika");
 console.log(zakaz_one.size=="big")
 zakaz_one.calculateCost();
 zakaz_one.removeTopping("paprika");*/

/*11_Task*/
/*var city = [
 {"name" : "Tokyo", "citezen" : 1264796},
 {"name" : "Saint_P", "citezen" : 1262296},
 {"name" : "Makaka", "citezen" : 1211796},
 {"name" : "Ofnbv", "citezen" : 14796},
 {"name" : "Uvjds", "citezen" : 122396},
 {"name" : "SDWE", "citezen" : 1264596},
 {"name" : "SDSD", "citezen" : 55664796},
 {"name" : "ZCVS", "citezen" : 664796},
 {"name" : "WWEQ", "citezen" : 4464796},
 {"name" : "FFFF", "citezen" : 1554796}
 ]

 city.sort(function(a, b){
 return a.citezen < b.citezen;
 });

 console.log(city)*/

/*10_Task*/
/*var a = { a: 1, b: 2 };
 console.log(count(a)); // 2
 var b = function () {};
 console.log(count(b)); // 0
 var c = [1, 2, 3];
 console.log(count(c)); // 3
 var d = [];
 d[100] = 1;
 console.log(count(d)); // 1

 function count(obj){
 let i=0;
 for(var key in obj){
 i++;
 }

 return i
 }*/

/*Nine_Task*/
/*var input = [1, 2, 3, 4, 5, 6];
 function isEven(x) { return x % 2 == 0; } // проверяет на четность
 console.log(filter(input, isEven)); // [2, 4, 6]

 function filter(arr, fn){
 var r_arr = [];

 arr.forEach((a)=>{
 if(fn(a)){
 r_arr.push(a);
 }
 })

 return r_arr
 }*/

/*Eight_Task*/
/*var characters = [
 { 'name': 'barney', 'age': 36 },
 { 'name': 'fred', 'age': 40 }
 ];

 console.log(pluck(characters, 'name')); // ['barney', 'fred']

 function pluck(obj, key){
 var result_arr = [];

 for(let i=0; i<obj.length; i++){
 result_arr.push(obj[i][key]);
 }

 return result_arr;
 }*/

/*Seven_Task*/
/*window.x = 1;
 var ctx = { x: 2 };

 function testThis(a) { console.log("x=" + this.x + ", a=" + a); }
 testThis(100); // x=1, a=100

 var boundFunction = bind(testThis, ctx);
 boundFunction(100); // x=2, a= 100

 function bind(th, a){
 return function(){
 th.apply(a,arguments);
 }
 }*/

/*Six_Task*/
/*
 function test(a, b, c) { return 'a=' + a + ',b=' + b + ',c=' + c; }
 var test1_3 = partialAny(test, undefined, undefined, 3);
 console.log(test1_3(5,2)); // a=1,b=5,c=3
 */

/*Five_Task - TODO: four_task*/
function partialAny(){
    arguments.slice = [].slice;
    var main_arg = arguments.slice(1),
        result_Arr = [],
        fn = arguments.slice(0,1)[0];

    return function () {
        var j = 0;
        result_Arr = [];
        for(let i=0; i<arguments.length;i++){
            result_Arr.push(arguments[i]);
        }

        for(let i=0;i<main_arg.length;i++){
            if(main_arg[i]==undefined){
                main_arg[i]=result_Arr[j]
                j++
            }
        }
        //console.log(main_arg)
        return fn.apply(this,main_arg.concat(result_Arr))
    }
}

/*function add(a, b) { return a + b; }
 function mult(a, b, c, d) { return a * b * c * d; }

 var add5 = partial(add, 5);

 /!*console.log(add5(2)); // 7
 console.log(add5(10)); // 15
 console.log(add5(8)); // 13*!/

 var mult23 = partial(mult, 2, 3);

 /!*console.log(mult23(4, 5)); // 2*3*4*5 = 120
 console.log(mult23(1, 1)); // 2*3*1*1 = 6*!/

 function f1(a,b,c,d){
 return a+b+c+d
 }

 var f2 = partial(f1,1,2);

 console.log(f2(1,2));*/

/*Four_Task*/
/*function fmap(a, gen){
 var result = 0,
 sum=0;

 return (...args)=>{
 for (let i=0; i<args.length ;i++){
 sum = gen(sum,args[i]);
 }
 result = sum || gen();
 sum=0;

 return a(result)
 }
 }

 var gen = sequence(1, 1);
 function square(x) { return x * x; }
 var squareGen = fmap(square, gen);

 console.log(squareGen()); // 1
 console.log(squareGen()); // 4
 console.log(squareGen()); // 9
 console.log(squareGen()); // 16

 function add(a, b) {
 return a + b
 }

 var squareAdd = fmap(square, add);
 console.log(squareAdd(2, 3)); // 25 = (2 + 3) ^ 2
 console.log(squareAdd(5, 7)); // 144 = (5 + 7) ^ 2*/

/*function fmap(a, gen){
 var result = 0;

 return (...args)=>{
 //console.log()
 result = gen(args);
 return a(result)
 }
 }

 var gen = sequence(1, 1);
 function square(x) { return x * x; }
 var squareGen = fmap(square, gen);

 console.log(squareGen()); // 1
 console.log(squareGen()); // 4
 console.log(squareGen()); // 9
 console.log(squareGen()); // 16

 function add(a) {
 var result = 0;

 for(let i = 0; i<a.length;i++){
 result += a[i];
 }

 return result
 }

 var squareAdd = fmap(square, add);
 console.log(squareAdd(2, 3)); // 25 = (2 + 3) ^ 2
 console.log(squareAdd(5, 7)); // 144 = (5 + 7) ^ 2*/

/*Three_Task*/
/*function square(x) { return x * x; } // возведение в квадрат
 console.log(map(square, [1, 2, 3, 4])); // [1, 4, 9, 16]
 console.log(map(square, [])); // []*/

/*function map (fn, arr){
 var result_arr = [];

 for(let i=0; i<arr.length; i++){
 result_arr.push(fn(arr[i]));
 }

 return result_arr
 }

 function square(x) { return x * x; }
 console.log(map(square, [1, 2, 3, 4]));
 console.log(map(square, []));*/

/*Second_Task*/
/*var gen2 = sequence(0, 2);
 console.log(take(gen2, 5)); // [0, 2, 4, 6, 8 ]*/

/*function take(fn, count){
 var result_arr = [];
 // console.log(fn.toString())
 for(let i=0; i<count; i++){
 result_arr.push(fn());
 }

 return result_arr
 }


 var gen2 = sequence(0, 2);
 console.log(take(gen2, 5));*/

/*First_Task*/
/*
 var generator = sequence(10, 3);
 var generator2 = sequence(7, 1);

 console.log(generator()); // 10
 console.log(generator()); // 13

 console.log(generator2()); // 7

 console.log(generator()); // 16

 console.log(generator2()); // 8
 * */

function sequence(start, step){
    var a = start || 0,
        b = step || 1,
        result = 0,
        flag = false;

    return ()=>{
        if(flag){
            result = result + b;
        } else {
            result = a;
        }

        flag = 1;
        return result
    }
}

/*
 var generator = sequence(10, 3);
 var generator2 = sequence(7, 1);
 console.log(generator());
 console.log(generator());
 console.log(generator2());
 console.log(generator2());*/
