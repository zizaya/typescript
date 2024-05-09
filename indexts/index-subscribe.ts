interface I{
    once:(event:string,callback:Function)=>void //事件只触发一次
    on:(event:string,callback:Function)=>void //事件订阅
    off:(event:string,callback:Function)=>void //事件删除
    emit:(event:string,...args:any[])=>void //事件触发
    eventsArr:Map<string,Function[]> //Map<key,value>订阅的事件可能是多个，所以用数组
}

class Emitter implements I{
    eventsArr :Map<string,Function[]>//存放事件的map
    constructor(){
        this.eventsArr = new Map()
    }
    on(event:string,callback:Function){ //事件发布
        if(this.eventsArr.has(event)){
            let callbackLists = this.eventsArr.get(event)
            callbackLists && callbackLists.push(callback)
        }else{
            this.eventsArr.set(event,[callback])//没有则将事件存入map中，其中callback存入数组
        }
    }
    emit(event:string,...args:any[]){ //事件订阅
        if(this.eventsArr.has(event)){
            let callbacks = this.eventsArr.get(event)
            callbacks && callbacks.forEach((fn:Function)=>{
                fn(...args)
            });
        }
    }
    off(event:string,callback:Function){ //事件删除
        if(this.eventsArr.has(event)){
            let callbackLists = this.eventsArr.get(event)
            callbackLists && callbackLists.splice(callbackLists.indexOf(callback),1)
        }
    }
    once(event:string,callback:Function){ //事件只执行一次
        let cb = (...args:any[]) =>{
            callback(...args)
            this.off(event,cb)
        }
        this.on(event,cb)
    }
}

let e = new Emitter()
const fn = (...args:any[]) =>{
    console.log(args)
}
//e.on('hello',fn)
//e.off('hello',fn)

e.once('hello',fn)
e.emit('hello',1,2)
e.emit('hello',1,2)
e.emit('hello',1,2)