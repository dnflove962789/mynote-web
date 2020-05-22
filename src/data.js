const config = {
    nginxUrl: 'http://127.0.0.1:8081/nginx',
    type: {
        register: 0,
        login: 1,
        resetPassword: 2
    }
}

const format = {
  emailFormat: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"),
  isEmail(email){
		return this.emailFormat.test(email);
  },
  codeFormat:new RegExp("^[a-zA-Z0-9]{6}$"),
	isCode(code){
		return this.codeFormat.test(code);
	},
	passwordFormat:new RegExp("^[0-9A-Za-z]{6,16}$"),
	isPassword(password){
		return this.passwordFormat.test(password);
	},
	pattern: "yyyy-MM-dd"
}

export{
  config,format
}