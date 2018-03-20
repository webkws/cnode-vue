<template>
  <div id="person-info">
    <mu-appbar class="title-info" title="用户详情"></mu-appbar>
    <main>
      <!-- 个人信息 -->
      <img :src="user_msg.avatar_url" alt="user">
      <span class="name">{{user_msg.loginname}}</span>
      <div class="timer">
          <span>积分：{{user_msg.score}}</span>
          <span>注册时间：{{user_msg.create_at | timeago}}</span>
      </div>
      <!-- 最近主题、回复、收藏 -->
      <section class="content">
          <mu-list>
              <mu-list-item
              class="list"
              v-if="user_msg.recent_topics"
              title="最近主题"
              toggleNested
              :open="false">
                  <mu-icon class="icon" slot="left" value="insert_drive_file" />
                  <mu-list-item
                  :to="{path:'/content',query:{id:item.id}}"
                  v-for="item in user_msg.recent_topics"
                  :key="item.id"
                  slot="nested"
                  :title="item.title">
                      <mu-icon class="icon" slot="left" value="description" />
                  </mu-list-item>
                  <span class="count">{{user_msg.recent_topics.length}}个</span>
              </mu-list-item>
              <mu-list-item
              class="list"
              v-if="user_msg.recent_replies"
              title="最近回复"
              toggleNested
              :open="false">
                  <mu-icon class="icon" slot="left" value="drafts" />
                  <mu-list-item
                  :to="{path:'/content',query:{id:item.id}}"
                  v-for="item in user_msg.recent_replies"
                  :key="item.id"
                  slot="nested"
                  :title="item.title">
                      <mu-icon class="icon" slot="left" value="insert_comment" />
                  </mu-list-item>
                  <span class="count">{{user_msg.recent_replies.length}}个</span>
              </mu-list-item>
              <mu-list-item
              class="list"
              v-if="user_msg.collect_topics"
              title="收藏主题"
              toggleNested
              :open="false">
                  <mu-icon class="icon" slot="left" value="folder" />
                  <mu-list-item
                  :to="{path:'/content',query:{id:item.id}}"
                  v-for="item in user_msg.collect_topics"
                  :key="item.id"
                  slot="nested"
                  :title="item.title">
                      <mu-icon class="icon" slot="left" value="folder_open" />
                  </mu-list-item>
                  <span class="count">{{user_msg.collect_topics.length}}个</span>
              </mu-list-item>
          </mu-list>
      </section>
      <!-- 退出登录按钮 -->
        <mu-raised-button
        @click="goBack"
        label=" 返 回"
        class="demo-raised-button go-back-btn"
        icon="arrow_back"
        primary/>
    </main>
  </div>
</template>

<script>
import timeago from 'timeago.js'
export default {
  name: 'other',
  data () {
    return {
      loginname:this.$route.query.loginname, 
      user_msg: {}
    }
  },
  created() {
        this.getUserData(); 
    },
    filters: {
        timeago(val) {
            let time = new Date(val)
            let thistime = timeago()
            return thistime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
        }
    },
    methods: {
        getUserData(){
            let self = this;
            this.axios.get('https://cnodejs.org/api/v1/user/' + self.loginname)
                .then(function(res) {
                  console.log(res);
                    self.user_msg = res.data.data                    
                })
            this.axios.get('https://cnodejs.org/api/v1/topic_collect/' + self.loginname)
                .then(function(res) {                                      
                    self.$set(self.user_msg,'collect_topics',res.data.data)                    
                })
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
#login-center{  
    flex: 1;
    margin: 5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  .demo-raised-button {
      margin-top: 2rem;
      width: 22rem;
  }
}
.title-info {
    text-align: center;
    height: 4rem;
}
.wrapper {
    display: flex;
    flex-direction: column;
}
main {
    flex: 1;
    margin: 5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #f8f8f8;
}

.demo-raised-button {
    width: 100%;
}
main>img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin: 1rem 0;
}
.name {
    color: #009688;
    font-weight: 700;
    font-size: 24px;
}

.timer {
    display: flex;
    justify-content: space-around;
    width: 60%;
    margin: 1rem 0;
}

.content {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    margin-bottom: 1rem;
}
.mu-list {
    padding: 0;
}
.list:first-child {
    border-top: 1px solid #009688;
}
.count {
    background-color: #009688;
    color: #fff;
    padding: 0.1rem 0.6rem;
    border-radius: 0.2rem;
    margin-top: 2rem;
}
.icon {
    color: #009688;
}
.go-back-btn{
  margin-top: 3rem;
}
</style>

