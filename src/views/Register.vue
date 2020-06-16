<template>
  <el-row type="flex" justify="center" align="middle" class="marjor-container">
    <el-col :span="6" class="little-container">
      <h2>MyNote</h2>

      <el-row>
        <el-steps :active="step" finish-status="success">
          <el-step title="验证邮箱"></el-step>
          <el-step title="设置密码"></el-step>
          <el-step title="完善资料"></el-step>
        </el-steps>
      </el-row>
      <br />
      <!-- 验证码第一个tab -->
      <el-row v-if="step == 0">
        <el-form :model="userInfo" :rules="rules" ref="userInfo">
          <el-form-item prop="email" label="邮箱地址">
            <el-input v-model="userInfo.email" placeholder="abc@xx.com"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              style="width:100%;"
              type="primary"
              :loading="getCodeBtnLoading"
              @click="submitGetCode('userInfo')"
            >获取验证码</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 设置密码第二个tab -->
      <el-row v-if="step == 1">
        <el-form :model="userInfo" :rules="rules" ref="userInfo">
          <el-form-item prop="code" label="验证码">
            <el-input v-model="userInfo.code" placeholder="6位长度的验证码"></el-input>
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="userInfo.password" placeholder="6到12位,英文字符和数字的组合"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              style="width:100%;"
              type="primary"
              :loading="getCodeBtnLoading"
              @click="submitRegister('userInfo')"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <el-row>
              <el-col :span="8">
                <el-button type="text" @click="toLogin()">用户登录</el-button>
              </el-col>
              
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { format } from "../data.js";
import { req_getCodeForRegister, req_register } from "../api";
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      if (!format.isEmail(value)) {
        return callback(new Error("请输入正确的邮箱地址"));
      }
      //用于修改按钮为可用
      this.$data.getCodeBtnDisabled = false;
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (!format.isPassword(value)) {
        return callback(new Error("请输入正确的密码格式"));
      }
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
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ],
        password: [
            {required: true, message: "请输入密码", trigger: 'blur'},
             { validator: validatePassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitGetCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改一下按钮是否加载中
          this.getCodeBtnLoading = true;
          req_getCodeForRegister(this.userInfo.email).then(response => {
            //解析接口应答的json串
            let { message, code } = response;
            this.getCodeBtnLoading = false;
            if (code !== 0) {
              this.$message.error(message);
            } else {
              //发送成功了
              this.$notify({
                title: "成功",
                message: "验证码已发送到您的邮箱，请及时查收",
                type: "success"
              });
              //到下一步流程
              this.step++;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改一下按钮是否加载中
          this.getCodeBtnLoading = true;
          req_register(this.userInfo)
            .then(response => {
              //解析接口应答的json串
              let { message, code } = response;
              this.getCodeBtnLoading = false;
              if (code !== 0) {
                this.$message.error(message);
              } else {
                //注册成功
                this.$notify({
                  title: "注册成功",
                  message:
                    "您的账号：" +
                    this.userInfo.email +
                    " 已成功注册，可以登录了",
                  type: "success"
                });
                this.$router.push({
                  path: "/Login"
                });
              }
            })
            .catch(response => {
              let { message } = response;
              this.$message.error(message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push({path: "/Login"})
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