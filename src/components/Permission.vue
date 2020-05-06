<!DOCTYPE html>
<template>
<el-container>
    <el-container>
        <el-header>
            <!-- 角色信息表格 -->
            <el-row>
                <h3 class="tabletitle ttop">角色信息</h3>
                <el-table el-header :data="RoleData" height="420px" @row-click="Rolelink" :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row @row-contextmenu="RoleRightClick">
                    <el-table-column label="角色名称" prop="Name" header-align="center" sortable>
                    </el-table-column>
                    <el-table-column label="备注" prop="Note" align="center">
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="LastModify" align="center">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" width="165px" align="center" sortable>
                    </el-table-column>
                </el-table>
                <!-- <vxe-grid border resizable show-footer highlight-current-row ref="xGrid" :formatter="dateFormat" :footer-method="footerMethod" :columns="tableColumn" :data="RoleData" :context-menu="tableMenu" @cell-context-menu="cellContextMenuEvent" @context-menu-click="contextMenuClickEvent"></vxe-grid>-->
            </el-row>
            <!-- 角色权限表格 -->
            <el-row>
                <h3 class="tabletitle tbuttom">角色权限</h3>
                <el-table el-header :data="PermissionData" height="420px" :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row @row-contextmenu="PermissionRightClick" :row-class-name="MainAuthoritytableRowClassName">
                    <el-table-column label="主体名称" prop="MainName" header-align="center" sortable>
                    </el-table-column>
                    <el-table-column label="类型" prop="Type" header-align="center" sortable>
                    </el-table-column>
                    <el-table-column label="权限类型" prop="AuthorityType" header-align="center" sortable>
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="LastModify" header-align="center">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" width="165px" align="center" sortable>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-header>
    </el-container>

    <el-container>
        <el-header>
            <!-- 角色用户表格 -->
            <el-row>
                <el-popover placement="top-start" width="210" trigger="hover" content="点击链接跳转到资源要素管理界面">
                    <el-button slot="reference" type="info" icon="el-icon-setting" class="g-right" plain @click="ResourceElement()">
                        资源要素管理</el-button>
                </el-popover>
                <h3 class="tabletitle ttop">用户信息</h3>
                <el-table el-header :data="RoleUesrData" height="420px" @row-click="RoleUesrlink" :row-class-name="RoleUsertableRowClassName" :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row @row-contextmenu="RoleUserRightClick" @header-contextmenu="RoleUserheaderRightClick">
                    <el-table-column label="用户名" prop="UserName" header-align="center" sortable>
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="LastModify" header-align="center">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" width="165px" align="center" sortable>
                    </el-table-column>
                </el-table>
            </el-row>

            <!-- 用户权限表格 -->
            <el-row>
                <h3 class="tabletitle tbuttom">用户权限</h3>
                <el-table el-header :data="PersonnelAuthorityData" :row-class-name="PersonnelAuthoritytableRowClassName" height="420px" :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row>
                    <el-table-column label="主体名称" prop="MName" header-align="center" sortable>
                    </el-table-column>
                    <el-table-column label="类型" prop="Type" header-align="center">
                    </el-table-column>
                    <el-table-column label="权限类型" prop="AuthorityType" header-align="center">
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="LastModify" header-align="center">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" width="165px" header-align="center" sortable>
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
                    <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="DeleteRoleUser()"><i class="el-icon-s-order icon1"></i>删除用户关系</li>
                </ul>
            </div>

            <!-- 新增窗体权限弹窗 -->
            <el-dialog :title="choosetitle" :visible.sync="dialogFormVisible" :before-close="Closedialog" width="30%">
                <el-form ref="form" :model="form" status-icon label-width="80px" >
                    <el-row>
                        <el-form-item label="权限类型" prop="AuthorityType">
                            <el-select v-model="AuthorityType" class="g-select-width" multiple placeholder="请选择">
                                <el-option label="新增" value="新增"></el-option>
                                <el-option label="修改" value="修改"></el-option>
                                <el-option label="删除" value="删除"></el-option>
                                <el-option label="查询" value="查询"></el-option>
                                <el-option label="设计" value="设计"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-table ref="PagePermission" :data="PermissionAllData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" max-height="400px">
                        <el-table-column type="selection" width="55px">
                        </el-table-column>
                        <el-table-column prop="Name" label="名称" width="210px">
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
                <el-form ref="oform" :model="oform" status-icon label-width="80px" >
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
                        <treeselect v-model="oform.MainName" placeholder="请选择或搜索" :options="ResourceTree" @input="ChangeMain" :disabled="PagedisabledValue"></treeselect>
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
                        <!-- <el-row>
                        <el-switch v-model="IFCheckAll" @change="RoleUserAllChange" active-text="全选所有人员" inactive-text="放弃全选" style="width:217px" active-color="#ff4949" inactive-color="#13ce66"></el-switch>
                        </el-row> -->
                    </div>
                    <div class="g-right-search">
                        <el-input placeholder="请准确输入姓名" type="search" v-model="search1" class="g-right-search-input"></el-input>
                        <el-button type="primary" @click="RoleUserSelect()">搜 索</el-button>
                    </div>
                </div>
                <el-table ref="roleUser" :data="RoleUserOU1" @expand-change="RoleUserRowChange" :row-key="getRowKeys" :expand-row-keys="expands" @select="RUSelect" @select-all="RUSelectAll" @selection-change="fatherSelectionChange" style="width: 100%" height="450px">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="OU" label="组织机构">
                    </el-table-column>
                    <el-table-column type="expand" align="center">
                        <template v-if="childSelect" slot-scope="props">
                            <el-table ref="roleuserdata" :data="props.row.organizationdata" @selection-change="roleuserSelectionChange">
                                <el-row>asassadsadas</el-row>
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
                                <el-input type="hidden" v-model="test"></el-input>
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
                MainName: null,
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
            //角色用户子表格选中角色信息
            RoleUserSelection: [],
            //角色用户父表格选中角色信息
            RoleUserSelection1: [],
            //角色用户父表格选中信息
            FatherSelectionChange: [],
            //角色用户当前行数据
            RoleUserRowData: [],
            //角色用户组织机构搜索框
            search: '',
            //角色用户姓名搜索框
            search1: '',
            //角色用户弹窗 要展开的行，数值的元素是row的key值
            expands: [],
            //角色用户搜索/多选标识
            symbol: "",
            //右键菜单项是否可见
            disabledvalue: "",
            //资源目录树形数据保存
            resoursedata: [],
            //角色用户全选人员
            //IFCheckAll: false,
            test: "",
            //角色用户子表格默认是否创建多选框
            childSelect: true,
            PagedisabledValue: true,
        }
    },
    components: {
        Treeselect
    }, //注册组件
    activated: function () {
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
        }
    },

    methods: {
        //资源目录树形网格
        treeList() {
            var that = this;
            axios.post("GetAllResources").then(function (res) {
                that.Resource = res.data; //先保存无树形结构的数据
                var AllData = res.data;

                let Rtree = AllData;
                for (let i in Rtree) {
                    if (Rtree[i].Type != "资源" || Rtree[i].Type != "附加资源") {
                        Rtree.splice(i, 1)
                    }

                }
                // console.log(Rtree);

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

                // 只带有资源的树形
                // 删除所有 children,以防止数据出现异常（看情况可删除）
                Rtree.forEach(function (item) {
                    delete item.children;
                });

                // 将数据存储为以 id 为 KEY 的 map 索引数据列
                var map1 = {};
                Rtree.forEach(function (item) {
                    //item.Children = [] // 1
                    map1[item.ID] = item;
                });
                //console.log(map);
                var treeData1 = [];
                Rtree.forEach(function (item) {
                    item.label = item.Name;
                    item.id = item.ID
                    // 以当前遍历项，的pid,去map对象中找到索引的id
                    var parent = map1[item.PID];
                    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item);
                        //parent.Children.push(item) //1
                    } else {
                        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级

                        treeData1.push(item);
                    }
                });

                //console.log(treeData1);
                that.resoursedata = treeData;
                that.ResourceTree = treeData1; //只含资源的数据
                //console.log(that.resoursedata);
                //console.log(that.ResourceTree);
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
            rightRoleUser(this, row, event, 'normal');
        },

        //角色用户右键表头菜单
        RoleUserheaderRightClick(row, event) {
            rightRoleUser(this, row, event, 'header');
        },
        //新增角色用户
        AddRoleuser() {
            AddRoleuser1(this);
        },
        //角色用户确定
        RoleUserSubmit() {
            RoleUserSubmit1(this);
            if(this.RoleUserSelection.length > 0){
                this.$refs.roleuserdata.clearSelection(); //清空角色用户子表格多选  
            }else if(this.RoleUserSelection1.length > 0){
                this.$refs.roleUser.clearSelection(); //清空角色用户父表格多选
            }
            //清空标识值
            this.symbol = "";
            //子表格多选框
            this.childSelect = true;
        },
        //角色用户取消
        ColseRoleUser() {
            ColseRoleUser1(this);
            if(this.RoleUserSelection.length > 0){
                this.$refs.roleuserdata.clearSelection(); //清空角色用户子表格多选  
            }else if(this.RoleUserSelection1.length > 0){
                this.$refs.roleUser.clearSelection(); //清空角色用户父表格多选
            }
            console.log(this.RoleUserSelection);
            //清空标识值
            this.symbol = "";
            //子表格多选框
            this.childSelect = true;
                
        },
        //点击其他区域关闭角色用户弹窗
        RUClosedialog(done) {
            RUClosedialog1(done, this);
            if(this.RoleUserSelection.length > 0){
                this.$refs.roleuserdata.clearSelection(); //清空角色用户子表格多选  
            }else if(this.RoleUserSelection1.length > 0){
                this.$refs.roleUser.clearSelection(); //清空角色用户父表格多选
            }
            //清空标识值
            this.symbol = "";
            //子表格多选框
            this.childSelect = true;
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
            console.log(this.childSelect);
            console.log(this.RoleUser);

            if (this.symbol == "child") {
                console.log("子搜索标识");
                return;
            }else {
                if (!row.organizationdata) { //这里做了一个判断，首先判断这一行的数据对象有没有organizationdata这个属性，如果没说明没有数据我们需要请求后台，相当于懒加载
                    //this.organizationData(row.OU);
                    var OU = row.OU;
                    var self = this;
                    var arr = [];
                    //找出部门下所有的人员
                    for (var i = 0; i < this.RoleUser.length; i++) {
                        if (OU == this.RoleUser[i].OU) {
                            arr.push(this.RoleUser[i]);
                        }
                    }
                    this.RoleuserRrganization = arr;

                    console.log("组织数据");
                    console.log(this.RoleuserRrganization);

                    const index = self.RoleUserOU.findIndex(data => data.OU === OU); //首先RoleUserOU绑定的是父表格的数据，那么我们要把子表格数据塞到对应的父分组，那我们要知道是哪一个分组，这里的findIndex就是通过id去查找对应的父分组在数据数组里的下标
                    //         if (rspData.data && rspData.data.length) {
                    //             rspData.data.forEach(item => { //这里我是给每个子分组信息里都加上父分组的id，以方便后面操作子表格每一行后，回调函数里刷新数据时需要用到，要知道他的父亲是谁，哈哈
                    //                 item.labelId = id
                    //             })
                    self.$set(self.RoleUserOU[index], 'organizationdata', this.RoleuserRrganization); //这里就是给父表格数据数组RoleUserOU第index个对象加上organizationdata这个属性，然后把this.RoleuserRrganization数据绑定到organizationdata这个key里
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
                //置空搜索标识
                this.symbol = "";
            } else {
                //通过姓名查找部门名称
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
                            //将organizationdata对象转换为数组
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
            //搜索姓名后展开行
            this.expands = [];
            this.expands.push(OU);
            // console.log(this.expands);

            console.log("BBB");
            console.log(self.RoleUserOU);
        },

        //角色用户多选数据
        roleuserSelectionChange(val) {
            this.RoleUserSelection = val;
            console.log(this.RoleUserSelection);
        },
        //角色用户父表格多选数据
        fatherSelectionChange(val){
            this.FatherSelectionChange = val;
            console.log(this.FatherSelectionChange);
            if(this.FatherSelectionChange.length == 0){
                this.childSelect = true;
            }
        },
        //角色用户父表格 手动多选触发事件
        RUSelect(selection, row){
            console.log("父表多选");
            console.log(selection);
            console.log(row);

            this.symbol = "fatherSelect";
            this.childSelect = false;
            
            // if(selection.length == 0){
            //     //父表多选标识改变
            //     this.symbol = "";
            // }
            //父表多选后展开行置空
            //this.expands = [];
            var arr = [];
            for(var i = 0;i < selection.length;i++){
                    var OU = selection[i].OU;
                    var self = this;
                    

                    console.log("进入多选部门名称");
                    console.log(OU);

                    for (var j = 0; j < this.RoleUser.length; j++) {
                        if (OU == this.RoleUser[j].OU) {
                            arr.push(this.RoleUser[j]);
                        }
                    }

                    this.RoleuserRrganization = arr;
                    console.log("父表多选组织数据");
                    console.log(this.RoleuserRrganization);

                    //const index = self.RoleUserOU.findIndex(data => data.OU === OU); 
                    //self.$set(self.RoleUserOU[index], 'organizationdata', this.RoleuserRrganization);
                    //添加展开行信息
                    //this.expands.push(OU);
                    
                    // if(row){
                    //     self.test = "1";
                    //     console.log(self.$refs.roleuserdata);
                    //    // self.$refs.roleuserdata.toggleAllSelection();
                    // }
                    //console.log("AAA");
                    //console.log(self.RoleUserOU);
                }
                this.RoleUserSelection1 = arr;

        },
        RUSelectAll(selection){
            console.log(selection);
            if(selection.length > 0){
                this.childSelect = false;
            }else{
                this.childSelect = true;
            }
            
        },


        //新增其他权限时选择分类类型联动
        ChangeType(val) {
            if (val == '页面') {
                this.oform.AuthorityType = '新增页面'
                this.PagedisabledValue = true;
            } else {
                this.oform.AuthorityType = '新增本级'
                this.PagedisabledValue = false;
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
                PermissionsubmitForm(this,this.AuthorityType,this.multipleSelection);
                if(this.multipleSelection.length > 0){
                    this.$refs.PagePermission.clearSelection(); //清空窗体权限表格多选
                }    
            } else {
                //提交其他权限
                OPermissionsubmitForm(this);
            }
        },
        //点击x关闭窗体权限模态框
        Closedialog(done) {
            Permissionclosedialog(done, this);
            if(this.multipleSelection.length > 0){
                this.$refs.PagePermission.clearSelection(); //清空窗体权限表格多选
            } 
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
                if(this.multipleSelection.length > 0){
                    this.$refs.PagePermission.clearSelection(); //清空窗体权限表格多选
                } 
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
.g-select-width {
    width: 90%;
}

.tabletitle {
    color: #3a87ad;
    font-size: 1.5rem;
}

.ttop {
    margin: 8px 3px;
}

.tbuttom {
    margin: 4px 3px 11px 3px;
}

.g-left {
    float: left;
    font-size: 24px;
    font-weight: 1000;
}

.g-right {
    float: right;
    margin: 3px 1rem;
    cursor: pointer;

    border: none;
    border-radius: 4px;
    padding: 5px;
    background-color: white;
    color: #3a87ad;
    margin-top: 10px;
    font-size: 20px;
}

.g-right:hover {
    background-color: white;
    color: #3a87ad;
}

.g-left-search {
    float: left;
}

.g-right-search {
    float: right;
}

.g-right-search-input {
    width: 70%;
    margin: 0 .2rem;
}

.has-gutter th {
    background-color: #FFF !important;
}
</style>
