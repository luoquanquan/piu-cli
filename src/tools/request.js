/*
 * @Author: luoquanquan
 * @Date: 2018-11-23 10:44:39
 * @LastEditors: luoquanquan
 * @LastEditTime: 2018-12-19 19:46:50
 */

const axios = require('axios')
const { baseURL, auth } = require('../../config')

const instance = axios.create({
  baseURL,
  timeout: 6e4,
  headers: {
    Authorization: `token ${auth.split(' ').reverse().join('')}`,
  }
})

// Add a request interceptor
instance.interceptors.request.use(config => config,
  error => Promise.reject(error))

// Add a response interceptor
instance.interceptors.response.use(response => response.data,
  error => Promise.reject(error))

module.exports = instance
