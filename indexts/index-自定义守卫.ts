//自定义守卫，语法：参数 is 类型，后面的函数返回true则参数就是这个类型
//作用，即使传入any参数，也可以让代码有对应的类型属性方法等提示，
const isString = (str:any):str is string => typeof str === 'string'
const isNum = (num:any):num is number => typeof num === 'number'
const isArr = (arr:any):arr is Array<any> => arr instanceof Array
const isObj = (obj:any):obj is object => Object.prototype.toString.call(obj) === '[object Object]'
const isFn = (fn:any):fn is Function =>typeof fn === 'function'


const testFn = (data:any) =>{
    if(isObj(data)){
        let val
        Object.keys(data).forEach(key=>{ //Object.keys(obj)不会遍历原型链属性
            val = (data as any)[key] 
            if(isNum(val)){
                (data as any)[key]  = val.toFixed(2) //num.toFixed(n)四舍五入取小数点n位
            }
            if(isString(val)){
                (data as any)[key]  = val.trim()
            }
            if(isFn(val)){
                //不能用val(),当函数独立调用（赋给变量，变量执行），浏览器下this会指向window，nodejs下指向undefined
                (data as any)[key]() 
            }
        })
    }
}

let obj = {
    a:100.22222,
    b:'    test    ',
    c:function(){
        console.log(this)
        return this.a
    }
}

testFn(obj) //{ a: '100.22', b: 'test', c: [Function: c] }