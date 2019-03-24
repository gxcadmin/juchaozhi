<template>
    <div id="YuanChuang">
        <ul>
            <li v-for="(item,key) in goodsList" :key="key">
                 <div class="cellTop">
                     <img :src="item.hdCover">
                 </div>
                 <div class="cellBottom">
                     <span>
                         <span>
                             {{item.pubDate|getPubDateDate}}
                         </span>
                         <span>
                            {{item.pubDate|getPubDateMonth}}
                         </span>
                         <span>-</span>
                     </span>
                     <span>
                         <span>{{item.title}}</span>
                         <span>{{item.synopsis |filterCount(40)}}</span>
                         <span>
                             <span class="fa fa-user-o"></span>
                             <span>{{item.createName}}</span>
                             <span class="fa fa-thumbs-o-up" @click="item.favoriteCount++,favorited(key)"
                                :style="clickedFavouted&&key==seletedIndex?favoritedStyle:{color:'lightgray'}"
                             >{{item.favoriteCount}}</span>
                         </span>
                     </span>
                 </div>
            </li>
            <p style="width:100%;height:44px;background:lightblue" @click="loadMore">加载更多</p>

        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodsList: [],
            clickedFavouted: false,
            favoritedStyle: {
                color: "red"
            },
            seletedIndex: 0,
            pageNo: 1,
            loadURL: "http://localhost:3000/api/home?sectionId=34"
        }
    },
    methods: {
        favorited(key){
            console.log("点赞");
            this.seletedIndex = key; 
            this.clickedFavouted = true;
        },
        loadMore(){
            console.log("加载更多");
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
  #YuanChuang {
      width: 100%;
      ul {
          width: 100%;
          display: flex;
          flex-direction: column;
          li {
              width: 100%;
              min-height: 304px;
              .cellTop {
                  width: 100%;
                  
                  overflow: hidden;
                  img {
                      width: 100%;
                  }
              }
              .cellBottom {
                  height: 160px;
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  span:nth-child(1){
                      width: 20%;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                    span {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        font-weight: 600;
                    }
                    span:nth-child(1){
                        flex:1;
                        align-items: flex-end;
                        background: red;
                        -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
                        -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
                    }
                    span:nth-child(2){
                        flex:1;
                        align-items: flex-start;
                        color: lightgray;
                    }
                    span:nth-child(3){
                        flex:5;
                        align-items: flex-start;
                    }   
                  }
                  span:nth-child(2){
                      width: 80%;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                      span {
                          width: 100%;
                      }
                      span:nth-child(1){
                          flex:2
                      }
                      span:nth-child(2){
                          flex:4
                      }
                      span:nth-child(3){
                          flex:2;
                          display: flex;
                          flex-direction: row;
                          font-size: 12px;
                          span:nth-child(1){
                                flex:1;
                          }
                          span:nth-child(2){
                              flex:8;
                              display: flex;
                              flex-direction: row;
                              justify-content: flex-start
                          }
                          span:nth-child(3){
                              flex:1
                          }
                      }
                  }
              }
          }
      }
  }
</style>
