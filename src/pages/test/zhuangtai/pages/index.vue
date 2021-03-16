<template>
    <div>
        <div>姓名：{{name}}</div>
        <div>电话：{{cellphone}}</div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
            name: '',
            cellphone: ''
        }
    },
    created () {
        console.log(11111);
        console.log(this.$store);
        this.name = this.$store.state.name;
        this.cellphone = this.$store.state.cellPhone;
        // let newName = this.$state.commit('updateName', '李星云');
        // let newPhone = this.$state.commit('updatePhone', '18515681992');
    }
}
</script>
