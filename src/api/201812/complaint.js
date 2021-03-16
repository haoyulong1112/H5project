import request from '@/utils/request'

// 获取剩余充值名额
/*
{
    无
}
 */
export const submitData = data => {
    return request({
        url: `http://m.cwjia.cn/web/tools/api/complaintlog`,
        data: data
    })
}
