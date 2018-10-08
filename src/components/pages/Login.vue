<template>
  <div>
       <van-nav-bar  title="用户登录" left-text="返回" left-arrow @click-left="onClickLeft"/>
       <div  class="login-panel">  

                 <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"                  
                    placeholder="请输入用户名"                   
                   />               
                 <van-field                 
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"                   
                    required/>            
            <div class="login-button">
               <van-button type="primary" size="large" @click="LoginAction">登录</van-button>
            </div>
      </div>
 

  </div>
</template>

<script >
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      //返回前一页
      this.$router.go(-1);
    },

    LoginAction(){

    }
  }
};
</script>

<style scoped >

  .login-panel{
        width:95%;
        border-radius: 5px;
        margin: 1.5rem auto;
        padding-bottom: 2rem;
    }
    .login-button{
        padding-top: .8rem;
    }
</style>
