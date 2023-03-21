import request from '@/utils/request'

export function getRoleList (params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}

export function delRoleList (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

export function getRoleInfo (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

export function setRoleInfo (data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

export function addRoleInfo (data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

export function getCompanyInfo (id) {
  return request({
    url: `/company/${id}`,
    method: 'GET'
  })
}
