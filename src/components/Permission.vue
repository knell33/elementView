<template>
<el-container>
    <el-container>
        <el-header>
            <!-- 角色信息表格 -->
            <el-row>
                <h3 class="tabletitle ttop">角色信息</h3>
                <el-table el-header :data="RoleData" height="420px" @row-click="Rolelink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @row-contextmenu="RoleRightClick" @header-contextmenu="RoleRightClick">
                <el-table el-header :data="RoleData" height="460px" @row-click="Rolelink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @row-contextmenu="RoleRightClick">
                    <el-table-column label="角色名称" prop="Name">
                    </el-table-column>
                    <el-table-column label="备注" prop="Note">
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="LastModify">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" width="165px">
                    </el-table-column>
                </el-table>
            </el-row>
            <!-- 角色权限表格 -->
            <el-row>
                <h3 class="tabletitle tbuttom">角色权限</h3>
                <el-table el-header :data="PermissionData" height="420px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @row-contextmenu="PermissionRightClick" :row-class-name="MainAuthoritytableRowClassName">
                    <el-table-column label="主体名称" prop="MainName">
                    </el-table-column>
                    <el-table-column label="类型" prop="Type">
                    </el-table-column>
                    <el-table-column label="权限类型" prop="AuthorityType">
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="LastModify">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" width="165px">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-header>
    </el-container>

    <el-container>
        <el-header>
            <!-- 角色用户表格 -->
            <el-row>
                <div>
                    <div class="tabletitle ttop g-left">用户信息</div>
                    <div class="g-right" @click="ResourceElement()">资源要素管理</div>
                </div>
                <el-table el-header :data="RoleUesrData" height="420px" @row-click="RoleUesrlink" :row-class-name="RoleUsertableRowClassName" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @row-contextmenu="RoleUserRightClick" @header-contextmenu="RoleUserRightClick">
                <h3 class="tabletitle ttop">用户信息</h3>
                <el-table el-header :data="RoleUesrData" height="460px" @row-click="RoleUesrlink" :row-class-name="RoleUsertableRowClassName" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @row-contextmenu="RoleUserRightClick" @header-contextmenu="RoleUserheaderRightClick">
                    <el-table-column label="用户名" prop="UserName">
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="LastModify">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" width="165px">
                    </el-table-column>
                </el-table>
            </el-row>

            <!-- 用户权限表格 -->
            <el-row>
                <h3 class="tabletitle tbuttom">用户权限</h3>
                <el-table el-header :data="PersonnelAuthorityData" :row-class-name="PersonnelAuthoritytableRowClassName" height="420px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row>
                    <el-table-column label="主体名称" prop="MName">
                    </el-table-column>
                    <el-table-column label="类型" prop="Type">
                    </el-table-column>
                    <el-table-column label="权限类型" prop="AuthorityType">
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="LastModify">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" width="165px">
                    </el-table-column>
                </el-table>
            </el-row>

            <!-- 角色信息右键菜单 -->
            <div v-show="RoleVisible">
                <ul id="romenu" class="menu">
                    <li class="ms-item wrap-ms-right" @click="AddPermission('form')"><i class="el-icon-circle-plus icon1"></i>新增窗体权限</li>
                    <li class="ms-item wrap-ms-right" @click="AddPermission('other')"><i class="el-icon-s-order icon1"></i>新增其他权限</li>
                </ul>
            </div>
            <!-- 权限右键菜单 -->
            <div v-show="PermissionVisible">
                <ul id="pmmenu" class="menu">
                    <li class="ms-item wrap-ms-right" @click="DeletePermission()"><i class="el-icon-delete-solid icon1"></i>删除角色权限</li>
                </ul>
            </div>
            <!-- 角色用户右键菜单 -->
            <div v-show="RoleUserVisible">
                <ul id="roleusermenu" class="menu">
                    <li class="ms-item wrap-ms-right" @click="AddRoleuser()"><i class="el-icon-circle-plus icon1"></i>新增用户关系</li>
                    <li v-show = "disabledvalue" class="ms-item wrap-ms-right" @click="DeleteRoleUser()"><i class="el-icon-s-order icon1"></i>删除用户关系</li>
                </ul>
            </div>
            <!-- 新增窗体权限弹窗 -->
            <el-dialog :title="choosetitle" :visible.sync="dialogFormVisible" :before-close="Closedialog" width="30%">
                <el-form ref="form" :model="form" status-icon label-width="80px">
                    <el-form-item label="权限类型" class="g-select-width" prop="Type">
                        <el-select v-model="AuthorityType" class="g-select-width" multiple placeholder="请选择">
                    <el-form-item label="权限类型">
                        <el-select v-model="AuthorityType" multiple placeholder="请选择">
                            <el-option label="新增" value="新增"></el-option>
                            <el-option label="修改" value="修改"></el-option>
                            <el-option label="删除" value="删除"></el-option>
                            <el-option label="查询" value="查询"></el-option>
                            <el-option label="设计" value="设计"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-table ref="PagePermission" :data="PermissionAllData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" max-height="400">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="Name" label="名称" width="210">
                        </el-table-column>
                        <el-table-column prop="Description" label="描述" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <!-- <div style="margin-top: 20px">
                        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
                        <el-button @click="toggleSelection()">取消选择</el-button>
                    </div> -->
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="PermissionSubmit('form')">确 定</el-button>
                    <el-button @click="ColseByCancel('form')">取 消</el-button>
                </span>
            </el-dialog>

            <!-- 新增其他权限弹窗 -->
            <el-dialog :title="choosetitle" :visible.sync="OtherdialogFormVisible" :before-close="OClosedialog" width="30%">
                <el-form ref="oform" :model="oform" status-icon label-width="80px">
                    <el-form-item label="分类类型">
                        <el-select v-model="oform.Type" placeholder="请选择" @change="ChangeType">
                            <el-option label="页面" value="页面"></el-option>
                            <el-option label="资源" value="资源"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="权限类型">
                        <el-input size="medium" v-model="oform.AuthorityType" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="主体权限">
                        <!-- <el-select v-model="ResourcesID" placeholder="请选择" @change="ChangeMain">
                            <el-option v-for="(item,index) in PList" :key="index" :label="item.Name" :value="item.ID">
                            </el-option>
                        </el-select> -->
                        <treeselect v-model="ResourceTree.ID" :options="ResourceTree" @input="ChangeMain" placeholder="请选择" noResultsText="没有搜索到该选项" />
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="PermissionSubmit('other')">确 定</el-button>
                    <el-button @click="ColseByCancel('other')">取 消</el-button>
                </span>
            </el-dialog>

            <!-- 新增角色用户弹窗 -->
            <el-dialog :title="choosetitle" :visible.sync="RoleUserdialogFormVisible" :before-close="RUClosedialog" width="45%">
                <div>
                    <div class="g-left-search">
                        <el-input type="search" v-model="search" style="width:100%" placeholder="模糊匹配组织机构关键字"></el-input>
                    </div>                            
                    <div class="g-right-search">
                        <el-input placeholder="请准确输入姓名" type="search" v-model="search1" class="g-right-search-input"></el-input>
                        <el-button type="primary" @click="RoleUserSelect()">搜 索</el-button>
                    </div>
                </div>
                <el-table ref="roleUser" :data="RoleUserOU1" @expand-change="RoleUserRowChange" :row-key="getRowKeys" :expand-row-keys="expands" style="width: 100%" height="450px">
                    <el-table-column prop="OU" label="组织机构">
                    </el-table-column>
                    <el-table-column type="expand" align="center">
                        <template slot-scope="props">
                            <el-table :data="props.row.organizationdata" @selection-change="roleuserSelectionChange">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column prop="OU" label="组织机构">
                                </el-table-column>
                                <el-table-column prop="UserName" label="用户名">
                                </el-table-column>
                                <el-table-column prop="AccountName" label="编码">
                                </el-table-column>
                                <el-table-column prop="Email" label="邮箱地址">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                </el-table>

                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="RoleUserSubmit()">确 定</el-button>
                    <el-button @click="ColseRoleUser()">取 消</el-button>
                </span>
            </el-dialog>
        </el-header>
    </el-container>
</el-container>
</template>

<script>
// 引入vue-treeselect组件
import Treeselect from '@riophae/vue-treeselect'
// 引入vue-treeselect样式
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import axios from 'axios';
import * as fecha from "element-ui/lib/utils/date";
import {
    rightRole,
    rightPermission,
    rightRoleUser
} from '../utility/rightclick';

import {
    PermissionhandleAdd,
    Permissioncolse,
    Permissionclosedialog,
    PermissionsubmitForm,
    OPermissionhandleAdd,
    OPermissionsubmitForm,
    OPermissioncolse,
    OPermissionclosedialog,
    DeletePermissionByJs,

    AddRoleuser1,
    RoleUserSubmit1,
    ColseRoleUser1,
    RUClosedialog1,
    DeleteRoleUser1
} from '../views/Permission';

import {
    DataH
} from '../utility/DataHandling'

export default {
    data() {
        return {
            //标题
            choosetitle: "",
            //角色信息数据
            RoleData: [],
            //角色权限数据
            PermissionData: [],
            //角色用户数据
            RoleUesrData: [],
            //用户权限数据
            PersonnelAuthorityData: [],
            //页面权限数据
            PermissionAllData: [],
            //页面权限被选中的记录
            multipleSelection: [],
            //权限类型数据
            AuthorityType: [],
            //资源目录数据
            Resource: [],
            //资源ID
            ResourcesID: "",
            //角色ID
            RoleIDvue: "",
            //主体权限ID
            AIDvue: "",
            //主体权限当前行数据
            Prow: [],
            //角色信息右键菜单
            RoleVisible: false,
            //权限右键菜单
            PermissionVisible: false,
            //新增窗体权限模态框开关
            dialogFormVisible: false,
            //新增其他权限模态框开关
            OtherdialogFormVisible: false,
            //双击行数据
            Rolerow: [],
            //新增窗体权限模态框表单
            form: {
                AID: "",
                RoleID: "",
                RoleName: "",
                MID: "",
                MainName: "",
                Type: "",
                AuthorityType: "",
                RID: "",
                DID: "",
                LastModify: "",
                LastDate: ""

            },
            //新增其他权限模态框表单
            oform: {
                AID: "",
                RoleID: "",
                RoleName: "",
                MID: "",
                MainName: "",
                Type: "",
                AuthorityType: "",
                RID: "",
                DID: "",
                LastModify: "",
                LastDate: ""
            },
            //树形下拉选择框
            ResourceTree: {
                ID: "",
                PID: "",
                Name: ""
            },

            //新增角色用户数据
            RoleUser: [],
            //新增角色用户部门名称
            RoleUserOU: [],
            //新增角色用户部门名称备份
            RoleUserOUA: [],
            //角色用户组织数据
            RoleUserRrganization: [],
            //新增角色用户右键
            RoleUserVisible: false,
            //新增角色用户弹窗
            RoleUserdialogFormVisible: false,
            //角色用户选中角色信息
            RoleUserSelection: [],
            //角色用户当前行数据
            RoleUserRowData: [],
            //角色用户组织机构搜索框
            search: '',
            //角色用户姓名搜索框
            search1: '',
            //角色用户弹窗 要展开的行，数值的元素是row的key值
            expands: [],
            //角色用户搜索标识
            symbol: "",
            //右键菜单项是否可见
            disabledvalue:"",
            //资源目录树形数据保存
            resoursedata: [],
        }
    },
    components: {
        Treeselect
    }, //注册组件
    created: function () {
        this.RoleAllData();
        this.treeList();
        this.RoleUserData();

    },
    computed: {
        //主体名称
        PList() {
            var obj = [];
            axios.post("GetAllResources").then(function (res) {
                var Pdata = res.data;
                for (let i in Pdata) {
                    obj.push({
                        ID: Pdata[i].ID,
                        Name: Pdata[i].Name,
                        Type: Pdata[i].Type
                    })
                }
                //console.log("进入测试");
                //console.log(obj);
            });
            return obj;
        },

        //实时监听角色用户新增弹窗父表格搜索
        RoleUserOU1: function () {
            const search = this.search;
            console.log("进入父搜索");
            console.log(this.RoleUser);
            console.log(this.RoleUserOU);
            console.log(search);
            if (search) {
                return this.RoleUserOU.filter(dataNews => {
                    return Object.keys(dataNews).some(key => {
                        return String(dataNews[key]).toLowerCase().indexOf(search) > -1 //表示有该关键字的都可以匹配到  ===0表示从第一个开始匹配
                    })
                })
            }
            return this.RoleUserOU;
        },

        // 实时监听角色用户新增弹窗子表格
        // RoleUserOU1: function () {
        //     const search1 = this.search1;
        //     console.log("进入子搜索");
        //     console.log(this.RoleUser);
        //     console.log(this.RoleUserOU);
        //     console.log(search1);

        //     var ouname = "";
        //     for(var i = 0;i < this.RoleUser.length - 1;i++){
        //         if(search1 == this.RoleUser[i].UserName){
        //             ouname = this.RoleUser[i].OU;
        //         }
        //     }
        //     console.log(ouname);
        //     for(var i = 0;i < this.RoleUserOU.length - 1;i++){
        //         if (!this.RoleUserOU[i].organizationdata){
        //         this.organizationData(ouname);

        //         if (search1) {
        //             return this.RoleUserOU.filter(dataNews => {
        //                 return Object.keys(dataNews).some(key => {
        //                     return String(dataNews[key]).toLowerCase().indexOf(search1) > -1
        //                 })
        //             })
        //         }
        //     }
        //     }

        //     return this.RoleUserOU;
        // },
    },

    methods: {
        //资源目录树形网格
        treeList() {
            var that = this;
            axios.post("GetAllResources").then(function (res) {
                that.Resource = res.data; //先保存无树形结构的数据
                var AllData = res.data;

                // 删除所有 children,以防止数据出现异常（看情况可删除）
                AllData.forEach(function (item) {
                    delete item.children;
                });

                // 将数据存储为以 id 为 KEY 的 map 索引数据列
                var map = {};
                AllData.forEach(function (item) {
                    //item.Children = [] // 1
                    map[item.ID] = item;
                });
                //console.log(map);
                var treeData = [];
                AllData.forEach(function (item) {
                    item.label = item.Name;
                    item.id = item.ID
                    // 以当前遍历项，的pid,去map对象中找到索引的id
                    var parent = map[item.PID];
                    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item);
                        //parent.Children.push(item) //1
                    } else {
                        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级

                        treeData.push(item);
                    }
                });

                //console.log(treeData);
                that.resoursedata = treeData;
                that.ResourceTree = treeData;
                console.log(that.resoursedata);
                console.log(that.ResourceTree);
            });
        },
        //创建时获取数据
        RoleAllData() {
            //角色表格
            this.$ajax.post("GetAllRoleInformation")
                .then((res) => {
                    this.RoleData = res.data;
                })
            //页面权限
            this.$ajax.post('GetAllDesignpage')
                //返回成功调用
                .then((res) => {
                    this.PermissionAllData = res.data;
                });
            //资源目录
            this.$ajax.post('GetAllResources')
                //返回成功调用
                .then((res) => {
                    this.Resource = res.data;
                });
        },
        //新增角色用户弹窗数据
        RoleUserData() {
            this.$ajax.post("GetZLAllUser")
                .then((res) => {
                    this.RoleUser = res.data;
                    console.log("角色用户新增");
                    console.log(this.RoleUser);
                    var arr = [];
                    var arr1 = [];
                    // for (let i = 0; i < this.RoleUserData.length; i++) {
                    //     for (let j = i + 1; j < this.RoleUserData.length; j++)
                    //         if (this.RoleUserData[i].OU == this.RoleUserData[j].OU) j == ++i;
                    //     arr.push(this.RoleUserData[i].OU);
                    // }
                    for (var i = 0; i < this.RoleUser.length; i++) {
                        if (arr.indexOf(this.RoleUser[i].OU) == -1) {
                            arr.push(this.RoleUser[i].OU);
                        }
                    }
                    console.log(arr);
                    for (let i in arr) {
                        arr1.push({
                            OU: arr[i]
                        });
                    }
                    this.RoleUserOU = arr1;
                    this.RoleUserOUA = arr1;
                    console.log(this.RoleUserOU);
                })
        },
        //获取角色权限表格行的索引
        MainAuthoritytableRowClassName({
            row,
            rowIndex
        }) {
            row.row_index = rowIndex;
        },
        //获取用户信息表格行索引
        RoleUsertableRowClassName({
            row,
            rowIndex
        }) {
            row.row_index = rowIndex;
        },
        //获取用户权限表格行索引
        PersonnelAuthoritytableRowClassName({
            row,
            rowIndex
        }) {
            row.row_index = rowIndex;
        },

        //页面权限多选的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //角色用户多选数据
        roleuserSelectionChange(val) {
            this.RoleUserSelection = val;
            console.log(this.RoleUserSelection);
        },

        //表格日期显示格式转换
        dateFormat(row, column, cellValue) {
            // console.log("进入日期转换");
            // console.log(row);
            // console.log(column);
            // console.log(cellValue);
            return cellValue ? fecha.format(new Date(cellValue), 'yyyy-MM-dd HH:mm:ss') : '--';
        },

        //角色信息--角色权限--角色用户 联动
        Rolelink(row, event) {
            this.RoleIDvue = row.ID;
            console.log(row);
            //角色权限联动
            this.$ajax.post('GetAllMainAuthoritiesByRID',
                    this.$qs.stringify({
                        RID: row.ID
                    }))
                //返回成功调用
                .then((res) => {
                    this.PermissionData = res.data;
                })
                //返回失败调用
                .catch((res) => {
                    console.log("出错了")
                });

            //角色用户联动
            this.$ajax.post('GetAllRoleUserByRID',
                    this.$qs.stringify({
                        RID: row.ID
                    }))
                //返回成功调用
                .then((res) => {
                    this.RoleUesrData = res.data;
                })
                //返回失败调用
                .catch((res) => {
                    console.log("出错了")
                });
        },
        //角色用户--用户权限 联动
        RoleUesrlink(row, event) {
            //用户权限联动
            //this.PersonnelAuthorityData = [];
            console.log(row);
            this.$ajax.post('GetAllPersonnelAuthorityByUID',
                    this.$qs.stringify({
                        UserID: row.UserID
                    }))
                //返回成功调用
                .then((res) => {
                    console.log(res.data)
                    this.PersonnelAuthorityData = res.data;
                })
                //返回失败调用
                .catch((res) => {
                    console.log("出错了")
                });

        },

        //角色信息右键菜单
        RoleRightClick(row, event) {
            rightRole(this, row, event);
        },

        //新增权限
        AddPermission(state) {
            if (state == 'form') {
                //新增窗体权限
                PermissionhandleAdd(this);
            } else {
                //新增其他权限
                OPermissionhandleAdd(this);
            }

        },

        //角色用户右键菜单
        RoleUserRightClick(row, event) {
            rightRoleUser(this, row, event,'normal');
        },

        //角色用户右键表头菜单
        RoleUserheaderRightClick(row, event) {
            rightRoleUser(this, row, event,'header');
        },
        //新增角色用户
        AddRoleuser() {
            AddRoleuser1(this);
        },
        //角色用户确定
        RoleUserSubmit() {
            RoleUserSubmit1(this);
        },
        //角色用户取消
        ColseRoleUser() {
            ColseRoleUser1(this);          
        },
        //点击其他区域关闭角色用户弹窗
        RUClosedialog(done) {
            RUClosedialog1(done, this);
        },
        //删除角色用户
        DeleteRoleUser() {
            DeleteRoleUser1(this);
        },
        //角色用户弹窗 获取row的key值
        getRowKeys(row) {
            return row.OU;
        },
        //角色用户表格展开行事件
        RoleUserRowChange(row, expandedRows) {
            console.log("进入行展开");
            console.log(row);

            console.log(expandedRows);
            console.log(this.symbol);
            console.log(this.RoleUser);

            if (this.symbol == "child") {
                console.log("子搜索标识");
            } else {
                if (!row.organizationdata) {
                    //this.organizationData(row.OU);
                    var OU = row.OU;
                    var self = this;
                    var arr = [];
                    for (var i = 0; i < this.RoleUser.length; i++) {
                        if (OU == this.RoleUser[i].OU) {
                            arr.push(this.RoleUser[i]);
                        }
                    }
                    this.RoleuserRrganization = arr;
                    console.log("组织数据");
                    console.log(this.RoleuserRrganization);

                    const index = self.RoleUserOU.findIndex(data => data.OU === OU);
                    self.$set(self.RoleUserOU[index], 'organizationdata', this.RoleuserRrganization);
                    console.log("AAA");
                    console.log(self.RoleUserOU);
                }
            }
        },
        //角色用户名称搜索
        RoleUserSelect() {
            const search1 = this.search1;
            console.log("进入子搜索");
            console.log(this.RoleUser);
            console.log(this.RoleUserOU);
            console.log(search1);
            //重置子搜索框或子搜索框值为""时重新给子表格赋值并置空默认展开行
            if (search1 == "") {
                this.expands = [];
                this.RoleUserOU = this.RoleUserOUA;
            } else {
                var ouname = "";
                for (var i = 0; i < this.RoleUser.length; i++) {
                    if (search1 == this.RoleUser[i].UserName) {
                        ouname = this.RoleUser[i].OU;
                    }
                }
                console.log(ouname);
                for (var i = 0; i < this.RoleUserOU.length; i++) {
                    //if (!this.RoleUserOU[i].organizationdata) {
                    this.organizationData(ouname);

                    // if (search1) {
                    //     return this.RoleUserOU.filter(dataNews => {
                    //         return Object.keys(dataNews).some(key => {
                    //             return String(dataNews[key]).toLowerCase().indexOf(search1) > -1
                    //         })
                    //     })
                    // }

                    // }
                }

                return this.RoleUserOU;
            }
        },
        organizationData(OU) {
            var self = this;
            var arr = [];
            var arr1 = [];
            for (var i = 0; i < this.RoleUser.length; i++) {
                if (OU == this.RoleUser[i].OU) {
                    arr.push(this.RoleUser[i]);
                }
            }
            this.RoleuserRrganization = arr;
            console.log("进入子表格组织数据");
            console.log(this.RoleuserRrganization);
            console.log(self.search1);
            //重新给初始RoleUserOU赋值
            this.RoleUserOU = this.RoleUserOUA;
            //找到索引值
            const index = self.RoleUserOU.findIndex(data => data.OU === OU);
            //添加RoleUserOU.organizationdata
            self.$set(self.RoleUserOU[index], 'organizationdata', this.RoleuserRrganization);
            console.log(self.RoleUserOU);

            for (var j = 0; j < self.RoleUserOU.length; j++) {
                if (OU == self.RoleUserOU[j].OU) {
                    for (var k = 0; k < self.RoleUserOU[j].organizationdata.length; k++) {
                        if (self.search1 == self.RoleUserOU[j].organizationdata[k].UserName) {
                            var arr2 = [];
                            arr2.push(self.RoleUserOU[j].organizationdata[k]);
                            arr1.push({
                                OU: OU,
                                organizationdata: arr2
                            });
                        }
                    }
                }
            }
            self.RoleUserOU = arr1;

            //角色用户搜索标识改变
            this.symbol = "child";

            //this.$refs.roleUser.toggleRowExpansion(index, true);
            this.expands = [];
            this.expands.push(OU);
            // console.log(this.expands);

            console.log("BBB");
            console.log(self.RoleUserOU);
        },
        // handleExpendRow(row, expandedRows) { //这里是点击每一行会触发的方法
        //     if (!row.dicts) { //这里做了一个判断，首先判断这一行的数据对象有没有dicts这个属性，如果没说明没有数据我们需要请求后台，相当于懒加载
        //         this.queryDictData(row.id, row.labelType) //关键就是这个方法，row.id是父分组的id需要传给后台查询该子分组的信息
        //     }
        // },
        // queryDictData(id, labelType) {
        //     let self = this
        //     labelService.getLabels({
        //         groupCode: labelType
        //     }).then(rspData => { //这里是我们项目里封装的ajax请求方法，相当于axios.post()
        //         console.log(rspData)
        //         const index = self.pageData.results.findIndex(data => data.id === id) //首先pageData.results绑定的是父表格的数据，那么我们要把子表格数据塞到对应的父分组，那我们要知道是哪一个分组，这里的findIndex就是通过id去查找对应的父分组在数据数组里的下标
        //         if (rspData.data && rspData.data.length) {
        //             rspData.data.forEach(item => { //这里我是给每个子分组信息里都加上父分组的id，以方便后面操作子表格每一行后，回调函数里刷新数据时需要用到，要知道他的父亲是谁，哈哈
        //                 item.labelId = id
        //             })
        //         }
        //         self.$set(self.pageData.results[index], 'dicts', rspData.data) //这里就是给父表格数据数组self.pageData.results第index个对象加上dicts这个属性，然后把rspData.data我们从后台拿到的数据绑定到dicts这个key里
        //     })
        // },

        //新增其他权限时选择分类类型联动
        ChangeType(val) {
            if (val == '页面') {
                this.oform.AuthorityType = '新增页面'
            } else {
                this.oform.AuthorityType = '新增本级'
            }
        },

        //新增其他权限时主体权限变化时查找并放入oform
        ChangeMain(value) {
            for (let i in this.Resource) {
                if (value == this.Resource[i].ID) {
                    this.oform.MID = value;
                    this.oform.MainName = this.Resource[i].Name;
                    break
                }
            }
        },

        //提交权限
        PermissionSubmit(state) {
            if (state == 'form') {
                //提交窗体权限
                PermissionsubmitForm(this);
                this.$refs.PagePermission.clearSelection(); //清空窗体权限表格多选
            } else {
                //提交其他权限
                OPermissionsubmitForm(this);
            }

        },
        //点击x关闭窗体权限模态框
        Closedialog(done) {
            Permissionclosedialog(done, this);
            this.$refs.PagePermission.clearSelection(); //清空窗体权限表格多选
        },
        //点击x关闭其他权限模态框
        OClosedialog(done) {
            OPermissionclosedialog(done, this);

        },

        //点击取消关闭模态框
        ColseByCancel(state) {
            if (state == 'form') {
                //关闭窗体权限
                Permissioncolse(this);
                this.$refs.PagePermission.clearSelection(); //清空窗体权限表格多选
            } else {
                //关闭其他权限
                OPermissioncolse(this);
            }

        },

        //权限右键菜单
        PermissionRightClick(row, event) {
            rightPermission(this, row, event);

        },

        //删除主体权限
        DeletePermission() {
            DeletePermissionByJs(this);
        },

        //点击链接跳转到资源要素管理
        ResourceElement() {
            this.$router.push({
                path: '/index'
            })
        },

    }

}
</script>

<style scoped>
/* scoped 表示该css样式只在本页面生效 */
.elcochoose {
    margin-top: 10px;
}

.menu {
    width: 145px;
    overflow: hidden;
    /*隐藏溢出的元素*/
    box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
    position: absolute;
    z-index: 10;
    background-color: white;
    border: 1px solid #e1e1e0;
    padding-left: 0px;
}

.wrap-ms-right {
    list-style: none;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #606266;
    font-size: 16px;
}

.ms-item {
    height: 30px;
    line-height: 30px;
    text-align: left;
    cursor: pointer;
}

.icon1 {
    margin-left: 14px;
    margin-right: 3px;
}

.ms-item:hover {
    background-color: #525a64;
    color: #FFFFFF;
}

.elem_footer {
    display: flex;
}
/* 调整样式 */
.g-select-width{
    width: 90%;
}
.tabletitle {
    color: #999999;
    font-size: 1.5rem;
}

.ttop {
    margin: 8px 3px;
}

.tbuttom {
    margin: 4px 3px 11px 3px;
}
.g-left{
    float: left;
    font-size: 24px;
    font-weight: 1000;
}
.g-right{
    float: right;
    margin: 3px 1rem;
    cursor: pointer;
    border: 1px solid #e4e5e3;
    border-radius: 4px;
    padding: 5px;
    background-color:#f8f8f7;
    color: #999999;
    font-size: 1.2rem;
}
.g-left-search{
    float: left;
}
.g-right-search{
    float: right;
}
.g-right-search-input{
    width: 70%;
    margin: 0 .2rem;
}
</style>
