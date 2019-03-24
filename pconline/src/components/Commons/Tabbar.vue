<template>
    <div id="tabbar">
        <ul>
            <li v-for="(item,key) in tabs" :key="key" @click="pushView(item)">
                {{item.title}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tabs: [
                {title:"首页",path: '/Home'},
                {title:"分类",path: '/Category'},
                {title:"我的",path: '/Profile'}
            ]
        }
    },
    methods: {
        pushView(item){
            if(item.path=="/Home"){
                var session = JSON.parse(sessionStorage.getItem("currentSession"));
                this.$router.push({path:session.path})
            }else{
                this.$router.push({path: item.path});  
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #tabbar {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 64px;
        background-color: rgba(200, 200, 200, .8);
        ul {
            display: flex;
            flex-direction: row;
            li {
                flex:1;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 64px;
            }
        }
    }
</style>
