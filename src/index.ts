import {Local,Key,Expire,Data} from './type'
import { Dictionary } from './enum'
class Storage implements Local{
    get<T>(key:Key){
        let value = localStorage.getItem(key)
        if(value){
            const data:Data<T> = JSON.parse(value)
            let now = new Date().getTime()
            if(typeof data[Dictionary.expire] == 'number' && data[Dictionary.expire] < now){
                this.remove(key)
                return{
                    message:'值失效',
                    value:null
                }
            }else{
                return{
                    message:'成功',
                    value:data
                }
            }
        }else{
            return {
                message:'没有值',
                value:null
            }
        }
    }
    set<T>(key:Key,value:T,expire:Expire){
        let data ={
            value,
            [Dictionary.expire]:expire
            
        }
        localStorage.setItem(key,JSON.stringify(data))
    }
    remove(key:Key){
        localStorage.removeItem(key)
    }
    clear(){
        localStorage.clear()
    }
}

let ls = new Storage()
ls.set('A',123,new Date().getTime()+5000)

setInterval(()=>{
    console.log(ls.get('A'))
},500)