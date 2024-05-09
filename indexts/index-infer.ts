/* type PromiseType<T> = T extends Promise<infer U> ? U : T

type promise = Promise<User>

interface User{
    name:string
    age:number
}

type test = PromiseType<promise> */
/* 
type FunctionType<T> = T extends {a:(x:infer U)=>void,b:(y:infer U)=>void} ? U:never

type Test = FunctionType< {a:(x:number)=>void,b:(y:string)=>void }> */
/* 
type Arr = ['a','b','c']

type One<T extends any[]> = T extends [infer one ,...any[]]?one :T
type A = One<Arr>

type Last<T extends any[]> = T extends [...any[],infer last]?last :T
type C = Last<Arr>

type Pop<T extends any[]> = T extends [unknown ,...infer Rest]?Rest :T
type P = Pop<Arr>

type Shift<T extends any[]> = T extends [...infer Rest,unknown]?Rest :T
type S = Shift<Arr> */

type Arr = [1,2,3,4,5]

type Last<T extends any[]> = T extends [...infer Rest,infer last]?[last,...Last<Rest>] :[]

type C = Last<Arr>