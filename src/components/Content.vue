<template>
  <div id="Content" class="wrapper">   
      <mu-appbar :title="data.title" class="title-content">
        <mu-icon-button @click="goBack" icon="arrow_back" slot="left"/>        
      </mu-appbar>
      <main class="main">
            <!-- 标题区 -->
            <header class="md_header">
                <h1>
                    <span class="tag" v-if="data.top">置顶</span>
                    <span class="tag" v-else-if="data.good">精华</span>
                    {{data.title}}
                </h1>
                <mu-checkbox
                v-if="accesstoken"
                v-model="collect"
                :label="collect_txt"
                class="demo-checkbox"
                uncheckIcon="favorite_border"
                checkedIcon="favorite" />
                <div class="label">
                    <span>发布于 {{data.create_at | timeago}}</span>
                    <span>作者 {{data.author.loginname}}</span>
                    <span>{{data.visit_count}} 次浏览</span>
                    <span>来自 {{data.tab | tab}}</span>
                </div>
            </header>
            <!-- 内容区 -->
            <article class="md_content" v-html="data.content"></article>
            <!-- 评论区 -->
            <ul v-if="data.replies.length" class="replies">
                <li>{{data.replies.length}}条回复</li>
                <li class="reply" v-for="(list,index) in data.replies" :key="list.id">
                    <section class="msg">
                        <div class="author">
                            <router-link
                            :to="{path:'/other',query:{loginname:list.author.loginname}}"
                            :src="list.author.avatar_url"
                            tag="img"
                            alt="user">
                            </router-link>
                            <span class="name">{{list.author.loginname}}</span>
                            <span class="timer">{{index+1}}楼 • {{list.create_at | timeago}}</span>
                        </div>
                        <!-- 未登录状态下点赞 -->
                        <div @click="open" v-if="list.ups.length && !accesstoken" class="ups">
                            <mu-icon value="thumb_up" :size="16" />
                            <span>{{list.ups.length}}</span>
                        </div>
                        <!-- 登录状态下点赞 -->
                        <div @click="open" v-if="accesstoken" class="ups">
                            <mu-icon @click="like(index)" value="thumb_up" :size="16" />
                            <span>{{list.ups.length}}</span>
                            <mu-icon @click="changeReply(index)" class="textsms" value="textsms" :size="16" />
                        </div>
                    </section>
                    <p v-html="list.content"></p>
                    <div v-if="accesstoken" class="reply_show" v-show="list.reply_show">
                        <textarea v-model="single_reply" class="reply" placeholder="请输入回复内容..." rows="5"></textarea>
                        <mu-raised-button @click="single_reply_content(index)" label="回复" class="demo-raised-button" primary/>
                        <mu-raised-button @click="exit_single_reply_content(index)" label="取消" class="demo-raised-button" primary/>
                    </div>
                </li>
            </ul>
            <ul v-if="accesstoken" class="replies">
                <li>添加回复</li>
                <li>
                    <textarea v-model="reply" class="markdown-text" placeholder="请输入回复内容..." rows="5"></textarea>
                    <mu-raised-button @click="reply_content" label="回复" class="demo-raised-button" primary/>
                </li>
            </ul>
        </main>
        <!-- 弹出提示框 -->
        <mu-dialog v-if="!accesstoken" :open="dialog" title="提示：" @close="close">
            请先登录，登录后即可点赞。
            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button to="/person" slot="actions" @click="close" primary label="确定" />
        </mu-dialog>
        <mu-dialog :open="isReply" title="提示：" @close="close">
            {{tips}}
            <mu-flat-button slot="actions" @click="close" primary label="确定" />
        </mu-dialog>
  </div>
</template>

<script>

import timeago from 'timeago.js'
export default {
    data() {
            return {
                accesstoken: '',
                user_id: '',
                data: {
                    author:{},
                    replies:{}
                },
                dialog: false,
                reply: '',
                single_reply: '',
                isReply: false,
                tips: '',
                collect: false,
                collect_txt: '收藏主题',
                loginname: '',
                collected: false
            }
        },
        created() {
            this.accesstoken = localStorage.getItem("accesstoken")
            this.user_id = localStorage.getItem("user_id")
            this.loginname = localStorage.getItem("loginname")
            this.getData()
        },
        watch: {
            collect: function(newVal) {
                if (newVal) {
                    this.on_collect()
                    this.collect_txt = '取消收藏'
                } else {
                    this.off_collect()
                    this.collect_txt = '收藏主题'
                }
            }
        },
        filters: {
            timeago(val) {
                let time = new Date(val)
                let thistime = timeago()
                return thistime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
            },
            tab(val) {
                if (val === 'share') {
                    return '分享'
                } else if (val === 'ask') {
                    return '问答'
                } else if (val === 'job') {
                    return '招聘'
                }
            }
        },
        methods: {
            getData() {
                // 主题详情
                let id = this.$route.query.id
                let self = this
                let url = 'https://cnodejs.org/api/v1/topic/' + id
                this.axios.get(url).then(function(res) {
                    self.data = res.data.data
                    self.data.replies.map(function(item) {
                        item.reply_show = false
                    })
                })
                if(this.accesstoken){                    
                    this.isCollected()                    
                }
            },
            isCollected() {
                //收藏
                let self = this
                this.axios.get('https://cnodejs.org/api/v1/topic_collect/' + self.loginname)
                    .then(function(res) {
                        // 获取收藏主题数组
                        let arr = res.data.data;
                            //本页主题id
                        let collect_id = self.data.id
                            //find 本页主题是否在已收藏列表
                        arr.find(function(item) {
                            if (item.id === collect_id) {
                                self.collect = true
                                self.collect_txt = '收藏主题'
                            }
                        })
                    })   
            },
            goBack() {
                this.$router.go(-1)
            },
            open() {
                this.dialog = true
            },
            close() {
                this.dialog = false
                this.isReply = false
            },
            reply_content() {
                // 添加评论
                let id = this.$route.query.id
                let self = this
                this.axios.post('https://cnodejs.org/api/v1/topic/' + id + '/replies', {
                        accesstoken: self.accesstoken,
                        content: self.reply
                    })
                    .then(function(response) {
                        self.tips = '回复成功！'
                        self.isReply = true
                        setTimeout(function() {
                            self.isReply = false
                        }, 1500)
                        self.getData()
                        self.reply = ''
                    })
                    .catch(function(error) {
                        self.tips = '请输入回复内容...'
                        self.isReply = true
                        setTimeout(function() {
                            self.isReply = false
                        }, 1500)
                    })
            },
            like(index) {
                //点赞
                let self = this
                let reply_id = self.data.replies[index].id
                this.axios.post('https://cnodejs.org/api/v1/reply/' + reply_id + '/ups', {
                        accesstoken: self.accesstoken
                    })
                    .then(function(response) {
                        // console.log(response.data)
                        self.getData()
                    })
            },
            single_reply_content(index) {
                // 对评论的回复
                let id = this.$route.query.id
                let self = this
                this.axios.post('https://cnodejs.org/api/v1/topic/' + id + '/replies', {
                        accesstoken: self.accesstoken,
                        content: self.single_reply,
                        reply_id: self.data.replies[index].id
                    })
                    .then(function(response) {
                        self.tips = '回复成功！'
                        self.isReply = true
                        setTimeout(function() {
                            self.isReply = false
                        }, 1500)
                        self.getData()
                        self.single_reply = ''
                    })
                    .catch(function(error) {
                        self.tips = '请输入回复内容...'
                        self.isReply = true
                        setTimeout(function() {
                            self.isReply = false
                        }, 1500)
                    })
            },
            changeReply(index) {
                //点击对评论进行回复
                let arr = this.data.replies;
                let self = this;
                arr.map(function(item, i) {
                    index === i ? self.$set(item, 'reply_show', true) : self.$set(item, 'reply_show', false)
                })

                this.single_reply = '@' + this.data.replies[index].author.loginname + ' '
            },
            exit_single_reply_content(index) {
                //取消对评论的回复，清空内容
                this.single_reply = ''
                let arr = this.data.replies
                arr[index].reply_show = false
                this.$set(arr, index, arr[index])
            },
            on_collect() {
                //收藏主题
                let self = this
                this.axios.post('https://cnodejs.org/api/v1/topic_collect/collect', {
                        accesstoken: self.accesstoken,
                        topic_id: self.data.id
                    })
                    .then(function(res) {
                        console.log(res);                        
                    })
            },
            off_collect() {
                // 取消收藏
                let self = this
                this.axios.post('https://cnodejs.org/api/v1/topic_collect/de_collect', {
                        accesstoken: self.accesstoken,
                        topic_id: self.data.id
                    })
                    .then(function(res) {
                        console.log(res);
                    })
            }
        }
}
</script>

<style>
.wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-scrolling: touch;
}

.title-content {
    height: 3.8rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}

.main {
    margin-top: 3.8rem;
}

.tag {
    background-color: #009688;
    color: #fff;
    padding: 0.2rem 0.6rem;
    border-radius: 0.2rem;
}

.demo-checkbox {
    font-size: 20px;
    font-weight: 700;
    margin-top: 0.8rem;
}

.demo-checkbox .mu-checkbox-label {
    color: #009688;
}

.md_content {
    padding: 1rem;
    border-top: 1px solid #e5e5e5;
    margin-bottom: 2rem;
}

.md_content h1,
.md_content h2,
.md_content h3,
.md_content h4,
.md_content h5,
.md_content h6 {
    font-weight: 700;
}

.md_content p {
    font-size: 15px;
    line-height: 1.7em;
    overflow: auto;
}

.md_content h2 {
    font-size: 26px;
    margin: 30px 0 15px;
    border-bottom: 1px solid #eee;
}

.md_content h3 {
    margin: 30px 0 15px;
    border-bottom: 1px solid #eee;
    font-size: 24.5px;
}

.md_content pre {
    font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
    font-size: 14px;
    border-radius: 0;
    padding: 1rem;
    border: 0;
    margin: 1rem 0;
    border-width: 1px 0;
    background: #f7f7f7;
}

.md_content ul {
    list-style-type: disc;
    margin: 0 0 1rem 2rem;
}

.md_content ol {
    list-style: decimal;
    margin-left: 2em;
}

.md_content li {
    line-height: 2.5rem;
}

.md_content a {
    display: block;
}

.md_content img {
    height: auto;
    max-width: 100%;
    vertical-align: middle;
    border: 0;
}

.md_header {
    padding: 1rem;
}

.md_header h1 {
    font-weight: 700;
}

.md_header .label span:before {
    content: "•";
    padding: 0 0.5rem;
}

.md_header .label span {
    font-size: 12px;
    color: #838383;
    font-weight: 400;
    padding: 0 0.2rem;
}


/*评论区样式*/

.replies>li {
    padding: 1rem;
}

.replies>li:first-child {
    background-color: #f6f6f6;
}

.reply {
    border-top: 1px solid #f0f0f0;
}

.reply>.msg {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
}

.reply>p {
    margin-bottom: 2rem;
}

.author>img {
    width: 3rem;
    height: 3rem;
    /*border-radius: 50%;*/
    vertical-align: top;
}

.author>.name {
    color: #666;
    font-weight: 700;
}

.author>.timer {
    color: #08c;
    /*font-weight: 700;*/
}

.msg>.ups {
    display: flex;
    align-items: center;
    color: #009688;
}

.ups>span {
    margin-left: 0.5rem;
}

.reply {
    width: 100%;
}

.textsms {
    margin-left: 1rem;
    color: #009688;
}

.reply_show {
    animation: reply_show 1s ease;
}

@keyframes reply_show {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.markdown-text{
    width: 100%;
    margin-bottom: 1rem;
}

</style>
