<template>
    <div id="GoodsList">
        <ul>
            <li v-for="(item,key) in goodsList" :key="key">
                <div class="cellLeft">
                    <img :src="item.cover" alt="">
                </div>
                <div class="cellRight">
                    <span>{{item.title | filterCount(20)}}</span>
                    <span style="color:red">{{item.price |filterCount(20)}}</span>
                    <span>
                        <span>{{item.mallName}}</span>
                        <span>{{item.pubDate | filterPubDate}}</span>
                        <span>ca</span>
                    </span>
                </div>
            </li>
            <p class="loadMore" @click="loadMore">加载更多</p>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageNo: 1,
        }
    },
    props: {
        goodsList: {
            type: [Array]
        },
        loadURL: {
            type: String
        }
    },

    methods: {
        // 加载更多
        loadMore(){
            // pageNo: 该属性时请求数据的时候,用于请求指定分页的数据 1代表第一页,2代表第二页
            /*
                因此要加载更多数据,就只需要请求的时候pageNo递增即可
            */ 
            this.pageNo++;
            var _this = this;
            // 由于pageNo发生改变,因此请求的链接也相应发生改变
            var url = this.loadURL+`&pageNo=${this.pageNo}&pageSize=20`
            // 发送请求,请求新的数据
            this.$http.get(url)
            .then(function(response){
                console.log("加载更多"+url);
                console.log(response.data.listIndex);
                // 由于goodsList是由精选,优惠和海涛,搜索结果页面公用的组件
                // 因此在获取数据的时候要考虑它们的数据格式,
                // 例如精选获取的数据格式就和优惠和海淘的数据格式就不一致,因此需要判断处理
                 var data = []; //data数组
                //  判断数据是精选页面还是页面
                if(response.data.listIndex){
                    // 如果是精选页面,则找到指定数据,并将数据存储到data数组中
                    var listIndex = response.data.listIndex;
                     for(var i=0;i<listIndex.length;i++){
                        data.push(listIndex[i].value);
                    }
                }else{
                    data = response.data.data;
                }
                // 将获取到的新的数据,通过便利的方式添加到原有的数据上
                for(var i=0;i<data.length;i++){
                    _this.goodsList.push(data[i]);
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #GoodsList {
        width: 100%;
        ul {
            width: 100%;
            li {
                width: 100%;
                min-height: 150px;
                display: flex;
                flex-direction: row;
                margin-bottom: 5px;
                .cellLeft {
                    width: 40%;
                    height: 100%;
                    padding: 10px;
                    box-sizing: border-box;
                    img {
                        width: 100%;
                    }
                };
                .cellRight {
                    width: 60%;
                    min-height: 150px;
                    display: flex;
                    flex-direction: column;
                    padding: 10px;
                    box-sizing: border-box;
                    span {
                        display: flex;
                        justify-content: flex-start;
                    }
                    span:nth-child(1){
                            flex:3;
                            font-size: 18px;
                        }
                    span:nth-child(2){
                        flex:2;
                        
                    }
                    span:nth-child(3){
                        flex:1
                    }
                }
            }
            .loadMore {
                width: 100%;
                height: 30px;
                background: lightblue
            }
        }
    }
</style>
