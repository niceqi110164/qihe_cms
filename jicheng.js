/**Created by xiaoqi on 2020/2/25*/

/**
    原型链继承和对象冒充继承
    对象冒充继承:没办法继承原型链上面的属性和方法
    原型链继承:可以继承构造函数里面以及原型链上面的属性和方法,实例化子类的时候没法给父类传参

function Person(name,age) {
    this.name = name;
    this.age = age;
    this.run = function(){
        console.log(`${this.name}-----${this.age}`);
    }
}

Person.prototype.work = function(){
    console.log('work')
};

function Web(name,age){
    Person.call(this,name,age)
}

Web.prototype = new Person();

let w = new Web('dsa',11);

w.run();
w.work();
* */
/**
class Person{
    //类的构造函数,实例化的时候执行,new的时候执行
    constructor(name,age){
        this._name = name;
        this._age = age;
    }
    getName(){
        console.log(this._name);
    }
    setName(name){
        this._name = name;
    }
}

Person.prototype.say = function(){
   console.log('这里是Perosn类原型上的方法');
};
//继承
class Web extends Person{
    constructor(name,age,sex){
        super(name,age);
        this._sex = sex;
    }

    print(){
        console.log(`${this._sex}======`)
    }
}

let w = new Web('ss',12,'d');

//w.print();
//w.getName()

w.say();
 */

// let p = new Person('vvvv',12);
// //p.getName();
//
// p.setName('xiaoming');
// p.getName()


//es6里面的静态方法
//
// class Person{
//     constructor(name){
//         this._name = name;
//     }
//     run(){
//         console.log(this._name);
//     }
//
//     static work(){
//         console.log('这是es6里面的静态方法')
//     }
// }
//
// Person.instance = '这是一个静态方法的属性';
//
// let p = new Person('张三');
// p.run();
// Person.work();













