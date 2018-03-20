<template>
    <div id="publish-mark">
        <mu-appbar class="title-pub" title="发布话题">
        </mu-appbar>
        <main>
            <mu-select-field class="text" v-model="list" :labelFocusClass="['label-foucs']" label="选择板块">
                <mu-menu-item v-for="(text,index) in lists" :key="index" :value="index" :title="text" />
            </mu-select-field>
            <mu-text-field v-model="title" class="text" label="标题" hintText="标题字数 10字以上" />
            <mu-text-field v-model="content" class="text content" hintText="输入文本，支持markdown格式" multiLine :rows="5" :underlineShow="false" />
            <mu-raised-button @click="setData" label="发布话题" class="demo-raised-button" icon="near_me" primary/>
        </main>
        <mu-dialog :open="!accesstoken" title="提示：">
            请先登录
            <mu-flat-button slot="actions" primary to="/" label="取消" />
            <mu-flat-button slot="actions" primary to="/person" label="确定" />
        </mu-dialog>
        <mu-dialog :open="publish" title="提示：">
            {{tips}}
            <mu-flat-button slot="actions" primary @click="close" label="确定" />
        </mu-dialog>
        <Bott></Bott>
    </div>
</template>
<script>

import marked from 'marked'
import Bott from './common/Footer'
export default {
    components: {
        Bott
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            accesstoken: '',
            list: 0,
            lists: ['分享', '问答', '招聘','测试区'],
            title: '',
            tab: '',
            content: '',
            publish: false,
            tips: '请输入正确格式'
        }
    },
    created() {
        this.accesstoken = localStorage.getItem("accesstoken")
    },
    methods: {
        setData() {
            if (this.list === 0) {
                this.tab = 'share'
            } else if (this.list === 1) {
                this.tab = 'ask'
            } else if (this.list === 2) {
                this.tab = 'job'
            } else if (this.list === 3) {
                this.tab = 'dev'
            }
            let self = this;
            self.content = marked(self.content);
            self.axios.post('https://cnodejs.org/api/v1/topics', {
                    accesstoken: self.accesstoken,
                    title: self.title,
                    tab: self.tab,
                    content: self.content
                })
                .then(function(res) {                  
                    self.title = ''
                    self.content = ''
                    self.tips = '发表成功！'
                    self.publish = true
                    setTimeout(function() {
                        self.publish = false
                    }, 1500)
                })
                .catch(function(err) {
                    console.log(err);
                    self.publish = true;
                    self.tips='标题字数太多或太少';
                })
        },
        close() {
            this.publish = false;
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#publish-mark{
    display: flex;
    flex-direction: column;
}

.title-pub {
    height: 3.8rem;
    text-align: center;
}

main {
    display: flex;
    flex: 1;    
    padding: 1rem;
    margin-top: 1rem;        
    flex-direction: column;
}

.text {    
    width: 100%;
}

.content {
    flex: 1;
    background-color: #f7f7f7;
    padding: 1rem;
    overflow-y: auto;
}
textarea {
    height: 16rem;
}
</style>
