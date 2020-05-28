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
            <el-button style="width:100%;" type="primary" :disabled="getCodeBtnDisabled"  :loading="getCodeBtnLoading"  @click="submitForm('userInfo')">获取验证码</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <el-row v-if="step == 1">
        <el-form :model="userInfo" :rules="rules" ref="userInfo">
          <el-form-item prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="width:100%;" type="primary" :disabled="getCodeBtnDisabled"  :loading="getCodeBtnLoading"  @click="submitForm('userInfo')">获取验证码</el-button>
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
      if(!format.isEmail(value)){
        return callback(new Error('请输入正确的邮箱地址'));
      }
      //用于修改按钮为可用
       this.$data.getCodeBtnDisabled = false
      callback();
    };
    return {
      step: 0,
      getCodeBtnDisabled: true,
      getCodeBtnLoading: false,
      userInfo: {
        email: null,
        code: null,
        password: null
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {validator: validateEmail,trigger: 'change'}
        ]
      }
    };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //修改一下按钮是否加载中
            this.getCodeBtnLoading = true
            req_getCodeForRegister(this.userInfo.email).then(response => {
              //解析接口应答的json串
              let {message,code} = response;
              this.getCodeBtnLoading = false
             if(code !== 0){
               this.$message.error('邮件发送失败');
             }else{
               //发送成功了
               this.$notify({
                title: '成功',
                message: '验证码已发送到您的邮箱，请及时查收',
                type: 'success'
              });
              //到下一步流程
              this.step++;
             }
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