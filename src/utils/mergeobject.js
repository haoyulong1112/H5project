/*
utils/mergeobject.js
合并对象属性
@author jinhuajie <jinhuajie@haotang365.com.cn>

注意：后覆盖前，返回新对象
*/
export default (obj1, obj2) => {
    let ret = {}
    for (let i in obj1) {
        ret[i] = obj1[i]
    }
    for (let i in obj2) {
        ret[i] = obj2[i]
    }
    return ret
}
