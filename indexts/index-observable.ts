let list:Set<Function> = new Set() //事件储存

let eventsListRun = (cb:Function)=>{ //事件推入函数
    if(!list.has(cb)){
        list.add(cb)
    }
}

let observable = <T extends object>(params:T) =>{  //观察者函数
    return new Proxy(params,{
        set(target,key,value,receiver){  
            list.forEach(fn => fn())  //当数值变化时，执行所有函数，相当于通知所有订阅者
            return Reflect.set(target,key,value,receiver)
        }
    })
}

let person = {name:'rr',age:18}
let personProxy = observable(person)

eventsListRun(()=>{ //订阅，推入事件
    console.log('值变化了')
})

personProxy.age = 10 //改代理的属性才会触发，person.age不会触发代理

