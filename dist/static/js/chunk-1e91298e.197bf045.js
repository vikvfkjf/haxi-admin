(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e91298e"],{"24cd":function(e,t,a){"use strict";a("2e02")},"2e02":function(e,t,a){},"47b4":function(e,t,a){"use strict";a("8255")},"4ec4":function(e,t,a){"use strict";a("57a4")},"57a4":function(e,t,a){},8255:function(e,t,a){},"989e":function(e,t,a){"use strict";a("e850")},"9feb":function(e,t,a){},a9e3:function(e,t,a){"use strict";var o=a("83ab"),n=a("da84"),r=a("94ca"),s=a("6eeb"),l=a("5135"),i=a("c6b6"),m=a("7156"),u=a("c04e"),c=a("d039"),d=a("7c73"),f=a("241c").f,p=a("06cf").f,_=a("9bf2").f,b=a("58a8").trim,g="Number",h=n[g],v=h.prototype,y=i(d(v))==g,w=function(e){var t,a,o,n,r,s,l,i,m=u(e,!1);if("string"==typeof m&&m.length>2)if(m=b(m),t=m.charCodeAt(0),43===t||45===t){if(a=m.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(m.charCodeAt(1)){case 66:case 98:o=2,n=49;break;case 79:case 111:o=8,n=55;break;default:return+m}for(r=m.slice(2),s=r.length,l=0;l<s;l++)if(i=r.charCodeAt(l),i<48||i>n)return NaN;return parseInt(r,o)}return+m};if(r(g,!h(" 0o1")||!h("0b1")||h("+0x1"))){for(var k,$=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof $&&(y?c((function(){v.valueOf.call(a)})):i(a)!=g)?m(new h(w(t)),a,$):w(t)},x=o?f(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;x.length>C;C++)l(h,k=x[C])&&!l($,k)&&_($,k,p(h,k));$.prototype=v,v.constructor=$,s(n,g,$)}},aa90:function(e,t,a){"use strict";a("9feb")},bbbc:function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return l}));var o=a("b775");function n(e){return Object(o["a"])({url:"/v1/admin/admin-manage/list",method:"get",params:e})}function r(e){return Object(o["a"])({url:"/v1/admin/admin-manage/add",method:"post",data:e})}function s(e){return Object(o["a"])({url:"/v1/admin/admin-manage/update",method:"post",data:e})}function l(e){return Object(o["a"])({url:"/v1/admin/admin-manage/delete/"+e.user_no,method:"delete",data:e})}},cadb:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));a("ac1f"),a("5319"),a("4d63"),a("25f0");function o(e,t){/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));var a={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds()};for(var o in a)if(new RegExp("(".concat(o,")")).test(t)){var r=a[o]+"";t=t.replace(RegExp.$1,1===RegExp.$1.length?r:n(r))}return t}function n(e){return("00"+e).substr(e.length)}},e850:function(e,t,a){},f2f4:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"member-index-container"},[a("div",{staticClass:"title"},[a("h2",[e._v("会员列表")]),a("el-button",{attrs:{size:"mini"},on:{click:e.batchRefresh}},[e._v("批量刷新余额")])],1),a("div",{staticClass:"tables"},[a("div",{staticClass:"forms"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"100px",inline:"",size:"mini"}},[a("el-form-item",{attrs:{label:"地址"}},[a("el-input",{model:{value:e.form.wallet_address,callback:function(t){e.$set(e.form,"wallet_address",t)},expression:"form.wallet_address"}})],1),1==e.user_info.role?a("el-form-item",{attrs:{label:"所属代理"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.agent_name,callback:function(t){e.$set(e.form,"agent_name",t)},expression:"form.agent_name"}},[a("el-option",{key:0,attrs:{label:"全部",value:""}}),e._l(e.agent,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.name}})}))],2)],1):e._e(),a("el-form-item",{attrs:{label:"推广码"}},[a("el-input",{model:{value:e.form.promo_code,callback:function(t){e.$set(e.form,"promo_code",t)},expression:"form.promo_code"}})],1),a("el-form-item",{attrs:{label:"来源推广码"}},[a("el-input",{model:{value:e.form.from_promo_code,callback:function(t){e.$set(e.form,"from_promo_code",t)},expression:"form.from_promo_code"}})],1),a("el-form-item",{attrs:{label:"授权状态"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.auth_status,callback:function(t){e.$set(e.form,"auth_status",t)},expression:"form.auth_status"}},[a("el-option",{attrs:{label:"全部",value:""}}),a("el-option",{attrs:{label:"已授权",value:1}}),a("el-option",{attrs:{label:"未授权",value:2}})],1)],1),a("el-form-item",{attrs:{label:"创建时间"}},[a("el-date-picker",{attrs:{"value-format":"timestamp",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.form.time,callback:function(t){e.$set(e.form,"time",t)},expression:"form.time"}})],1),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.list,"header-cell-style":{background:"#ececec"},height:"calc(100% - 150px)",size:"mini","row-key":"id","tree-props":{children:"childrens"}}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{prop:"member_no",label:"会员编号",width:"100"}}),e._v("、 "),a("el-table-column",{attrs:{prop:"promo_code",label:"推广码",width:"100"}}),a("el-table-column",{attrs:{prop:"from_promo_code",label:"来源推广码",width:"100"}}),a("el-table-column",{attrs:{prop:"wallet_address",label:"会员钱包地址",width:"100"}}),a("el-table-column",{attrs:{prop:"auth_status",label:"是否授权",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.auth_status?a("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("已授权")]):e._e(),2==t.row.auth_status?a("el-button",{attrs:{type:"danger",size:"mini"}},[e._v("未授权")]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"balance_usdt",label:"钱包余额（usdt）",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{float:"left",width:"70px","text-align":"center","line-height":"30px"}},[e._v(e._s(t.row.balance_usdt))]),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"info",size:"mini"},on:{click:function(a){return e.balanceRefresh(t.row)}}},[e._v("更新余额 ")])]}}])}),a("el-table-column",{attrs:{prop:"top_admin_user.name",label:"所属代理或业务员",width:"100"}}),a("el-table-column",{attrs:{prop:"from_promo_code",label:"来源推广码",width:"100"}}),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("span",[e._v("未划转")]):e._e(),2==t.row.status?a("span",[e._v("已划转")]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"member_type",label:"会员类型",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.member_type?a("span",[e._v("以太坊")]):e._e(),2==t.row.member_type?a("span",[e._v("波场")]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"belong_user_type",label:"会员所属类型",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.belong_user_type?a("span",[e._v("后台人员推广")]):e._e(),2==t.row.belong_user_type?a("span",[e._v("会员推广")]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"earn_usdt",label:"usdt收益",width:"100"}}),a("el-table-column",{attrs:{prop:"last_conn_ip",label:"最后登录ip",width:"100"}}),a("el-table-column",{attrs:{prop:"created_at",label:"创建时间",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("formatDate")(t.row.created_at)))])]}}])}),a("el-table-column",{attrs:{prop:"last_conn_time",label:"最后登录时间",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("formatDate")(t.row.last_conn_time)))])]}}])}),a("el-table-column",{attrs:{prop:"",label:"操作",width:"500"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){return e.updateMember(t.row)}}},[e._v("修改")]),1==e.user_info.role?a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){return e.dist(t.row)}}},[e._v("分配后台人员")]):e._e(),3!=e.user_info.role?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.transfer(t.row)}}},[e._v("划转")]):e._e(),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.lookEarn(t.row)}}},[e._v("查看挖矿收益")]),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.deleteMember(t.row)}}},[e._v("删除")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.pages.page,"page-sizes":[10,20,50,100],"page-size":e.pages.per_page,layout:"total, sizes, prev, pager, next, jumper",background:"",total:e.pages.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("info-dialog",{ref:"infoDialog",on:{success:e.success}}),a("dist-dialog",{ref:"distDialog",on:{success:e.success}})],1)},n=[],r=a("5530"),s=a("2f62"),l=a("b775");function i(e){return Object(l["a"])({url:"/v1/admin/member-manage/list",method:"get",params:e})}function m(e){return Object(l["a"])({url:"/v1/admin/member-manage/update",method:"post",data:e})}function u(e){return Object(l["a"])({url:"/v1/admin/member-manage/delete/"+e.member_no,method:"delete",data:e})}function c(e){return Object(l["a"])({url:"/v1/admin/transfer-manage/transfer",method:"post",data:e})}function d(e){return Object(l["a"])({url:"/v1/admin/member-manage/balance-batch-refresh",method:"post",data:e})}function f(e){return Object(l["a"])({url:"/v1/admin/member-manage/balance-refresh",method:"post",data:e})}function p(e){return Object(l["a"])({url:"/v1/admin/member-manage/change-belong-admin",method:"post",data:e})}var _=a("cadb"),b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"info-dialog"},[a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{title:"修改会员",visible:e.dialogVisible,width:"50%","before-close":e.handleClose,center:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"content"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px",size:"mini",rules:e.rules}},[a("el-form-item",{attrs:{label:"会员ID",prop:"member_no"}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.member_no,callback:function(t){e.$set(e.form,"member_no",t)},expression:"form.member_no"}})],1),a("el-form-item",{attrs:{label:"来源推广码",prop:"from_promo_code"}},[a("el-input",{model:{value:e.form.from_promo_code,callback:function(t){e.$set(e.form,"from_promo_code",t)},expression:"form.from_promo_code"}})],1),a("el-form-item",{attrs:{label:"会员状态",prop:"status"}},[a("el-select",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-option",{attrs:{label:"未划转",value:1}}),a("el-option",{attrs:{label:"已划转",value:2}})],1)],1),a("el-form-item",{attrs:{label:"会员类型",prop:"member_type"}},[a("el-select",{model:{value:e.form.member_type,callback:function(t){e.$set(e.form,"member_type",t)},expression:"form.member_type"}},[a("el-option",{attrs:{label:"ETH",value:1}}),a("el-option",{attrs:{label:"TRX",value:2}})],1)],1),a("el-form-item",{attrs:{label:"usdt收益",prop:"balance_usdt"}},[a("el-input",{model:{value:e.form.balance_usdt,callback:function(t){e.$set(e.form,"balance_usdt",t)},expression:"form.balance_usdt"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:e.handleClose}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.sure}},[e._v("确 定")])],1)])],1)},g=[],h=(a("a9e3"),{name:"info-dialog",data:function(){return{dialogVisible:!1,loading:!1,val:{},passList:[],form:{member_no:null,from_promo_code:null,status:null,member_type:null,balance_usdt:null},rules:{member_no:[{required:!0,message:"请输入会员Id",trigger:"blur"}],from_promo_code:[{required:!0,message:"请输入来源推广码",trigger:"blur"}],status:[{required:!0,message:"请选择会员状态",trigger:"blur"}],member_type:[{required:!0,message:"请选择会员类型",trigger:"blur"}],balance_usdt:[{required:!0,message:"请输入usdt收益",trigger:"blur"}]}}},mounted:function(){},methods:{show:function(e){console.log("hahah",e),this.val=e,this.form={member_no:e.member_no,from_promo_code:e.from_promo_code,status:e.status,member_type:e.member_type,balance_usdt:e.balance_usdt},this.dialogVisible=!0},sure:function(){var e=this;this.$refs["form"].validate((function(t){if(t){e.loading=!0;var a={member_no:e.form.member_no,from_promo_code:e.form.from_promo_code,status:Number(e.form.status),member_type:Number(e.form.member_type),balance_usdt:e.form.balance_usdt};m(a).then((function(t){if(e.loading=!1,200!=t.status_code)return e.$notify({title:"提示",message:"修改失败",type:"error"}),!1;e.$notify({title:"提示",message:"修改成功",type:"success"}),e.handleClose(),e.$emit("success")}))}}))},handleClose:function(){this.dialogVisible=!1,this.reset()},reset:function(){this.loading=!1,this.form={member_no:null,from_promo_code:null,status:null,member_type:null,balance_usdt:null},this.$refs.form.clearValidate()}}}),v=h,y=(a("989e"),a("aa90"),a("2877")),w=Object(y["a"])(v,b,g,!1,null,"09849718",null),k=w.exports,$=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"info-dialog"},[a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{title:"修改会员",visible:e.dialogVisible,width:"50%","before-close":e.handleClose,center:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"content"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px",size:"mini",rules:e.rules}},[a("el-form-item",{attrs:{label:"会员编号",prop:"member_no"}},[a("el-input",{model:{value:e.form.member_no,callback:function(t){e.$set(e.form,"member_no",t)},expression:"form.member_no"}})],1),a("el-form-item",{attrs:{label:"后台人员",prop:"admin_user_no"}},[a("el-cascader",{attrs:{options:e.agent,props:e.props,clearable:""},model:{value:e.form.admin_user_no,callback:function(t){e.$set(e.form,"admin_user_no",t)},expression:"form.admin_user_no"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:e.handleClose}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.sure}},[e._v("确 定")])],1)])],1)},x=[],C=a("bbbc"),N={name:"info-dialog",data:function(){return{dialogVisible:!1,loading:!1,val:{},agent:[],form:{member_no:null,admin_user_no:null},rules:{member_no:[{required:!0,message:"请输入会员编号",trigger:"blur"}],admin_user_no:[{required:!0,message:"请输入后台人员编号",trigger:"blur"}]},props:{checkStrictly:!0,label:"name",value:"user_no",children:"childrens"}}},mounted:function(){},methods:{show:function(e){this.val=e,this.getAgentList(),this.form.member_no=e.member_no,this.dialogVisible=!0},getAgentList:function(){var e=this,t={page:1,per_page:500};Object(C["c"])(t).then((function(t){console.log(t),200==t.status_code&&(e.agent=t.data.data,console.log(e.agent,"agent"))}))},sure:function(){var e=this;this.$refs["form"].validate((function(t){if(t){e.loading=!0;var a=e.form.admin_user_no[e.form.admin_user_no.length-1],o={member_no:String(e.form.member_no),admin_user_no:String(a)};p(o).then((function(t){if(e.loading=!1,200!=t.status_code)return e.$notify({title:"提示",message:"修改失败",type:"error"}),!1;e.$notify({title:"提示",message:"修改成功",type:"success"}),e.handleClose(),e.$emit("success")}))}}))},handleClose:function(){this.dialogVisible=!1,this.reset()},reset:function(){this.loading=!1,this.form={member_no:null,admin_user_no:null},this.$refs.form.clearValidate()}}},S=N,z=(a("47b4"),a("4ec4"),Object(y["a"])(S,$,x,!1,null,"31d368ae",null)),E=z.exports,M={name:"member-index",components:{infoDialog:k,distDialog:E},data:function(){return{list:[],disabled:!0,agent:[],form:{wallet_address:null,agent_name:null,promo_code:null,from_promo_code:null,auth_status:null,agent_user_no:null,time:null},pages:{page:1,per_page:100,total:null},loading:!1}},computed:Object(r["a"])({},Object(s["b"])(["user_info"])),filters:{formatDate:function(e){e*=1e3;var t=new Date(e);return Object(_["a"])(t,"yyyy-MM-dd hh:mm")}},mounted:function(){this.getAgentList(),this.getMemberList()},methods:{getAgentList:function(){var e=this,t={};1==this.user_info.role&&(t={"equal[role]":2,page:1,per_page:500}),Object(C["c"])(t).then((function(t){e.agent=t.data.data,console.log(t)}))},getMemberList:function(){var e=this,t={"equal[wallet_address]":this.form.wallet_address?this.form.wallet_address:null,"equal[promo_code]":this.form.promo_code?this.form.promo_code:null,"equal[from_promo_code]":this.form.from_promo_code?this.form.from_promo_code:null,"like[agent_name]":this.form.agent_name?this.form.agent_name:null,"equal[auth_status]":this.form.auth_status?this.form.auth_status:null,"equal[agent_user_no]":this.form.agent_user_no?this.form.agent_user_no:null,"great_equal[created_at]":this.form.time?this.form.time[0]/1e3:null,"less_equal[created_at]":this.form.time?(this.form.time[1]+864e5)/1e3:null,page:this.pages.page,per_page:this.pages.per_page};i(t).then((function(t){console.log(t),200==t.status_code&&(e.list=t.data.data,e.pages.total=t.data.total)}))},transfer:function(e){var t=this;this.$confirm("是否确定划转改用户？, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){console.log("hahaha");var a={member_no:String(e.member_no)};console.log(a),c(a).then((function(e){200==e.status_code?(t.$message({type:"success",message:"划转成功!"}),t.getPoolList()):t.$message({type:"error",message:"划转失败，请重试"})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},lookEarn:function(e){this.$router.push({path:"/member/earn",query:{wallet_address:e.wallet_address}})},handleSizeChange:function(e){this.pages.per_page=e,this.getMemberList()},handleCurrentChange:function(e){this.pages.page=e,this.getMemberList()},updateMember:function(e){this.$refs.infoDialog.show(e)},dist:function(e){this.$refs.distDialog.show(e)},success:function(){this.getMemberList()},batchRefresh:function(){var e=this;this.loading=!0,d().then((function(t){e.loading=!1,200==t.status_code?e.getMemberList():e.$message({type:"error",message:"更新失败，请重试"}),console.log(t)}))},balanceRefresh:function(e){var t=this,a={member_no:e.member_no};this.loading=!0,f(a).then((function(e){t.loading=!1,200==e.status_code?t.getMemberList():t.$message({type:"error",message:"更新失败，请重试"})}))},deleteMember:function(e){var t=this;this.$confirm("此操作将删除该会员, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var a={member_no:String(e.member_no)};u(a).then((function(e){200==e.status_code?(t.$message({type:"success",message:"删除成功!"}),t.getMemberList()):t.$message({type:"error",message:"删除失败"})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},search:function(){this.pages.page=1,this.getMemberList()}}},O=M,I=(a("24cd"),Object(y["a"])(O,o,n,!1,null,"6454b9a7",null));t["default"]=I.exports}}]);