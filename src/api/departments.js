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

export function addDepartment (data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}