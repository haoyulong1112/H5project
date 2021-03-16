<template>
  <div class="container">
      <div class="content">
           <textarea cols="100" rows="20" placeholder="请输入投诉内容" v-model="textcontent">
            </textarea>
      </div>
      <button class="btn" @click="submit">提交</button>
  </div>
</template>
<script>
import { submitData } from '@/api/201812/complaint'
export default {
    data () {
        return {
            textcontent: ''
        };
    },
    methods: {
        submit () {
            let data = {contents: this.textcontent};
            if (!this.textcontent) {
                Toast('请输入投诉内容！');
            } else {
                submitData(data);
                Toast('提交成功！');
                this.textcontent = '';
            }
        }
    }
}
</script>

<style src="./index.styl" lang="stylus"></style>
