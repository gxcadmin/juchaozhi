<template>
    <div id="Home">
        <Focus></Focus>
        <navBar></navBar>
        <div id="contentList">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import Focus from './Focus/Focus'
import navBar from './navBar/navBar'

export default {
    data(){
        return {
            focus: []
        }
    },
    components: {
        Focus,
        navBar
    },
    created(){
        if(sessionStorage){
            var session = JSON.parse(sessionStorage.getItem("currentSession"));
            console.log(session);
            this.$store.commit("CHANGESELECTED",{currentSelected: session.currentSelected})
            this.$router.push(session.path)
        }
    }
}
</script>

<style lang="scss" scoped>
    #Home {
        position: absolute;
        width:100%;
        top: 0;
        bottom: 64px;
        overflow: scroll;
       
     
        #contentList {
            width: 100%;
            height: 100%;
        }
    }
    
</style>

