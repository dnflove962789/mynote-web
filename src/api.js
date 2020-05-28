import axios from 'axios';

let api = 'api'
let form = 'form'

let nologin = 'http://127.0.0.1:8123/no-login'

/**
 * 获取注册验证码
 */
export const req_getCodeForRegister = (email) => {
    return axios.get(nologin + '/getCodeForRegister', {
        params: {
            email:email
        }
    }).then(res => res.data).catch(err => err)
}

export const req_register = (user) => {
    return axios.post(nologin + '/register', {
        email: user.email,
        password: user.password,
        code: user.code
    }).then(res => res.data).catch(err => err)
}
