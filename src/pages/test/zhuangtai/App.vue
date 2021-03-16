<template>
    <div id="app">
        <router-view v-show="isrouterShow"></router-view>
    </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            isrouterShow: true
        }
    }
}
</script>
