<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">全球新冠疫情检测系统</div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="first">
                    <el-form
                        :model="param"
                        :rules="rules"
                        ref="login"
                        label-width="0px"
                        class="ms-content"
                    >
                        <el-form-item prop="username">
                            <el-input v-model="param.username" placeholder="username">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                type="password"
                                placeholder="password"
                                v-model="param.password"
                                @keyup.enter.native="login()"
                            >
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" @click="login()">登录</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <el-form :model="rparam" ref="login" label-width="0px" class="ms-content">
                        <el-form-item prop="rusername">
                            <el-input v-model="rparam.rusername" placeholder="username">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="rpassword">
                            <el-input
                                type="password"
                                placeholder="password"
                                v-model="rparam.rpassword"
                                @keyup.enter.native="register()"
                            >
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="rcountry">
                            <el-input v-model="rparam.rcountry" placeholder="country">
                                <el-button slot="prepend" icon="el-icon-location"></el-button>
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" @click="register()">Register</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    data: function() {
        return {
            param: {
                username: 'lele',
                password: 'lele',
                rcountry: 'China'
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },

            rparam: {
                rusername: '',
                rpassword: '',
                rcountry: ''
            },

            activeName: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {},
        login() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    var _this = this;
                    $.ajax({
                        url: 'http://123.57.229.179:8083/user/login',
                        data: 'name=' + _this.param.username + '&password=' + _this.param.password,
                        type: 'POST',
                        datatype: 'text',
                        complete: function(data) {
                            if (data.status == 200) {
                                console.log(data.responseText);
                                if (data.responseText == 'succeed') {
                                    _this.$message.success('登录成功！');
                                    localStorage.setItem('ms_username', _this.param.username);
                                    _this.$router.push('/');
                                } else {
                                    _this.$message.error('账号或密码错误');
                                }
                            }
                        }
                    });

                    // localStorage.setItem('ms_username', this.param.username);
                    // this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        register() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    var _this = this;
                    $.ajax({
                        url: 'http://123.57.229.179:8083/user/register',
                        data:
                            'name=' + _this.rparam.rusername + '&password=' + _this.rparam.rpassword + '&country=' + _this.rparam.rcountry,
                        type: 'POST',
                        datatype: 'text',
                        complete: function(data) {
                            if (data.status == 200) {
                                if (data.responseText == 'fail') {
                                    _this.$message.error('用户已存在！');
                                } else {
                                    _this.$message.success('注册成功！');
                                }
                            }
                        }
                    });

                    // localStorage.setItem('ms_username', this.param.username);
                    // this.$router.push('/');
                } else {
                    this.$message.error('输入不能为空');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>