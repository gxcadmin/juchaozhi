<template>
    <div id="TagList">
            <button v-for="(item,key) in tagList" :key="key">
                <span>{{item.name || item.key}}</span>
            </button>
    </div>
</template>
<script>
export default {
    props: {
        tagList: {
            type: [Array]
        }
    }
}
</script>

<style lang="scss" scoped>
    #TagList {
        width: 100%;
        min-height: 170px;
        text-align: left;
        padding: 5px;
        box-sizing: border-box;
        button {
            border: none;
            background: none;
            border:1px solid lightgray;
            border-radius: 15px;
            padding: 5px;
            box-sizing: border-box;
            margin-right:10px;
            margin-top: 10px;
            span {
                width: 100%;
                height: 100%;
                padding: 10px;
            }
        }
    }
</style>

