/*
utils/clone.js
深拷贝js对象
@author jinhuajie <jinhuajie@haotang365.com.cn>
*/

function clone (value) {
    if (Array.isArray(value)) {
        return value.map(clone)
    } else if (value && typeof value === 'object') {
        let res = {};
        for (let key in value) {
            res[key] = clone(value[key]);
        }
        return res
    } else {
        return value
    }
}
export default clone
