import {Dictionary} from '../enum'
export interface Local{
    get:<T>(key:Key)=>void
    set:<T>(key:Key,value:T,expire:Expire)=>void
    remove:(key:Key)=>void
    clear:()=>void
}
export type Key = string
export type Expire = Dictionary.permanent | number
export interface Data<T>{
    value:T
    [Dictionary.expire]:Expire
}