(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b84376c"],{"03be":function(e,t,a){"use strict";a("f116")},"1ca7":function(e,t,a){"use strict";a("6247")},"1e3b":function(e,t,a){},"399e":function(e,t,a){"use strict";a("740e")},4921:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"project-index-container"},[a("div",{staticClass:"title"},[a("h2",[e._v("代理成员列表")]),a("el-button",{attrs:{size:"mini"},on:{click:e.add}},[e._v("添加代理")])],1),a("div",{staticClass:"tables"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,"header-cell-style":{background:"#ececec"},height:"calc(100% - 60px)",size:"mini","row-key":"user_no","tree-props":{children:"childrens"},"default-expand-all":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{prop:"user_no",label:"编号",width:"200"}}),a("el-table-column",{attrs:{prop:"name",label:"用户名",width:"100"}}),a("el-table-column",{attrs:{prop:"role",label:"角色",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.role?a("span",[e._v("超级管理员")]):e._e(),2==t.row.role?a("span",[e._v("管理员")]):e._e(),3==t.row.role?a("span",[e._v("代理")]):e._e(),4==t.row.role?a("span",[e._v("业务员")]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("span",[e._v("启用")]):e._e(),2==t.row.status?a("span",[e._v("禁用")]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"phone",label:"手机号",width:"120"}}),a("el-table-column",{attrs:{prop:"email",label:"邮箱",width:"100"}}),a("el-table-column",{attrs:{prop:"brokerage_percent",label:"抽成百分比",width:"100"}}),a("el-table-column",{attrs:{prop:"total_brokerage",label:"总抽成",width:"100"}}),a("el-table-column",{attrs:{prop:"member_in_sum",label:"用户投入金额",width:"100"}}),a("el-table-column",{attrs:{prop:"member_out_sum",label:"用户派送金额",width:"100"}}),a("el-table-column",{attrs:{prop:"game_wallet_list",label:"地址列表",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.game_wallet_list,(function(t,n){return a("div",{key:n},[1==t.wallet_kind?a("span",[e._v("ERC20:"+e._s(t.wallet_address))]):e._e(),2==t.wallet_kind?a("span",[e._v("TRC20:"+e._s(t.wallet_address))]):e._e(),3==t.wallet_kind?a("span",[e._v("BEP20:"+e._s(t.wallet_address))]):e._e()])}))}}])}),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){return e.updateAgent(t.row)}}},[e._v("修改")]),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.deleteAgent(t.row)}}},[e._v("删除")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.pages.page,"page-sizes":[10,20,50,100],"page-size":e.pages.per_page,layout:"total, sizes, prev, pager, next, jumper",background:"",total:e.pages.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("info-dialog",{ref:"infoDialog",on:{success:e.success}}),a("add-dialog",{ref:"addDialog",on:{success:e.success}})],1)},s=[],l=a("2f62"),o=a("bbbc"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"price-dialog"},[a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{title:"修改成员",visible:e.dialogVisible,width:"50%","before-close":e.handleClose,center:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"content"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px",size:"mini",rules:e.rules}},[a("el-form-item",{attrs:{label:"编号",prop:"user_no"}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.user_no,callback:function(t){e.$set(e.form,"user_no",t)},expression:"form.user_no"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-option",{attrs:{label:"开启",value:1}},[e._v("开启")]),a("el-option",{attrs:{label:"关闭",value:2}},[e._v("关闭")])],1)],1),a("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[a("el-input",{model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:e.handleClose}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.sure}},[e._v("确 定")])],1)])],1)},i=[],u=a("5530"),c=(a("a9e3"),a("5f87")),d={name:"info-dialog",data:function(){return{dialogVisible:!1,loading:!1,val:{},passList:[],form:{user_no:null,password:null,status:null,phone:null,email:null,eth_withdraw_sum:null,tron_withdraw_sum:null},rules:{},action:"https://happyhash.xyz/bkapi/api/v1/admin/upload",headers:{Authorization:Object(c["a"])()}}},mounted:function(){},computed:Object(u["a"])({},Object(l["b"])(["user_info"])),methods:{show:function(e){console.log(e),this.val=e,this.form={user_no:e.user_no,status:e.status,phone:e.phone,email:e.email,eth_withdraw_sum:e.eth_withdraw_sum,tron_withdraw_sum:e.tron_withdraw_sum},this.dialogVisible=!0},sure:function(){var e=this;this.$refs["form"].validate((function(t){if(t){e.loading=!0;var a={user_no:String(e.form.user_no),password:String(e.form.password),status:Number(e.form.status),phone:String(e.form.phone),email:String(e.form.email),eth_withdraw_sum:Number(e.form.eth_withdraw_sum),tron_withdraw_sum:Number(e.form.tron_withdraw_sum)};Object(o["d"])(a).then((function(t){if(e.loading=!1,200!=t.status_code)return e.$notify({title:"提示",message:"修改失败",type:"error"}),!1;e.$notify({title:"提示",message:"修改成功",type:"success"}),e.handleClose(),e.$emit("success")}))}}))},handleClose:function(){this.dialogVisible=!1,this.reset()},reset:function(){this.loading=!1,this.form={user_no:null,password:null,status:null,phone:null,email:null,eth_withdraw_sum:null,tron_withdraw_sum:null},this.$refs.form.clearValidate()}}},f=d,p=(a("621b"),a("399e"),a("2877")),m=Object(p["a"])(f,r,i,!1,null,"f9490776",null),h=m.exports,g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"add-dialog"},[a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{title:"新增后台人员",visible:e.dialogVisible,width:"50%","before-close":e.handleClose,center:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"content"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px",size:"mini",rules:e.rules}},[a("el-form-item",{attrs:{label:"用户名",prop:"name"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),a("el-form-item",{attrs:{label:"角色",prop:"role"}},[a("el-select",{model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}},[1==e.user_info.role?a("el-option",{attrs:{label:"管理员",value:2}}):e._e(),1==e.user_info.role||2==e.user_info.role?a("el-option",{attrs:{label:"代理",value:3}}):e._e(),a("el-option",{attrs:{label:"业务员",value:4}})],1)],1),a("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[a("el-input",{model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:e.handleClose}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.sure}},[e._v("确 定")])],1)])],1)},b=[],_=(a("b0c0"),{name:"add-dialog",data:function(){return{dialogVisible:!1,loading:!1,list:[],form:{name:null,password:null,role:null,phone:null},rules:{name:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],role:[{required:!0,message:"请选择角色",trigger:"blur"}]}}},computed:Object(u["a"])({},Object(l["b"])(["user_info"])),mounted:function(){},methods:{show:function(){this.dialogVisible=!0},sure:function(){var e=this;this.$refs["form"].validate((function(t){if(t){e.loading=!0;var a={name:e.form.name,password:String(e.form.password),role:Number(e.form.role),phone:String(e.form.phone)};Object(o["a"])(a).then((function(t){if(e.loading=!1,200!=t.status_code)return e.$notify({title:"提示",message:"新增失败",type:"error"}),!1;e.$notify({title:"提示",message:"新增成功",type:"success"}),e.handleClose(),e.$emit("success")})).catch((function(t){e.loading=!1}))}}))},handleClose:function(){this.dialogVisible=!1,this.reset()},reset:function(){this.loading=!1,this.form={name:null,prefix_address:null,project_type:null,currency:null,contract_address:null,receiver_address:null,be_auth_address:null},this.$refs.form.clearValidate()}}}),w=_,v=(a("5630"),a("03be"),Object(p["a"])(w,g,b,!1,null,"5fc9da56",null)),y=v.exports,k={name:"project-index",components:{infoDialog:h,addDialog:y},data:function(){return{base:"https://happyhash.xyz/bkapi",list:[],disabled:!0,multipleSelection:[],pages:{page:1,per_page:10,total:null}}},mounted:function(){this.getAgentList()},methods:{getAgentList:function(){var e=this,t={page:this.pages.page,per_page:this.pages.per_page};Object(o["c"])(t).then((function(t){console.log(t),200==t.status_code&&(e.list=t.data.data,e.pages.total=t.data.total)}))},handleSelectionChange:function(e){this.multipleSelection=e,console.log(e),1==e.length?this.disabled=!1:this.disabled=!0},handleSizeChange:function(e){this.pages.per_page=e,this.getAgentList()},handleCurrentChange:function(e){this.pages.page=e,this.getAgentList()},updateAgent:function(e){this.$refs.infoDialog.show(e)},add:function(){this.$refs.addDialog.show()},success:function(){this.getAgentList()},deleteAgent:function(e){var t=this;console.log(e),this.$confirm("此操作将删除该代理, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var a={user_no:String(e.user_no)};Object(o["b"])(a).then((function(e){200==e.status_code?(t.$message({type:"success",message:"删除成功!"}),t.getAgentList()):t.$message({type:"error",message:"删除失败"})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))}}},C=k,$=(a("1ca7"),Object(p["a"])(C,n,s,!1,null,"7cff178a",null));t["default"]=$.exports},5630:function(e,t,a){"use strict";a("1e3b")},"621b":function(e,t,a){"use strict";a("ae16")},6247:function(e,t,a){},"740e":function(e,t,a){},a9e3:function(e,t,a){"use strict";var n=a("83ab"),s=a("da84"),l=a("94ca"),o=a("6eeb"),r=a("5135"),i=a("c6b6"),u=a("7156"),c=a("c04e"),d=a("d039"),f=a("7c73"),p=a("241c").f,m=a("06cf").f,h=a("9bf2").f,g=a("58a8").trim,b="Number",_=s[b],w=_.prototype,v=i(f(w))==b,y=function(e){var t,a,n,s,l,o,r,i,u=c(e,!1);if("string"==typeof u&&u.length>2)if(u=g(u),t=u.charCodeAt(0),43===t||45===t){if(a=u.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:n=2,s=49;break;case 79:case 111:n=8,s=55;break;default:return+u}for(l=u.slice(2),o=l.length,r=0;r<o;r++)if(i=l.charCodeAt(r),i<48||i>s)return NaN;return parseInt(l,n)}return+u};if(l(b,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var k,C=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof C&&(v?d((function(){w.valueOf.call(a)})):i(a)!=b)?u(new _(y(t)),a,C):y(t)},$=n?p(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;$.length>x;x++)r(_,k=$[x])&&!r(C,k)&&h(C,k,m(_,k));C.prototype=w,w.constructor=C,o(s,b,C)}},ae16:function(e,t,a){},bbbc:function(e,t,a){"use strict";a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return o})),a.d(t,"b",(function(){return r}));var n=a("b775");function s(e){return Object(n["a"])({url:"/v1/admin/admin-manage/list",method:"get",params:e})}function l(e){return Object(n["a"])({url:"/v1/admin/admin-manage/add",method:"post",data:e})}function o(e){return Object(n["a"])({url:"/v1/admin/admin-manage/update",method:"post",data:e})}function r(e){return Object(n["a"])({url:"/v1/admin/admin-manage/delete/"+e.user_no,method:"delete",data:e})}},f116:function(e,t,a){}}]);