<template>
    <div id="YouHui">
        <GoodsList :goodsList="goodsList" :loadURL="loadURL"></GoodsList>
    </div>
</template>

<script>
import GoodsList from '../GoodsList'

export default {
    data(){
        return {
            goodsList: [],
            loadURL: 'http://localhost:3000/api/home?sectionId=0'            
        }
    },
    components: {
        GoodsList
    },
    activated(){
        console.log("优惠视图激活");
        var _this = this;
        this.$http.get(this.loadURL+"&pageNo=1&pageSize=20")
        .then(function(response){
            console.log(response);
           _this.goodsList = response.data.data;
        })
        .catch(function(error){
            console.log(error);
        })
    },
    deactivated(){
        console.log("离开优惠视图");
    },
    created(){
      
    }
}
</script>

<style lang="scss" scoped>
    #YouHui{
        width: 100%;
        height: 100%;
        background: white;
    }
</style>
