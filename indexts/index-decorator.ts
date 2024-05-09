import axios from 'axios'
import 'reflect-metadata' //存储和获取元数据
//类装饰器
const ClassD:ClassDecorator = (target) =>{
    target.prototype.des = 'iamadescriptor'
    
}
//方法装饰器+传参
const GetD = (url:string) =>{
    const fn:MethodDecorator = (target,key,descriptor:PropertyDescriptor) =>{
        axios.get(url).then(res=>{
            const k = Reflect.getMetadata('k',target)
           // console.log(k)//result
            descriptor.value(k?res.data[k]:res.data)//减少多一层result的书写
        })
    }
    return fn
}
//参数装饰器
const ResultD:ParameterDecorator = (target,key,index)=>{
    //data.result,将result字符串存入
    Reflect.defineMetadata('k','result',target)
}
//属性装饰器(用的较少)
const NameD:PropertyDecorator = (target,key) =>{
    console.log(target,key) //{} name
}

//装饰器要在使用之前定义，并且打开tsconfig.json的两个配置
@ClassD //类装饰器
class Person{
    @NameD //属性装饰器
    public name
    constructor(name:string){
        this.name = name
    }
    @GetD('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10') //方法装饰器
    getName(@ResultD data:any){ //参数装饰器
       // console.log(data) //data.result
    }
}

let p = new Person('rr') as any //没定义接口就断言any
//console.log(p.des)//iamadescriptor