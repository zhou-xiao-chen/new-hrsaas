import request from '@/utils/request'

export function getCompanyList () {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

export function delDepartment (id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

export function setDepartment (id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}

export function putDepartment (data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}

export function addDepartment (data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
