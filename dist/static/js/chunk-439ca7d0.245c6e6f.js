(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-439ca7d0"],{"256f":function(e,t,s){"use strict";s("56c3")},4565:function(e,t,s){"use strict";s("6bec")},"56c3":function(e,t,s){},"6bec":function(e,t,s){},d5c2:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-container"},[s("div",{staticClass:"login-box"},[s("div",{staticClass:"box-left"},[s("el-form",{ref:"registerForm",staticClass:"login-form",attrs:{model:e.registerForm,rules:e.loginRules,"auto-complete":"off","label-position":"left"}},[s("div",{staticClass:"title-container"},[s("h3",{staticClass:"title"},[e._v("注册")]),s("p",[s("i",{staticClass:"iconfont icon-a-Iconly-Bulk-InfoSquare",staticStyle:{color:"#ff416c"}}),e._v(" 温馨提示：所填手机号码、邮箱将用于接收系统重要通知消息，请务必填写企业用户真实、可联系的联系方式。")])]),s("el-form-item",{attrs:{prop:"name"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"user"}})],1),s("el-input",{ref:"name",attrs:{placeholder:"请输入用户名",name:"name",type:"text","auto-complete":"off"},model:{value:e.registerForm.name,callback:function(t){e.$set(e.registerForm,"name",t)},expression:"registerForm.name"}})],1),s("el-form-item",{attrs:{prop:"phone"}},[s("span",{staticClass:"svg-container"},[s("i",{staticClass:"iconfont icon-Iconly-Bulk-Calling"})]),s("el-input",{ref:"phone",attrs:{placeholder:"请输入手机号",name:"phone",type:"text","auto-complete":"off"},model:{value:e.registerForm.phone,callback:function(t){e.$set(e.registerForm,"phone",t)},expression:"registerForm.phone"}})],1),s("el-form-item",{attrs:{prop:"verify_code"}},[s("span",{staticClass:"svg-container"},[s("i",{staticClass:"iconfont icon-a-Iconly-Bulk-ShieldDone"})]),s("el-input",{ref:"verify_code",staticStyle:{width:"160px"},attrs:{placeholder:"请输入图形验证码",name:"verify_code",type:"text","auto-complete":"off"},model:{value:e.registerForm.verify_code,callback:function(t){e.$set(e.registerForm,"verify_code",t)},expression:"registerForm.verify_code"}}),s("img",{staticClass:"picValid",attrs:{src:e.verifyCodeImg,alt:""},on:{click:e.resetVerifyCodeImg}})],1),s("el-form-item",{attrs:{prop:"company_name"}},[s("span",{staticClass:"svg-container"},[s("i",{staticClass:"iconfont icon-Iconly-Bulk-Work"})]),s("el-input",{ref:"company_name",attrs:{placeholder:"请输入公司名称",name:"company_name",type:"text","auto-complete":"off"},model:{value:e.registerForm.company_name,callback:function(t){e.$set(e.registerForm,"company_name",t)},expression:"registerForm.company_name"}})],1),s("el-form-item",{attrs:{prop:"password"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"password"}})],1),s("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"请输入密码",name:"password","auto-complete":"off"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.registerForm.password,callback:function(t){e.$set(e.registerForm,"password",t)},expression:"registerForm.password"}}),s("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[s("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),s("el-button",{staticClass:"submitBtn",attrs:{loading:e.loading,type:"danger",round:""},nativeOn:{click:function(t){return t.preventDefault(),e.register(t)}}},[e._v("注册")])],1)],1),s("div",{staticClass:"box-right"},[s("h2",[e._v("已有帐号？")]),s("p",[e._v("请使用您的帐号进行登录")]),s("el-button",{attrs:{round:""},on:{click:e.toLogin}},[e._v("登录")])],1)])])},o=[],i=(s("61f7"),s("c24f")),a={name:"Login",data:function(){var e=function(e,t,s){0===t.length?s(new Error("请输入密码")):s()};return{verifyCodeImg:null,verifyCodeKey:null,registerForm:{name:"",phone:"",verify_code:"",verify_key:"",company_name:"",password:""},loginRules:{name:[{required:!0,trigger:"blur",message:"请输入用户名"}],phone:[{required:!0,trigger:"blur",message:"请输入手机号"}],verify_code:[{required:!0,trigger:"blur",message:"请输入图形验证码"}],company_name:[{required:!0,trigger:"blur",message:"请输入公司名称"}],password:[{required:!0,trigger:"blur",validator:e}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{},mounted:function(){this.getVerifyCode()},methods:{getVerifyCode:function(){var e=this;Object(i["c"])().then((function(t){200==t.status_code&&(e.verifyCodeImg=t.data.img,e.verifyCodeKey=t.data.key)}))},resetVerifyCodeImg:function(){this.getVerifyCode()},register:function(){var e=this;this.registerForm.verify_key=this.verifyCodeKey,this.$refs["registerForm"].validate((function(t){t&&Object(i["e"])(e.registerForm).then((function(t){200==t.status_code?(e.$message({message:"注册成功",type:"success"}),e.toLogin()):e.$message({message:t.err_msg,type:"error"})}))}))},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},toLogin:function(){this.$router.push({path:"/login"})}}},n=a,c=(s("4565"),s("256f"),s("2877")),l=Object(c["a"])(n,r,o,!1,null,"5ac8edc0",null);t["default"]=l.exports}}]);