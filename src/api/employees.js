import request from '@/utils/request'

export function getSimpleList () {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

export function getEmployeeList (params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

export function delEmployees (id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
