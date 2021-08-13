<template>
  <div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="loginContainer"
      :rules="rules"
    >
      <h3 class="loginTitle">系统登入</h3>
      <!-- 登入相关输入框 -->
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model.trim="loginForm.username"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model.number="loginForm.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input
          type="text"
          v-model.number="loginForm.code"
          placeholder="点击图片更换验证码"
          style="width: 200px"
        />
        <img :src="captchaUrl" />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked" class="loginRemember"
          >记住我</el-checkbox
        >
        <el-button type="primary" style="width: 100%" @click="submitLogin"
          >登入</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      captchaUrl: "",
      loginForm: {
        username: "admin",
        password: "123",
        code: "",
      },
      checked: true,
      //   表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$message.success("登入成功");
        } else {
          this.$message.error("请输入所有字段");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loginContainer {
  width: 400px;
  margin: 100px auto;
  padding: 15px 35px 15px 35px;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 0 25px #ccc;
  .loginTitle {
    margin: 0 auto 45px auto;
    text-align: center;
  }
  .loginRemember {
    text-align: left;
    margin: 0 0 10px 0;
  }
}
</style>