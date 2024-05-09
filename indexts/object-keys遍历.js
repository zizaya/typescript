class A{
    constructor(){
        this.name = 'man'
    }
    getName(){

    }
}

class B extends A{
    constructor(){
        super()
        this.age = 18
    }
    getAge(){

    }
    [Symbol(1)](){

    }
}
B.prototype.hello = function(){
    
}

let b = new B()
console.log(b) //B { name: 'man', age: 18 }
console.log(B.prototype)//A { hello: [Function (anonymous)] }

//for..in 自身和原型链上可枚举的属性,得不到symbol
for(let i in b){
    console.log(i) //name,age,hello
}
for(let i in B.prototype){
    console.log(i) //hello
}

//Object.keys() Object.entries() 自身可枚举，得不到原型链上的。得不到symbol
console.log(Object.keys(b)) //[ 'name', 'age' ]
console.log(Object.entries(b)) //[ [ 'name', 'man' ], [ 'age', 18 ] ]

console.log(Object.keys(B.prototype)) //[ 'hello' ]
console.log(Object.entries(B.prototype)) //[ [ 'hello', [Function (anonymous)] ] ]

//Object.getOwnPropertyNames 自身可枚举和不可枚举，得不到原型链，得不到symbol
console.log(Object.getOwnPropertyNames(b)) //[ 'name', 'age' ]
console.log(Object.getOwnPropertyNames(B.prototype)) //[ 'constructor', 'getAge', 'hello' ]

//Object.getOwnPropertySymbols 自身symbol包括不可枚举的
console.log(Object.getOwnPropertySymbols(b)) //[]
console.log(Object.getOwnPropertySymbols(B.prototype)) //[ Symbol(1) ]

//Reflect.ownKeys() 自身的所有属性，可枚举不可枚举symbol都有，没有原型链上的
console.log(Reflect.ownKeys(b))//[ 'name', 'age' ]
console.log(Reflect.ownKeys(B.prototype))//[ 'constructor', 'getAge', 'hello', Symbol(1) ]

//通过class语法糖添加的属性和方法是不可枚举的
console.log(Object.getOwnPropertyDescriptor(B.prototype,'getAge'))
/* {
    value: [Function: getAge],
    writable: true,
    enumerable: false,
    configurable: true
  } */
//通过B.prototype添加的属性和方法是可枚举的
console.log(Object.getOwnPropertyDescriptor(B.prototype,'hello'))
/* {
    value: [Function (anonymous)],
    writable: true,
    enumerable: true,
    configurable: true
  } */
