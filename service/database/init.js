

const mongoose =  require('mongoose')

//数据库路径,此处写成我们本地
const db = 'mongodb://localhost/simle-db'

const glob =  require('glob')

//相对路径转变为绝对路径
const {resolve} =  require('path')

exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

//将该接口暴露出去

exports.connect = ()=>{
    //链接数据库
    mongoose.connect(db,{ useNewUrlParser: true })
    let maxConnectionTimes = 0;

    return new Promise((resolve,reject)=>{
        //下面添加数据库一些监听事件
    
        mongoose.connection.on('disconnected',()=>{
           console.log('*********数据库断开')
           //重新链接, 因为不能无限链接 ，此处做个判断，若链接三次都还没有成功，那么直接抛出异常
           if(maxConnectionTimes<=3){
               maxConnectionTimes++ ;
               mongoose.connect(db,{ useNewUrlParser: true })
           }else{
               reject();
               throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
           }
         
        })

        mongoose.connection.on('error',()=>{
           console.log('*********数据库出错')
           //重新链接
           if(maxConnectionTimes<=3){
               maxConnectionTimes++ ;
               mongoose.connect(db,{ useNewUrlParser: true })
            }else{
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
        }
        })

        //链接成功执行的操作
        mongoose.connection.once('open',()=>{
            console.log('MongoDB  connected successfully!!!')
            resolve()
        })


    })
    
}