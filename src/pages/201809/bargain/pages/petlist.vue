<template>
     <div class="container">
        <div class="index">
            <petlist-comp :tabIndex="petListCurtab" :tabs="['汪星人', '喵星人']" :lists="[petList.dogs, petList.cats]" :selectedPetId="selectedPetId" @itemClicked="itemClicked" @searchInput="searchInput"></petlist-comp>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import petlistComp from '@/components/petList'
let lock = null
export default {
    name: 'petlist',
    computed: {
        ...mapState(['petList', 'selectedPetId', 'petListCurtab', 'listpage'])
    },
    created () {
        // 获取宠物
        this.getPetList()
    },
    methods: {
        ...mapMutations(['setSelectedPetInfo', 'updateListpage']),
        ...mapActions(['getPetList', 'getBargainList']),
        searchInput (str) {
            // 输入时刷新
            if (lock) return
            lock = true
            setTimeout(() => {
                lock = false
                this.getPetList(str)
            }, 200)
        },
        itemClicked (data) {
            if (data.id == this.selectedPetId) {
                data.id = ''
                data.name = ''
            }
            this.setSelectedPetInfo(data)
            this.updateListpage(1)
            this.getBargainList()
            this.$router.go(-1)
        }
    },
    components: {
        petlistComp
    }
};
</script>
