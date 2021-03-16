<template>
  <a data-clipboard-action="copy" :data-clipboard-text="text" :class="className">
      <slot>复制</slot>
  </a>
</template>

<script>
/*
@props
text 复制内容
className 默认clipboard 类名
*/
import Clipboard from 'clipboard'
import { Toast } from 'mint-ui'
window.Toast = Toast

export default {
    name: 'clipboard',
    props: {
        text: {
            type: String,
            default: ''
        },
        className: {
            type: String,
            default: 'clipboard'
        }
    },
    created () {
        let clipboard = new Clipboard(`.${this.className}`)
        console.log(clipboard)
        clipboard.on('success', e => {
            Toast('复制成功')
            this.$emit('success')
        })
        clipboard.on('error', e => {
            Toast('该浏览器不支持自动复制')
            this.$emit('error')
        })
    }
}
</script>
