<template>
  <div id="main" ref="mainC">
      <mu-tabs class="fix-tab" :value="activeTab" @change="handleTabChange">
        <mu-tab value="" title="全部"/>
        <mu-tab value="ask" title="问答"/>
        <mu-tab value="good" title="精华"/>
        <mu-tab value="share" title="分享"/>
        <mu-tab value="job" title="招聘"/>
      </mu-tabs>
      <mu-list class="list-section">
        <template v-for="(item, index) in list">
          <div class="list" :key="index">
            <router-link
              :to="{path:'/other',query:{loginname:item.author.loginname}}"
              :src="item.author.avatar_url"
              tag="img"
              alt="user">
            </router-link>
              <router-link :to="{path:'/content',query:{id:item.id}}" tag="div" class="content">
                  <div class="list_title">
                      <span v-if="item.top">置顶</span>
                      <span v-else-if="item.good">精华</span>
                      <span v-else-if="item.tab === 'share'">分享</span>
                      <span v-else-if="item.tab === 'ask'">问答</span>
                      <span v-else-if="item.tab === 'job'">招聘</span>
                      <h3>{{item.title}}</h3>
                  </div>
                  <div class="timer">
                      <span>{{item.reply_count}} / {{item.visit_count}}</span>
                      <span>{{item.last_reply_at | timeago}}</span>
                  </div>
              </router-link>
          </div>          
        </template>
        <p class="nomore" v-show="noMore">没有更多了。。。</p>
      </mu-list>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>

<script>
import timeago from 'timeago.js'
export default {
  name: 'tabbar',
  data () {
    return {
      activeTab: '',
      loading:false,
      scroller:null,
      noMore:false,
      list:[],
      pageNum:1,
    }
  },
  created(){
      this.getList();
    },
    mounted(){
      this.scroller = this.$el
    },
    computed:{
        rootUrl(){
          return 'https://cnodejs.org/api/v1/topics?limit=15&tab='+this.activeTab  
      }
    },
    methods:{
      handleTabChange(val){
        this.pageNum = 1;
        this.noMore = false;
        this.activeTab = val;
        this.getList();
      },
      getList(){
          let self = this;
          this.axios.get(self.rootUrl).then((res) =>{
            const responseData = res.data;
            if(responseData.success){
              self.list = responseData.data;
              console.log(self.list.length);
            }
          })
      },
      loadMore(){        
         if(!this.noMore && !this.loading){
           this.loading = true;
           this.pageNum++;
           let url = this.rootUrl + '&page=' +this.pageNum;
           let arr = [];
           setTimeout(() => {
                let self = this
                this.axios.get(url).then(function(res) {
                    const responseData = res.data;
                    if(responseData.success){
                      arr = responseData.data;
                      if (arr.length === 0) {
                        self.loading = false
                        self.noMore = true
                        return
                    }
                    }
                    self.list = [...self.list, ...arr]
                    arr = [];
                })
                this.loading = false
            }, 1000)
         } 
      },          
    },
    filters: {
      timeago(val) {
        let time = new Date(val)
        var thistime = timeago()
        return thistime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
      }
    },  
}
</script>
<style lang="scss" scoped>
#main{
  padding-bottom: 5rem;
}
.fix-tab{
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  width: 100%;
  top:0;left: 0;
  margin-top: 56px;
  border-top: 1px solid red;
}
.mu-tab-link,.mu-tab-active{
    white-space: nowrap;
}
.mu-list{    
    padding-top: 106px;    
}
.list {
    display: flex;
    border-bottom: 1px solid #999;
    padding: 1rem;    
}

.list>img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin-right: 1rem;
}

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.list_title>span {
    background-color: #009688;
    color: #fff;
    padding: 0.2rem;
    border-radius: 0.2rem;
}

.list_title>h3 {
    display: inline;
    font-weight: 700;
}

.timer {
    display: flex;
    justify-content: space-between;
    color: #999;
}

.nomore {
    text-align: center;
    padding: 1rem 0;
}
</style>

