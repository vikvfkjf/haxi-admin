(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f0d1d41"],{"189b":function(e,t,a){"use strict";a("e5ff")},"62bf":function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"a",(function(){return l})),a.d(t,"c",(function(){return r})),a.d(t,"d",(function(){return i}));var n=a("b775");function o(e){return Object(n["a"])({url:"/v1/admin/review/phone-apply-list",method:"get",params:e})}function l(e){return Object(n["a"])({url:"/v1/admin/review/review-phone-apply",method:"post",data:e})}function r(e){return Object(n["a"])({url:"/v1/admin/company/phone-list",method:"get",params:e})}function i(e){return Object(n["a"])({url:"/v1/admin/company/admin-phone-list",method:"get",params:e})}},ca8e:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"number-list-container"},[e._m(0),a("div",{staticClass:"tables"},[a("div",{staticClass:"forms"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",inline:"",size:"mini"}},[a("el-form-item",{attrs:{label:"公司编号"}},[a("el-input",{attrs:{placeholder:"请输入公司编号"},model:{value:e.form.company_no,callback:function(t){e.$set(e.form,"company_no",t)},expression:"form.company_no"}})],1),a("el-form-item",{attrs:{label:"小号"}},[a("el-input",{attrs:{placeholder:"请输入小号"},model:{value:e.form.x_phone,callback:function(t){e.$set(e.form,"x_phone",t)},expression:"form.x_phone"}})],1),a("el-form-item",{attrs:{label:"创建时间"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.form.time,callback:function(t){e.$set(e.form,"time",t)},expression:"form.time"}})],1),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1)],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.list,"header-cell-style":{background:"#ececec"},height:"calc(100% - 119px)",size:"mini"}},[a("el-table-column",{attrs:{prop:"id",label:"id",width:"80"}}),a("el-table-column",{attrs:{prop:"company_no",label:"公司编号",width:"200"}}),a("el-table-column",{attrs:{prop:"company.name",label:"公司名称",width:"200"}}),a("el-table-column",{attrs:{prop:"app_no",label:"应用编号",width:"200"}}),a("el-table-column",{attrs:{prop:"city_name",label:"地区",width:"200"}}),a("el-table-column",{attrs:{prop:"phone_mode_name",label:"小号模式",width:"200"}}),a("el-table-column",{attrs:{prop:"x_phone",label:"小号",width:"200"}}),a("el-table-column",{attrs:{prop:"effect_time",label:"生效时间",width:"150"}}),a("el-table-column",{attrs:{prop:"expire_time",label:"失效时间",width:"150"}}),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("span",[e._v("空闲")]):e._e(),2==t.row.status?a("span",[e._v("使用中")]):e._e(),3==t.row.status?a("span",[e._v("禁用")]):e._e()]}}])})],1),a("el-pagination",{attrs:{background:"","current-page":e.pages.current_page,"page-sizes":[10,20,50,100],"page-size":e.pages.per_page,layout:"total, sizes, prev, pager, next, jumper",total:e.pages.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"title"},[a("h2",[e._v("小号通过列表")])])}],l=(a("2f62"),a("62bf")),r={name:"Number-list",components:{},data:function(){return{loading:!1,form:{x_phone:null,company_no:null,time:null},list:[],pages:{current_page:1,per_page:10,total:null}}},mounted:function(){this.form.company_no=this.$route.query.company_no?this.$route.query.company_no:null,this.getPhoneList()},methods:{handleSizeChange:function(e){this.pages.per_page=e,this.getPhoneList()},handleCurrentChange:function(e){this.pages.current_page=e,this.getPhoneList()},getPhoneList:function(){var e=this;this.loading=!0;var t={"equal[x_phone]":this.form.x_phone?this.form.x_phone:null,"equal[company_no]":this.form.company_no?this.form.company_no:null,"great_equal[created_at]":this.form.time?this.form.time[0]+" 00:00:00":null,"less_equal[created_at]":this.form.time?this.form.time[1]+" 23:59:59":null,page:this.pages.current_page,per_page:this.pages.per_page};Object(l["c"])(t).then((function(t){e.loading=!1,200==t.status_code&&(e.list=t.data.data,e.pages.total=t.data.total)}))},search:function(){console.log(this.form),this.pages.current_page=1,this.getPhoneList()},examine:function(e){this.$refs.examineDialog.show(e)},success:function(){this.getPhoneList()},detail:function(e){this.$refs.numberDialog.show(e)},bind:function(e){this.$refs.bindDialog.show(e)}}},i=r,s=(a("189b"),a("2877")),c=Object(s["a"])(i,n,o,!1,null,"4d4644bb",null);t["default"]=c.exports},e5ff:function(e,t,a){}}]);