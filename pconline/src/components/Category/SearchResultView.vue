<template>
    <div id="searchResult">
        <div class="searchResultHead">
            <i class="fa fa-chevron-left backArrow" @click="$router.go(-1)"></i>
            <div class="searchInput">
                <i class="fa fa-search"></i>
                <input type="search" placeholder="搜索内容">
            </div>            
        </div>
         <ul class="searchSectionBar">
            <li v-for="(item,key) in searchSectionResults" :key="key">
                {{item.name}}
            </li>
        </ul>
        <div class="topics">
            <goods-list :goodsList="goodsList"></goods-list>
        </div>
    </div>
</template>

<script>
import GoodsList from '@/components/Home/GoodsList'
export default {
    data(){
        return {
            searchSectionResults: [],
            goodsList: [],
        }
    },
    components: {
        GoodsList
    },
    methods: {
        reloadWindow(){
            alert("页面刷新");
        }
    },
    created(){
        console.log("组件重建");
        if(this.$route.params.response){
            console.log("路由没有带参数过来");
            var response = this.$route.params.response.data.data;
            this.searchSectionResults = response.searchSectionResults;
            this.goodsList = response.topics;
        }else{
            console.log("自己发起请求");
            var searchValue = localStorage.getItem("searchValue");
             var searchURL = 'http://localhost:3000/api/search?searchValue='+searchValue
            var _this = this;
            console.log(_this);
            this.$http.get(searchURL)
           .then(function(response){
                _this.searchSectionResults = response.data.data.searchSectionResults;
                _this.goodsList = response.data.data.topics;
                console.log(_this.searchSectionResults);
                console.log(_this.goodsList);
            })
        }
        // 先存储到本地,再从本地获取

    }
}
</script>

<style lang="scss" scoped>
    #searchResult {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        background: rgb(211, 210, 210);
        overflow: scroll;
        .searchResultHead {
            width: 100%;
            height: 44px;
            display: flex;
            flex-direction: row;
             position: fixed;
             background: white;
             z-index: 3;
            .backArrow {
                width: 10%;
                height: 100%;
                font-size: 20px;
                color: lightgray;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .searchInput {
               width: 90%;
               height: 100%;
               position: absolute;
               left: 40px;
                i {
                    position: absolute;
                    top: 15px;
                    z-index: 2;
                }
                input {
                    border: none;
                    width: 100%;
                    height: 100%;
                    border-radius:15px;
                    box-sizing: border-box;
                    padding-left: 20px;
                }
            }
        }
        .searchSectionBar{
            position: fixed;
            top: 45px;
            width: 100%;
            height: 44px;
            display: flex;
            flex-direction: row;
            background: white;
            z-index: 3;

            li {
                flex: 1;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .topics{
            position: absolute;
            top: 90px;
            background: white;
        }
    }
</style>
