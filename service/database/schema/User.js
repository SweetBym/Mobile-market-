const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建我们用户Schema
const  userSchema =  new Schema({
    userId: ObjectId,
    userName: {unique: true, type: String }, //用户名不重复
    password: String,
    createAt: {Type: Date, default: Date.now()},    //创建时间
    lastLoginAt: {Type: Date, default: Date.now()}   //最后的登录时间
});

//发布模型
mongoose.model('User',userSchema)