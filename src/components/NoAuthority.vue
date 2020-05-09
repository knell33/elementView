<template>
<h4>您不具备查看和操作该页面的权限，请联系管理员</h4>
</template>

<script>
 //获取登录用户名
import {
    getUserName,
    getQueryVariable
} from '../utility/User'
export default {
    data() {
        return {
            //登录用户名
            UserName: "",
        }
    },
    created: function(){
        this.GetUserName();
    },
    methods: {
        GetUserName() {
            this.UserName = getUserName("user", window.location.href);
            if(this.UserName != null){
                window.sessionStorage.setItem("user",this.UserName);
            } 
            // var aa = getQueryVariable("user");
            // window.sessionStorage.setItem("user",aa);

            //登录成功后实现路由重定向
            if(this.UserName != null){
                if(this.$route.query.redirect){
                    let rpath = this.$route.query.redirect;
                    this.$router.push({path: rpath});
                }else{
                    this.$router.push({path: '/index'});
                }
            }
        },
    }
}
</script>

<style scoped>
</style>