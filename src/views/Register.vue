<template>
  <el-row >
    <el-col :span="10" :offset="7" class="little-container">
      <el-row>
        <el-steps :active="0" finish-status="success">
          <el-step title="验证邮箱"></el-step>
          <el-step title="设置密码"></el-step>
          <el-step title="完善资料"></el-step>
        </el-steps>
      </el-row>

      <el-row v-if="step == 0">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">获取验证码</el-button>
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
      step: 0,
      userInfo: {
        email: null,
        code: null,
        password: null
      }
    };
  }
};
</script>

<style scoped>
</style>