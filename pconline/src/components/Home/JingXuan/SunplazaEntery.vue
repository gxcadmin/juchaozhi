<template>
    <div id="SunplazaEntery">
        <ul>
            <li v-for="(item,key) in sunplazaEntrys" :key="key">
                <img :src="item.icon" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            sunplazaEntrys: {
                type: Array
            }
        }
    }
</script>

<style lang="scss" scoped>
    #SunplazaEntery {
        width: 100%;
        ul {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            li {
                width: 50%;
                padding:10px 5px 1px;
                box-sizing: border-box;
                img {
                    width: 100%;
                }
            }
        }
    }
</style>
