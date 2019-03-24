<template>
  <div id="app">
    <router-view/>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
// import qs from 'qs'
import 'reset-css'
import Tabbar from '@/components/Commons/Tabbar'
export default {
  name: 'App',
  components: {
    Tabbar
  },
  created(){
      //get请求 
      // this.$http.get('http://localhost:3000/api/home?sectionId=99&pageNo=1&pageSize=20')
      // .then(function(responseData){
      //   console.log(responseData);
      // })
      // post请求
      // this.$http.post('http://localhost:3000/login',qs.stringify({
      //   password: '123',
      //   username: 'admin'
      // }))
      // .then(function(responseData){
      //   console.log(responseData);
      //   var username = responseData.data.username;
      //   window.alert(responseData.data.message);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // })
      // this.$http.post('http://localhost:3000/login', {
      //   firstName: 'Fred',
      //   lastName: 'Flintstone'
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
