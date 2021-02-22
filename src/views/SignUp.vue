<template>
  <div>
    <el-form ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
      style="background-color:#FFF;">
      <h3 class="login-title">欢迎注册</h3>
      <el-form-item label="账号"
        prop="username">
        <el-input type="text"
          placeholder="请输入账号"
          v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码"
        prop="password">
        <el-input type="password"
          placeholder="请输入密码"
          v-model="form.password" />
      </el-form-item>
      <el-form-item label="手机号码"
        prop="phone">
        <el-input type="text"
          placeholder="请输入密码"
          v-model="form.phone" />
      </el-form-item>
      </el-form-item>
      <el-button type="success"
        round
        v-on:click="onSubmit('loginForm')"
        style="float:right;">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { signUpAPI } from "@/api/user-api.js"
export default {
  name: "SignUp",
  data () {
    return {
      form: {
        username: '',
        password: '',
        phone: ""
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let args = { "phone": this.form.phone, "password": this.form.password, "nickname": this.form.username }
          signUpAPI(args).then(response => {
            if (response.code == 200) {
              this.$session.set("userInfo", response.data);
              this.$router.push("/Vocab");
            }
            else {
              this.$router.push("/SignUp");
            }
          })
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  height: 300px;
  margin: 150px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>