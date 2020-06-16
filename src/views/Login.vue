<template>
  <el-row type="flex" justify="center" align="middle" class="marjor-container">
    <el-col :span="6" class="little-container">
      <h2>MyNote</h2>

      <el-row>
        <el-form :model="userInfo" :rules="rules" ref="userInfo">
          <el-form-item prop="email" label="邮箱地址">
            <el-input v-model="userInfo.email" placeholder="abc@xx.com"></el-input>
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="userInfo.password" placeholder="6到12位,英文字符和数字的组合"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              style="width:100%;"
              type="primary"
              :loading="getLoginBtnLoading"
              @click="submitLogin('userInfo')"
            >登录</el-button>

            <!-- 忘记密码和注册账号的按钮 -->
            <el-row>
              <el-col :span="8" class="other-way">
                <el-button type="text" @click="toPassword()">忘记密码 ？</el-button>
              </el-col>
              <el-col :span="8" class="other-way">
                <el-button type="text" @click="toRegister()">注册账号</el-button>
              </el-col>
              <el-col :span="8" class="other-way">
                <el-button type="text" @click="toCodeLogin()">验证码登录</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item></el-form-item>
        </el-form>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { format } from "../data.js";
import { req_login } from "../api";
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (!format.isPassword(value)) {
        return callback(new Error("请输入正确的密码格式"));
      }
      callback();
    };
    return {
      getLoginBtnLoading: false,
      userInfo: {
        email: null,
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
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改一下按钮是否加载中
          this.getLoginBtnLoading = true;
          req_login(this.userInfo).then(response => {
            //解析接口应答的json串
            let { message, code, data } = response;
            this.getLoginBtnLoading = false;
            if (code !== 0) {
              this.$message.error(message);
            } else {
              window.localStorage.setItem("token", data);
              this.$router.push({ path: "/Home" });
            }
          });
        }
      });
    },
    //跳转到重置密码页面
    toPassword() {
      this.$router.push({ path: "/Password" });
    },
    //跳转到注册页面
    toRegister() {
      this.$router.push({ path: "/Register" });
    },
    //跳转到账号密码登录页面
    toCodeLogin() {
      this.$router.push({ path: "/CodeLogin" });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.marjor-container {
  height: 100%;
}
h2,.other-way {
  text-align: center;
}
</style>