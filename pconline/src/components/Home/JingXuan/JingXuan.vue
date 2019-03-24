<template>
    <div id="JingXuan">
        <!-- 将广场作为子组件使用,通过props将广场数据传递给广场组件 -->
        <SunplazaEntery :sunplazaEntrys="sunplazaEntrys"></SunplazaEntery>
        <GoodsList :goodsList="goodsList" :loadURL="loadURL"></GoodsList>
    </div>
</template>

<script>
import SunplazaEntery from './SunplazaEntery'
import GoodsList from '../GoodsList'
export default {
    data(){
        return {
            sunplazaEntrys: [],
            goodsList: [],
            loadURL: "http://localhost:3000/api/home?sectionId=99"
        }
    },
    components: {
        SunplazaEntery,
        GoodsList
    },
    methods: {
        loadData(url){
          
        }
    },
    activated(){
        console.log("精选视图激活");
        var _this = this;
        this.$http.get(this.loadURL+"&pageNo=1&pageSize=20")
        .then(function(response){
            _this.sunplazaEntrys = response.data.sunplazaEntrys;
            var listIndex = response.data.listIndex;
            var goodsArr = []
            for(var i=0;i<listIndex.length;i++){
                goodsArr.push(listIndex[i].value);
            }
            _this.goodsList = goodsArr;
            console.log(_this.goodsList);
        })
        .catch(function(error){
            console.log(error);
        })
    },
    deactivated(){
        console.log("离开精选视图");
    },
    created(){
        // var url = "http://localhost:3000/api/home?sectionId=99&pageNo=1&pageSize=20";
        // this.loadData(url);
    }
}
</script>

<style lang="scss" scoped>
    #JingXuan{
        width: 100%;
        height: 100%;
        background: white;
      
    }
</style>
