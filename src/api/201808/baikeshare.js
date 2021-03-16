import request from '@/utils/request'
const requestDomain = envConfig.requestDomain

// 获取百科详情 infoId res: type:1文本 type:2图片 type:3视频
export const encyclopediaInfo = data => {
    return request({
        url: `${requestDomain}/pet-api/encyclopedia/info`,
        data: data
    })
}
