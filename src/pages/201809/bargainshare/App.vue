<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',

    created () {
        window.bargainData = {}
        window.bargainTaskId = ''
        window.cutMoney = ''
        window.islogin = false
    }
}
</script>
