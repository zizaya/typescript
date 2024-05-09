declare module 'express'{
    
    
    interface Express{
        ():App
        Router():Router
    }
    interface App{
        use(url:string,router:any):void
        listen(port:number,cb?:()=>void):void
    }
    interface Router{
        get(url:string,cb:(req:any,res:any)=>void):void
    }
    const express:Express
    export default  express
}