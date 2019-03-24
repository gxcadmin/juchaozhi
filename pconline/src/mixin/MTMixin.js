export default {
    filters: {
        filterPubDate(pubDateTime){
            var currentTime = new Date().getTime();
            var min = currentTime-pubDateTime;
            var pubDate = new Date(pubDateTime);
            if(min>3600000 && min<3600000*24){
                console.log(pubDate.getHours());
                return pubDate.getHours()+":"+pubDate.getMinutes();
            } 
            // 小于小时,使用分钟数显示 15分钟前
            if(min<3600000){
                //通过相差的毫秒数来计算相差分钟数
                return parseInt(min/1000/60)+"分钟前";
            }
            if(min>3600000*24){
                return pubDate.getMonth()+1+"/"+pubDate.getDate();
            }          
        },
        getPubDateMonth(pubDateTime){
            var date = new Date(pubDateTime).toString();
            return date.split(" ")[1];
        },
        // 获取日期
        getPubDateDate(pubDateTime){
            var date = new Date(pubDateTime);
            var pubDate = date.getDate();
            return pubDate;
        },
        // 过滤文字的个数
        filterCount(value,arg){
            if(value.length>arg){
                return value.slice(0,arg)+"..."
            }else{
                return value;
            }
        },
    }
}