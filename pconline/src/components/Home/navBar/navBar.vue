<template>
    <div id="navBar">
        <ul>
            <li v-for="(item,key) in navList" :key="key"
             @click="pushView(item,key)" 
             :style="currentSelected==key?selectedStyle:defaultStyle"
             >
                {{item.title}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            navList: [
                {title: "精选",path: '/Home/JingXuan'},
                {title: "优惠",path: '/Home/YouHui'},
                {title: "海淘",path: '/Home/HaiTao'},
                {title: "发现",path: '/Home/FaXian'},
                {title: "原创",path: '/Home/YuanChuang'}
            ],
            selectedStyle: {
                color: "red"
            },
            defaultStyle: {
                color: "black"
            }
        }
    },
    computed: {
        currentSelected(){
            return this.$store.state.currentSelected;
        }
    },
    methods: {
        pushView(item,key){
            if(sessionStorage){
                /*
                    获取当前点击的信息,包括选择的下标,选择的路径
                    将这些信息存储到本地,sessionStorage
                */ 
                var currentSession = JSON.stringify({currentSelected:key,path:item.path})
                sessionStorage.setItem("currentSession",currentSession)
            }
            // 当点击的时候,更新vuex里的选中状态
            this.$store.commit("CHANGESELECTED",{currentSelected:key,path:item.path});
            this.$router.push({path: item.path});
        }
    }
}
</script>
<style lang="scss" scoped>
   #navBar {
        width: 100%;
        height: 44px;
        background: rgb(231, 231, 231);
        ul {
            display: flex;
            flex-direction: row;
            li {
                flex:1;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 44px;
            }
        }
    }
</style>
