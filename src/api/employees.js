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

export function addEmployeeList (data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

export function addEmployeeExcel (data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}

export function delEmployees (id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

export function saveStaffInfo (data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

export function getPersonalDetail (id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'GET'
  })
}

export function updatePersonalDetail (data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'PUT',
    data
  })
}

export function getJobDetail (id) {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'GET'
  })
}

export function updateJob (data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'PUT',
    data
  })
}
