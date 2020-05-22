<template>
  <el-row type="flex" justify="center" align="middle" class="marjor-container">
    <el-col :span="6" class="little-container">
      <h2>MyNote</h2>
      <el-row>
        <el-steps :active="0" finish-status="success">
          <el-step title="验证邮箱"></el-step>
          <el-step title="设置密码"></el-step>
          <el-step title="完善资料"></el-step>
        </el-steps>
      </el-row>
      <br />
      <el-row v-if="step == 0">
        <el-form :model="userInfo" :rules="rules" ref="userInfo">
          <el-form-item prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="width:100%;" type="primary" :disabled="getCodeButtonDisabled"   @click="submitForm('userInfo')">获取验证码</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { format } from "../data.js";
import { req_getCodeForRegister,req_register } from "../api";
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      //用于修改按钮为可用
       this.$data.getCodeButtonDisabled = false
      callback();
    };
    return {
      getCodeButtonDisabled: true,
      step: 0,
      userInfo: {
        email: null,
        code: null,
        password: null
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {type: "email",message: "请输入正确的邮箱地址",trigger: "blur"},
          {validator: validateEmail,trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            req_getCodeForRegister(this.email).then(response => {
              //解析接口应答的json串
              let {message,success} = response;
              console.log(response)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
};
</script>

<style scoped>
.marjor-container {
  height: 100%;
}
h2 {
  text-align: center;
}
</style>