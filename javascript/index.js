/**
 * Created by Administrator on 2015/12/22 0022.
 */
/*console.log("hello js!");
var a = 1;
var b = 2;
var c = a + b;
console.log(c);*/

function A(){  //一个类

    //函数的闭包，动态添加属性
    this.sayHehe = function(){
        console.log("hehe mbb");
    }

}
//继承的方法
function B(){

}
B.prototype = new A();

A.prototype.sayHello = function(){  //成员方法
    console.log("hello js");
}

A.sayHi = function(){  //静态的方法，直接附加
    console.log("hello mbb");
}

var a = new A();  //创建一个新的A的实例
//a.sayHello();  //实例的方法
//A.sayHi();    //静态的方法
var b = new B();
b.sayHello();
b.sayHehe();