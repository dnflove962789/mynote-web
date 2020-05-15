<template>
  <el-row type="flex" justify="center" align="middle" class="marjor-container">
    <el-col :span="6"  class="little-container">
    <h2 >MyNote</h2>
      <el-row>
        <el-steps :active="0" finish-status="success">
          <el-step title="验证邮箱"></el-step>
          <el-step title="设置密码"></el-step>
          <el-step title="完善资料"></el-step>
        </el-steps>
      </el-row>
        <br/>
      <el-row v-if="step == 0">
        <el-form :model="userInfo" :rules="rules" ref="userInfo"  >
          <el-form-item prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="width:100%;" type="primary" :disabled="getCodeButtonDisabled">获取验证码</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
export default {
  data() {
    return {
      getCodeButtonDisabled: false,
      step: 0,
      userInfo: {
        email: null,
        code: null,
        password: null
      },
      rules: {
          email:[{required: true, message: '请输入邮箱',trigger: 'blur'}]
      }
    };
  }
};
</script>

<style scoped>
.marjor-container{
    height: 100%;
}
h2{
    text-align: center;
}
</style>