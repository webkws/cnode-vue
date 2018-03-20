<template>
  <div id="my-msg">
    <mu-appbar class="title-info" title="消息中心"></mu-appbar>
    <section class="msg-center">
      <mobile-tear-sheet>
        <mu-list v-if="readArr.length">
          <mu-sub-header>未读消息</mu-sub-header>
          <mu-list-item  v-for="(item, index) in readArr" :describeText="item.create_at|filterTime" :title="item.author.loginname" :key="index" @click="jumpTo(item.topic.id)">
            <mu-avatar :src="item.author.avatar_url" slot="leftAvatar"/>
            <mu-icon value="chat_bubble" slot="right"/>
          </mu-list-item>
        </mu-list>
        <mu-divider/>
        <mu-list v-if="readArr.length">
          <mu-sub-header>已读消息</mu-sub-header>
          <mu-list-item v-for="(item, index) in readArr" :describeText="item.create_at|filterTime" :title="item.author.loginname" :key="index" @click="jumpTo(item.topic.id)">
            <mu-avatar :src="item.author.avatar_url" slot="leftAvatar"/>
            <mu-icon value="chat_bubble" slot="right"/>
          </mu-list-item>
        </mu-list>
      </mobile-tear-sheet>
    </section>
    <!-- 未登录 -->
    <mu-dialog :open="!accesstoken" title="提示：">
        请先登录
        <mu-flat-button slot="actions" primary to="/" label="取消" />
        <mu-flat-button slot="actions" primary to="/person" label="确定" />
    </mu-dialog>
    <Bott/>
  </div>
</template>

<script>
import Bott from './common/Footer'
import timeago from 'timeago.js'
export default {
  name: 'msg',
  components:{
    Bott
  },
  data () {
    return {
      accesstoken:'',
      readArr:[],
      unreadArr:[]
    }
  },
  created(){
      this.accesstoken = localStorage.getItem("accesstoken");
      if(this.accesstoken){
        this.getList();
      }
  },
  methods:{
    getList(){
      let self = this;
      this.axios.get('https://cnodejs.org/api/v1/messages?accesstoken='+self.accesstoken)
          .then(function(res) {
            console.log(res);
            const msgArr = res.data.data;
            self.readArr = msgArr.has_read_messages;
            self.unreadArr = msgArr.hasnot_read_messages;
          })
    },
    jumpTo(id){
      this.$router.push({ name: 'content', query: { id: id }})
    }
  },
  filters:{
    filterTime(val){
        let time = new Date(val)
        var thistime = timeago()
        return thistime.format(time, 'zh_CN'); 
    }
  }
}
</script>
<style lang="scss" scoped>
.title-info {
    text-align: center;
    height: 3.8rem;
}
.msg-center{

}
</style>

