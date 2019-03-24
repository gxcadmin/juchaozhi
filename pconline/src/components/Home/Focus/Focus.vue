<template>
    <div id="focus">
        <swiper :options="swiperOption" ref="mySwiper" class="focusSwiper">
            <!-- slides -->
            <swiper-slide v-for="(item,key) in focus" :key="key"  class="focusImg" @click.native="callback">
                <img :src="item.imageUrl" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data(){
        return {
            focus: [],
            swiperOption: {
                spaceBetween: 1,
                centeredSlides: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    },
    methods: {
        callback(){
            console.log("图片");
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    created(){
        var _this = this;
        this.$http.get("http://localhost:3000/api/focus")
        .then(function(response){
            _this.focus = response.data.focus;
        })
        .catch(function(error){
            console.log(error);
        })
    }
}
</script>

<style lang="scss" scoped>
 #focus {
    width: 100%;
    height: 174px;
    background: cyan;
    overflow: hidden;
    .focusSwiper {
        width: 100%;
        height: 100%;
        .focusImg {
            width: 100%;
            height: 100%;
            img {
                width: 100%;
            }
        }
    }
}

</style>

