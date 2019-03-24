<template>
    <div id="Category">
        <search-input></search-input>
        <tag-list :tagList="tagList"></tag-list>
        <mall-list :foreignMall="foreignMall" :nativeMall="nativeMall" :typeList="typeList"></mall-list>
        <transition name="searchView">
            <router-view></router-view>
        </transition>

    </div>
</template>
<script>
import MallList from './MallList'
import SearchInput from './SearchInput'
import TagList from './TagList'
export default {
    data(){
        return {
            tagList: [],
            foreignMall: [],
            nativeMall: [],
            typeList: []
        }
    },
    components: {
        MallList,
        SearchInput,
        TagList
    },
    created(){
        var _this = this;
        this.$http.get('http://localhost:3000/api/category')
        .then(function(response){
            console.log(response);
            _this.tagList = response.data.tagList;
            _this.foreignMall = response.data.foreignMall;
            _this.nativeMall = response.data.nativeMall;
            _this.typeList = response.data.typeList;
        })
    }
}
</script>

<style lang="scss" scoped>
    .searchView-enter-active,.searchView-leave-active {
        transition: all 0.2s;
        
    }
    .searchView-enter,.searchView-leave-to {
        opacity: 0;
        transform: translateX(200px)
    }
    #Category {
        width: 100%;
        height: 100%;
    }
</style>

