/* interface Person{
    name:string
    age:number
    sex:string
}
//Partical
//type ParticalPerson = Partial<Person>
type CustomPartical<T> = {
    [k in keyof T]?:T[k]
} 
type ParticalPerson = CustomPartical<Person>

//Required
//type RequiredPerson = Required<Person>
type CustomRequired<T> = {
    [k in keyof T]-?:T[k]
}
type RequiredPerson = CustomRequired<Person>

//Pick
//type PickPerson = Pick<Person,'name'|'age'>
type CustomPick<T,K extends keyof T> = {
    [k in K]:T[k]
}
type PickPerson = CustomPick<Person,'name'|'age'>

//Exclude
//type ExcludePerson = Exclude<keyof Person , 'sex'>
type CustomExclude<T,K> = T extends K ? never : T
type ExcludePerson = CustomExclude<keyof Person , 'sex'>

//Omit
//type OmitPerson = Omit<Person , 'sex'>
type CustomOmit<T, K extends keyof T> =  Pick<T,Exclude<keyof T,K>>
type OmitPerson = CustomOmit<Person , 'sex'> */

type key = 'a' | 'b' | 'c'
type value = 'A' | 'B' | 'C'

/* let objj:Record<key,value> ={
    a:'A',
    b:'A',
    c:'A'
} */

type CustomRecord<K extends keyof any,V> ={
    [key in K]:V
}

let objj:CustomRecord<key,value> ={
    a:'A',
    b:'A',
    c:'A'
}

const fnn1 = () => [1,2,3]
const fnn2 = () => [1,2,3,'h']
const fnn3 = () => true

type ReturnTypeFnn1 = ReturnType<typeof fnn1>
type ReturnTypeFnn2 = ReturnType<typeof fnn2>
type ReturnTypeFnn3 = ReturnType<typeof fnn3>

type CustomRetureType<T> = T extends (...args:any[]) => infer U ? U : T
type CustomReturnTypeFnn1 = CustomRetureType<typeof fnn1>

