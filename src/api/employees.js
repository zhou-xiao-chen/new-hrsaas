import request from '@/utils/request'

export function getSimpleList () {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
