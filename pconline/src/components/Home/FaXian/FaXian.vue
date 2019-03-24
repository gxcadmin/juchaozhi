<template>
    <div id="FaXian">
        <ul>
            <li v-for="(item,key) in goodsList" :key="key">
                <div><img :src="item.cover" alt=""></div>
                <span>{{item.title}}</span>
                <span>
                    <span>{{item.mallName}}</span>
                    <span>{{item.pubDate | filterPubDate}}</span>
                </span>
            </li>
            <li style="width:100%;height:44px;background:lightblue" @click="loadMore">加载更多</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodsList: [],
            loadURL: 'http://localhost:3000/api/home?sectionId=2',
            pageNo: 1
        }
    },
    methods: {
        loadMore(){
            this.pageNo++;
            var _this = this;
            var url = this.loadURL+"&pageNo="+this.pageNo+"&pageSize=20";
            this.$http.get(url)
            .then(function(response){
                console.log(response);
                 var data = response.data.data;
                 for(var i=0;i<data.length;i++){
                     _this.goodsList.push(data[i]);
                 }
            })
            .catch(function(error){
                console.log(error);
            })
        }
    },
    activated(){
        var _this = this;
        this.$http.get(this.loadURL+"&pageNo=1&pageSize=20")
        .then(function(response){
            console.log(response);
           _this.goodsList = response.data.data;
        })
        .catch(function(error){
            console.log(error);
        })
    }
}
</script>

<style lang="scss" scoped>
    #FaXian {
        width: 100%;
        height: 100%;
        ul {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            li {
                width: 50%;
                height: 300px;
                display: flex;
                flex-direction: column;
                padding: 5px;
                box-sizing: border-box;
                div {
                    width: 100%;
                    img {
                        width: 100%;
                    }
                }
                span:nth-child(2){
                    font-size: 15px;
                }
                span:nth-child(3){
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around
                }
            }
        }
    }
</style>
