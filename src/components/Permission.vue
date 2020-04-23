<template>
<el-container>
    <el-container>
        <el-header>
            <!-- 角色信息表格 -->
            <el-row>
                <div class="tabletitle">角色信息</div>
                <el-table el-header :data="RoleData" height="460px" @row-click="Rolelink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @row-contextmenu="RoleRightClick" @header-contextmenu="RoleRightClick">
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
                <div class="tabletitle">角色权限</div>
                <el-table el-header :data="PermissionData" height="460px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @row-contextmenu="PermissionRightClick" :row-class-name="MainAuthoritytableRowClassName">
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
                <div class="tabletitle">用户信息</div>
                <el-table el-header :data="RoleUesrData" height="460px" @row-click="RoleUesrlink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row>
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
                <div class="tabletitle">用户权限</div>
                <el-table el-header :data="PersonnelAuthorityData" height="460px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row>
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
            <!-- 新增窗体权限弹窗 -->
            <el-dialog :title="choosetitle" :visible.sync="dialogFormVisible" :before-close="Closedialog" width="30%">
                <el-form ref="form" :model="form" status-icon label-width="80px">
                    <el-form-item label="权限类型" prop="Type">
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
                        <treeselect v-model="ResourceTree.ID" :options="ResourceTree"  @input="ChangeMain" placeholder="请选择" noResultsText="没有搜索到该选项"/>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="PermissionSubmit('other')">确 定</el-button>
                    <el-button @click="ColseByCancel('other')">取 消</el-button>
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
    rightPermission
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
    DeletePermissionByJs

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
            Prow:[],
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
            ResourceTree:{
                ID: "",
                PID: "",
                Name: ""
            },
        }
    },
    components: {
        Treeselect
    }, //注册组件
    created: function () {
        this.RoleAllData(),
        this.treeList()

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
    },

    methods: {
        //资源目录树形网格
        treeList() {
            var that = this;
            axios.post("GetAllResources").then(function (res) {
                that.Resource=res.data; //先保存无树形结构的数据
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
                that.ResourceTree = treeData;
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
        //获取角色权限表格行的索引
        MainAuthoritytableRowClassName({
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
            this.PersonnelAuthorityData = [];
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

        // //角色用户改变时联动
        // RoleUesrchange(currentRow){
        //     this.PersonnelAuthorityData=[];
        //     this.$ajax.post('GetAllPersonnelAuthorityByUID',
        //             this.$qs.stringify({
        //                 UserID: currentRow.UserID
        //             }))
        //         //返回成功调用
        //         .then((res) => {
        //             console.log(res.data)
        //             this.PersonnelAuthorityData = res.data;
        //         })
        //         //返回失败调用
        //         .catch((res) => {
        //             console.log("出错了")
        //         });

        // },

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
            } else {
                //提交其他权限
                OPermissionsubmitForm(this);
            }

        },
        //点击x关闭窗体权限模态框
        Closedialog(done) {
            Permissionclosedialog(done,this);
        },
        //点击x关闭其他权限模态框
        OClosedialog(done) {
            OPermissionclosedialog(done,this);

        },

        //点击取消关闭模态框
        ColseByCancel(state) {
            if (state == 'form') {
                //关闭窗体权限
                Permissioncolse(this);
            } else {
                //关闭其他权限
                OPermissioncolse(this);
            }

        },

        //权限右键菜单
        PermissionRightClick(row, event) {
            rightPermission(this, row, event);

        },

        //删除权限
        DeletePermission(){
            DeletePermissionByJs(this);
        }


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
.tabletitle {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    background-color: aliceblue;
}
</style>
