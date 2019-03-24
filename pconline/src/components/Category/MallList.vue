<template>
    <div id="MallList">
        <ul>
            <li>国外电商</li>
            <li>国内电商</li>
            <li v-for="(item,key) in typeList" :key="key">
                {{item.name}}
            </li>
        </ul>
        <router-view name="foreign"/>
    </div>
</template>
<script>
import MallListView from './MallListView'
export default {
    components: {
        MallListView
    },
    props: {
        foreignMall: {
            type: Array
        },
        nativeMall: {
            type: Array
        },
        typeList: {
            type: Array
        }
    },
    created(){
        console.log(this.foreignMall);
        console.log(this.nativeMall);
        console.log(this.typeList);
    }
}
</script>

<style lang="scss" scoped>

</style>

