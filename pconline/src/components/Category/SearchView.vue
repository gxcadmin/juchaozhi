<template>
    <div id="SearchView">
        
        <div class="searchViewHead">
            <i class="fa fa-search"></i>
            <input type="text" placeholder="想买什么搜什么" 
                autofocus @keyup.13="search" 
                v-model="searchValue">
            <span @click="cancelSearch">取消</span>
        </div>
        <!-- 判断历史记录是否为空 -->
        <ul v-if="searchHistory.length" class="searchHistory">
            <!-- 遍历搜索的历史记录信息
            searchByHistory(): 点击每一行历史记录,根据每一行的记录搜索响应数据
             -->        
            <li v-for="(item,key) in searchHistory" :key="key" @click="searchByHistory(item)">
                {{item}} 
                <!-- 添加一个删除按钮 
                    deleteHistory(): 删除指定行的数据
                 -->
                <i class="fa fa-times-circle-o" style="color:lightgray" @click.stop="deleteHistory(key)"></i>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            searchValue: '',
            searchHistory: []
        }
    },
    methods: {
        cancelSearch(){
            this.$router.go(-1);
        },
        /**
         * 通过点击搜索的历史记录,进行搜索
         */
        searchByHistory(searchValue){
            // 搜索的URL,基础地址+历史记录中的值
            var searchURL = 'http://localhost:3000/api/search?searchValue='+searchValue
            // 将this指向的地址存储到_this
            var _this = this;
            // 发起搜索请求
            this.$http.get(searchURL)
           .then(function(response){
            //    response是搜索结果
            // 将本次搜索的记录存储到localstorage的searchValue属性中,以便
            // 在搜索结果的页面刷新的时候,可以直接在搜索结果页面,获取搜索的值,然后
            //重新再搜索结果页面发起 搜索请求,避免,搜索结果的页面空白.导致客户体验变差
               localStorage.setItem("searchValue",searchValue);
            // 跳转到搜索结果页面,并将请求到数据通过路由传递到结果页面   
               _this.$router.push({name:'SearchResultView',params:{response:response}})
           })
        },
        search(){
            // 搜索
            // console.log(this.searchValue);
            //存储搜索历史记录
            /*
                1.判断localStorage里是否有记录,如果没有记录,则往该对象里填写内容
                ["创新","耐克"]
            */
            // 当在输入框输入内容并回车的时候,触发search函数
           var searchURL = 'http://localhost:3000/api/search?searchValue='+this.searchValue
            var _this = this;
            // 发起请求
            this.$http.get(searchURL)
           .then(function(response){
            //    response是搜索结果
            // 将本次搜索的记录存储到localstorage的searchValue属性中,以便
            // 在搜索结果的页面刷新的时候,可以直接在搜索结果页面,获取搜索的值,然后
            //重新再搜索结果页面发起 搜索请求,避免,搜索结果的页面空白.导致客户体验变差
                localStorage.setItem("searchValue",_this.searchValue);
            // 跳转到搜索结果页面,并将请求到数据通过路由传递到结果页面   
               _this.$router.push({name:'SearchResultView',params:{response:response}})
           })
            //存储搜索的关键字的历史记录
          //获取搜索记录的本地信息
           var searchHistory = localStorage.getItem("searchHistory");
           //判断是否有该本地信息
           if(searchHistory){
               //如果存在该数据,则将该数据取出,并且转换成JSON对象
               let history = JSON.parse(searchHistory);
               var _this = this;
               /**
                * 查看历史记录中是否存在元素
                * 如果存在,则先删除该元素,再往历史记录添加一条新的记录
                */
               var index = history.indexOf(this.searchValue);
                if(index!=-1){
                    history.splice(index,1);
                }
                // 向搜索历史记录中添加一条新的记录
               history.push(this.searchValue);
               //将历史记录重新转换成字符串,并且存储到本地localStorage中
               localStorage.setItem("searchHistory", JSON.stringify(history));
                //将最新的历史记录数组传给data的searchHistory属性,然后在界面中
                //遍历渲染出来   
               this.searchHistory = history.reverse();
           }else{
            // 如果不存在历史记录信息,则创建一个新的历史记录存储到本地
               let history = [this.searchValue];
                //创建本地存储信息  searchHistory
               localStorage.setItem("searchHistory", JSON.stringify(history));
               
               this.searchHistory = history.reverse();
           }
        },
        deleteHistory(index){
            // 删除某一条历史记录
            var searchHistory = localStorage.getItem("searchHistory");
            let history = JSON.parse(searchHistory);
            // 根据index下标,删除history数组中对应的数据
            history.splice(index,1)
            //将处理后的数组,重新解析成字符串,然后存储到localStorage中的searchHistory属性中
            localStorage.setItem("searchHistory", JSON.stringify(history));
            //渲染的数组也要删除相应位置的数据   
           this.searchHistory.splice(index,1)
        }
    },
    created(){
        // 页面初始化的时候,获取搜索历史记录
        var searchHistory = localStorage.getItem("searchHistory");
        // 将搜索历史记录的字符串解析成JSON对象 {}
        let history = JSON.parse(searchHistory);
        // 如果历史记录不为空
        if(history != null){
            //将历史记录倒叙赋值给渲染数据this.searchHistory
            this.searchHistory = history.reverse();//null
        }
    }
}
</script>

<style lang="scss" scoped>
    #SearchView {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: white;
        z-index: 1;
        .searchViewHead {
            width: 100%;
            height: 44px;
            padding: 5px;
            box-sizing: border-box;
            position: absolute;
            background: white;
            i {
                position: absolute;
                top: 15px;
                left: 20px;
            }
            input {
                border: 1px solid lightgray;
                width: 90%;
                height: 100%;
                border-radius:20px;
                padding-left:30px;
                box-sizing: border-box;
            }
        }
        .searchHistory {
            position: absolute;
            top: 44px;
            left: 0;
            right: 0;
            bottom: 0;
            li {
                height: 30px;
                width: 100%;
                border-bottom: 1px solid lightgray;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                box-sizing: border-box;
            }
        }
    }
</style>

