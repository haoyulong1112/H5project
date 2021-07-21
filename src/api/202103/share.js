import request from '@/utils/request'
const requestDomain = envConfig.requestDomain
console.log(requestDomain);
// 房间分享房间详情
export const queryRoomShareInfo = data => {
    return request({
        url: `${requestDomain}/club-room/room/queryRoomShareInfo`,
        data: data
    })
}
// 房间分享房间详情
export const queryProgrammeInfo = data => {
    return request({
        url: `${requestDomain}/club-room/programme/queryProgrammeInfo`,
        data: data
    })
}
