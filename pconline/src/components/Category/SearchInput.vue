<template>
    <div id="SearchInput">
        <input type="search" @focus="showSearchView">
    </div>
</template>
<script>
export default {
    methods: {
        showSearchView(){
            console.log("显示搜索页面");
            this.$router.push({name: 'searchView'})
        }
    }
}
</script>

<style lang="scss" scoped>
    #SearchInput {
        width: 100%;
        height: 54px;
        padding: 5px;
        box-sizing: border-box;
        input {
            width: 100%;
            height: 100%;
            font-size: 18px;
        }
    }
</style>

