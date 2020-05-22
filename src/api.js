import axios from 'axios';

let api = 'api'
let form = 'form'

let base = 'no-login'

/**
 * 获取注册验证码
 */
export const req_getCodeForRegister = (email) => {
    return axios.get(base + '/getCodeForRegister', {
        params: {
            email:email
        }
    }).then(res => res.data).catch(err => err)
}

export const req_register = (user) => {
    return axios.post(base + '/register', {
        email: user.email,
        password: user.password,
        code: user.code
    }).then(res => res.data).catch(err => err)
}
