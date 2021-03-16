import Vue from 'vue'
import Vuex from 'vuex'
import { loadBargainListPage, queryActivityBargainPetList, loadBargainUserTaskList, loadBargainPropList } from '@/api/201809/bargain'

import tologin from '@/utils/hooks/tologin'

const cellPhoneReg = config.cellPhoneReg

Vue.use(Vuex)

const state = {
    // 请求接口所需参数
    cellPhone: '',
    system: '',
    imei: '',
    activityId: '',
    taskId: '',
    selectedPetId: '',
    selectedPetName: '',
    petListCurtab: 0, // petlist页 tab状态
    curtab: 0, // list页 tab状态
    // activityInfo
    bargainList: [], // 砍价列表
    activityRule: '', // 规则富文本内容
    activityBgPic: '', // 入口列表banner
    myTaskList: [], // 我的免单列表
    petList: [], // 宠物列表
    toolList: [], // 道具列表
    // 主列表分页锁
    fetchLock: false,
    listpage: 1
}

const getters = {
    // 获取跳转链接
    getUrl: (state) => (options) => {
        options = options || {}
        // 登录信息，活动id，任务id，服务id，当前任务中的petId，宠物列表页选择的petId
        const cellPhone = state.cellPhone || ''
        const imei = state.imei || ''
        const system = state.system || ''
        const activityId = state.activityId || ''
        const taskId = options.taskId || ''
        // 查看任务状态时要带上 bargainTaskId 区分
        const bargainTaskId = options.bargainTaskId || ''
        console.log(options)
        // 进入发起页的来源 0列表 1详情
        const source = options.source || 0
        const addressId = options.addressId || 0
        // 记录列表筛选条件中选择的petId, petName
        const selectedPetId = state.selectedPetId || ''
        const selectedPetName = state.selectedPetName || ''
        const curtab = state.curtab || ''
        return `${config.bargainShareUrl}?cellPhone=${cellPhone}&imei=${imei}&system=${system}&activityId=${activityId}&bargainTaskId=${bargainTaskId}&taskId=${taskId}&selectedPetId=${selectedPetId}&addressId=${addressId}&selectedPetName=${selectedPetName}&curtab=${curtab}&source=${source}&t=${config.refresh}`
    }
}

const mutations = {
    // 存入url参数
    saveParams (state, data) {
        if (data.cellPhone && cellPhoneReg.test(data.cellPhone)) state.cellPhone = data.cellPhone
        if (data.imei) state.imei = data.imei
        if (data.system) state.system = data.system
        if (data.activityId) state.activityId = data.activityId
    },
    // 更新手机号
    updateCellPhone (state, cellPhone) {
        if (cellPhone && cellPhoneReg.test(cellPhone)) state.cellPhone = cellPhone
    },
    // 处理入口任务列表 和活动信息
    setActivityInfo (state, data) {
        data = data || {}
        let taskInfoList = data.taskInfoList || []
        // console.log(taskInfoList)
        if (taskInfoList && Array.isArray(taskInfoList) && taskInfoList.length) {
            for (let item of taskInfoList) {
                state.bargainList.push(item)
            }
            state.fetchLock = true
        }
        if (data.activityRule) state.activityRule = data.activityRule
        if (data.activityBgPic) state.activityBgPic = data.activityBgPic
    },
    // 存入选中的tab
    setCurtab (state, num) {
        if (num != state.curtab) {
            if (num > 0) {
                if (!state.cellPhone) {
                    tologin()
                    // this.$router.push('login')
                } else {
                    state.curtab = 1
                }
            } else {
                state.curtab = 0
            }
            window.scrollTo(0, 0)
        }
    },
    // 存入选中的宠物id name
    setSelectedPetInfo (state, { id, name, tabIndex }) {
        if (id !== undefined) state.selectedPetId = id
        if (name !== undefined) state.selectedPetName = name
        if (tabIndex !== undefined) state.petListCurtab = tabIndex
    },
    // 处理我的免单列表数据 区分状态显示文案
    setMyTaskList (state, data) {
        if (data && Array.isArray(data)) {
            for (let item of data) {
                if (item.state == 1) {
                    item.stateTip = `已砍<span>${item.completePrice}</span>元，还差<span>${item.noCompletePrice}</span>元`
                }
                if (item.state == 2) {
                    item.stateTip = `<span class="font-red">免单成功，已砍${item.taskContent.servicePrice}元</span>`
                }
                if (item.state == 3) {
                    item.stateTipIcon = '已过期'
                    item.stateTip = '未在活动时间内完成，已过期'
                }
                if (item.state == 4) {
                    item.stateTipIcon = '已过期'
                    item.stateTip = '未在24小时内完成，已过期'
                }
                if (item.state == 5) {
                    item.stateTipIcon = '已抢光'
                    item.stateTip = '小伙伴非常厉害，名额已抢光~'
                }
            }
            state.myTaskList = data
        }
    },
    // 存入宠物列表
    setPetList (state, data) {
        state.petList = data
    },
    // 存入道具列表
    setToolList (state, data) {
        data = data || {}
        let propList = data.propList || []
        if (propList && Array.isArray(propList)) {
            state.toolList = propList
        }
    },
    // 存入是否禁止拉取分页接口(请求完成释放)
    setFetchLock (state, data) {
        state.fetchLock = data
    },
    // 存入listpage
    updateListpage (state, data) {
        // console.log(data)
        if (data) {
            state.listpage = parseInt(data) || 1
        } else {
            state.listpage++
        }
    }
}

const actions = {
    async getBargainList ({ commit, state }) {
        if (state.listpage == 1) {
            // 取第一页之前清空历史数据
            state.bargainList = []
        }
        try {
            const res = await loadBargainListPage({
                cellPhone: state.cellPhone,
                system: state.system,
                imei: state.imei,
                activityId: state.activityId,
                petId: state.selectedPetId,
                page: state.listpage
            })
            if (res.data) {
                commit('setActivityInfo', res.data)
                if (res.data.status == 0) Toast('活动未开始')
                if (res.data.status == 2) Toast('活动已结束')
            } else {
                throw new Error(res)
            }
        } catch (err) {
            console.warn(err)
        }
    },
    async getMyTaskList ({ commit, state }) {
        try {
            const res = await loadBargainUserTaskList({
                cellPhone: state.cellPhone,
                system: state.system,
                imei: state.imei,
                activityId: state.activityId
            })

            if (res.data && res.data.taskList) {
                commit('setMyTaskList', res.data.taskList)
                // console.log(111)

                // console.log(res.data.taskList[0].taskId
                // )
            } else {
                throw new Error(res)
            }
        } catch (err) {
            console.warn(err)
        }
    },
    async getPetList ({ commit, state }, searchPetName) {
        try {
            const res = await queryActivityBargainPetList({
                cellPhone: state.cellPhone,
                system: state.system,
                imei: state.imei,
                activityId: state.activityId,
                petName: searchPetName || ''
            })
            if (res.data) {
                commit('setPetList', res.data)
            } else {
                throw new Error(res)
            }
        } catch (err) {
            console.warn(err)
        }
    },
    async getToolList ({ commit, state }) {
        try {
            const res = await loadBargainPropList({
                cellPhone: state.cellPhone,
                system: state.system,
                imei: state.imei,
                activityId: state.activityId
            })
            if (res.data) {
                commit('setToolList', res.data)
            } else {
                throw new Error(res)
            }
        } catch (err) {
            console.warn(err)
        }
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
