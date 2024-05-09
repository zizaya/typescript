const path = require('path')
const {Configuration} = require('webpack')
/**
 * @type {Configuration}
 */
module.exports = {
    mode:'development',
    entry:'./src/index.ts',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        clean:true
    },
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:{
                    loader:"ts-loader"
                }
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            }
        ]
        
    },
    resolve:{
        extensions:[".ts",".js"]
    }
}