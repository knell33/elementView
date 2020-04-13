<template>
<el-container>
    <el-container>
        <!-- 资源目录树形表格 -->
        <el-aside width="350px">
            <el-table :data="ResourceTableData" style="width: 100%;margin-bottom: 20px;" height="1000px" row-key="ID" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @row-click="elementlink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" highlight-current-row @current-change="ResourceTableChange" @row-contextmenu="rightClick">
                <el-table-column prop="Name" label="资源名称">
                </el-table-column>
                <el-table-column prop="Type" label="类型">
                </el-table-column>
            </el-table>
        </el-aside>
        <!-- 要素目录表格 -->
        <el-main>
            <el-row>
                <el-table :data="ElementTableData" height="460px" @row-click="elementrangelink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="ElementTableChange" @row-contextmenu="elrightClick">
                    <el-table-column label="序号" prop="Numbera">
                    </el-table-column>
                    <el-table-column label="分类名称" prop="ClassifyName">
                    </el-table-column>
                    <el-table-column label="要素名称" prop="Name">
                    </el-table-column>
                    <el-table-column label="要素类型" prop="Type">
                    </el-table-column>
                    <el-table-column label="选项类型" prop="OptionType">
                    </el-table-column>
                    <el-table-column label="定义指标个数" prop="DYZBGS" width="110px">
                    </el-table-column>
                    <el-table-column label="单位" prop="Unit">
                    </el-table-column>
                    <el-table-column label="长度" prop="Length">
                    </el-table-column>
                    <el-table-column label="精度" prop="Precision">
                    </el-table-column>
                    <el-table-column label="要素分类" prop="ElementClassify">
                    </el-table-column>
                    <el-table-column label="选项" prop="OptionType">
                    </el-table-column>
                    <el-table-column label="备注" prop="Note">
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="LastModify">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="LastDate" width="165px">
                    </el-table-column>
                </el-table>
            </el-row>
            <!-- 标签分栏表格 -->
            <el-row class="elcochoose">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="要素分类" name="first">
                        <!-- 要素分类表格 -->
                        <el-table :data="ElementClassifyTableData" height="450px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="ElementClassifyTableChange">
                            <el-table-column label="分类名称" prop="Name">
                            </el-table-column>
                            <el-table-column label="备注" prop="Note">
                            </el-table-column>
                            <el-table-column label="最后修改人" prop="LastModify">
                            </el-table-column>
                            <el-table-column label="最后修改时间" prop="LastDate">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="统计指标定义" name="second">
                        <!-- 统计指标关联表格 -->
                        <el-table :data="CountNormTableData" height="450px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="CountNormTableChange">
                            <el-table-column label="指标名称" prop="Name">
                            </el-table-column>
                            <el-table-column label="计算类型" prop="CalculateType">
                            </el-table-column>
                            <el-table-column label="运算符" prop="Operator">
                            </el-table-column>
                            <el-table-column label="运算值" prop="Ovalue">
                            </el-table-column>
                            <el-table-column label="关联类型" prop="AssociationType">
                            </el-table-column>
                            <el-table-column label="备注" prop="Note">
                            </el-table-column>
                            <el-table-column label="最后修改人" prop="LastModify">
                            </el-table-column>
                            <el-table-column label="最后修改时间" prop="LastDate">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="要素值域选项" name="third">
                        <!-- 要素值域选项表格 -->
                        <el-table :data="ElementRangeTableData" height="450px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="ElementRangeTableChange">
                            <el-table-column label="选项名称" prop="Name">
                            </el-table-column>
                            <el-table-column label="备注" prop="Note">
                            </el-table-column>
                            <el-table-column label="最后修改人" prop="LastModify">
                            </el-table-column>
                            <el-table-column label="最后修改时间" prop="LastDate">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>

                <!-- 轮播形式展现数据表 -->
                <!-- <el-carousel type="card" height="490px" :autoplay="false">
                    <el-carousel-item v-for="item in 3" :key="item">

                        <el-table :data="ElementClassifyTableData" height="490px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="ElementClassifyTableChange">
                            <el-table-column label="分类名称" prop="分类名称">
                            </el-table-column>
                            <el-table-column label="备注" prop="备注">
                            </el-table-column>
                            <el-table-column label="最后修改人" prop="最后修改人">
                            </el-table-column>
                            <el-table-column label="最后修改时间" prop="最后修改时间">
                            </el-table-column>
                        </el-table>

                        <el-table :data="CountNormTableData" height="490px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="CountNormTableChange">
                            <el-table-column label="指标名称" prop="指标名称">
                            </el-table-column>
                            <el-table-column label="计算类型" prop="计算类型">
                            </el-table-column>
                            <el-table-column label="运算符" prop="运算符">
                            </el-table-column>
                            <el-table-column label="运算值" prop="运算值">
                            </el-table-column>
                            <el-table-column label="关联类型" prop="关联类型">
                            </el-table-column>
                            <el-table-column label="备注" prop="备注">
                            </el-table-column>
                            <el-table-column label="最后修改人" prop="最后修改人">
                            </el-table-column>
                            <el-table-column label="最后修改时间" prop="最后修改时间">
                            </el-table-column>
                        </el-table>

                        <el-table :data="ElementRangeTableData" height="490px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="ElementRangeTableChange">
                            <el-table-column label="选项名称" prop="选项名称">
                            </el-table-column>
                            <el-table-column label="备注" prop="备注">
                            </el-table-column>
                            <el-table-column label="最后修改人" prop="最后修改人">
                            </el-table-column>
                            <el-table-column label="最后修改时间" prop="最后修改时间">
                            </el-table-column>
                        </el-table>
                    </el-carousel-item>
                </el-carousel> -->

            </el-row>
            <el-row>
                <!-- 资源目录新增、修改弹框 -->
                <el-dialog :title="choosetitle" :visible.sync="dialogFormVisible" :before-close="closedialog" width="30%">
                    <el-form ref="form" :model="form" status-icon label-width="80px">
                        <el-form-item label="上级" prop="PID">
                            <el-select v-model="form.PID" filterable :filter-method="resourcedatafilter" :default-first-option=true placeholder="请选择上级" style="width:100%">
                                <el-option v-for="(item,index) in PList" :label="item.Name" :value="item.ID" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型" prop="Type">
                            <el-select v-model="form.Type" placeholder="请选择资源类型" style="width:100%">
                                <el-option label="目录" value="目录"></el-option>
                                <el-option label="资源" value="资源"></el-option>
                                <el-option label="附加资源" value="附加资源"></el-option>
                                <el-option label="资源关系" value="资源关系"></el-option>
                                <el-option label="事务" value="事务"></el-option>
                                <el-option label="业务" value="业务"></el-option>
                                <el-option label="业务明细" value="业务明细"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="名称" prop="Name">
                            <el-input v-model="form.Name"></el-input>
                        </el-form-item>
                        <el-form-item label="显示名称" prop="ShowName">
                            <el-input v-model="form.ShowName"></el-input>
                        </el-form-item>

                        <el-form-item label="是否树形" prop="TreeForm">
                            <el-switch v-model="form.TreeForm" :active-value="1" :inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-form-item label="备注" prop="Note">
                            <el-input type="textarea" v-model="form.Note"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="colse()">取 消</el-button>
                        <el-button type="primary" :loading="loading" @click="submitForm('form')">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 要素目录新增、修改弹框 -->
                <el-dialog :title="elchoosetitle" :visible.sync="eldialogFormVisible" :before-close="closedialog" width="40%">
                    <el-form ref="elform" :model="elform" status-icon label-width="110px" :inline="true" label-position="left">
                        <el-form-item label="序号">
                            <el-input v-model="elform.Numbera"></el-input>
                        </el-form-item>
                        <el-form-item label="资源" style="margin-left:20px">
                            <el-select v-model="elform.RID" filterable :filter-method="resourcedatafilter" :default-first-option=true placeholder="请选择资源">
                                <el-option v-for="(item,index) in PList" :label="item.Name" :value="item.ID" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="要素名称">
                            <el-input v-model="elform.Name"></el-input>
                        </el-form-item>
                        <el-form-item label="分类" style="margin-left:20px">
                            <el-select v-model="elform.CID" filterable :filter-method="resourcedatafilter" :default-first-option=true placeholder="请选择分类" style="width:217px">
                                <el-option v-for="(item,index) in ClassifyList" :label="item.CName" :value="item.CID" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="要素类型">
                            <el-select v-model="elform.Type" placeholder="请选择要素类型" style="width:203px">
                                <el-option label="是否" value="是否"></el-option>
                                <el-option label="数字" value="数字"></el-option>
                                <el-option label="单行文本" value="单行文本"></el-option>
                                <el-option label="单行文本(带选项)" value="单行文本(带选项)"></el-option>
                                <el-option label="多行文本" value="多行文本"></el-option>
                                <el-option label="日期" value="日期"></el-option>
                                <el-option label="日期时间" value="日期时间"></el-option>
                                <el-option label="选项" value="选项"></el-option>
                                <el-option label="资源" value="资源"></el-option>
                                <el-option label="通用编码" value="通用编码"></el-option>
                                <el-option label="文件" value="文件"></el-option>
                                <el-option label="链接" value="链接"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选项类型" style="margin-left:17px">
                            <el-select v-model="elform.OptionType" placeholder="请选择选项类型" style="width:219px">
                                <el-option label="下拉单选" value="下拉单选"></el-option>
                                <el-option label="下拉多选" value="下拉多选"></el-option>
                                <el-option label="平面单选" value="平面单选"></el-option>
                                <el-option label="平面多选" value="平面多选"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="值域资源">
                            <el-select v-model="elform.DRID" filterable :filter-method="resourcedatafilter" :default-first-option=true placeholder="请选择资源" style="width:203px">
                                <el-option v-for="(item,index) in DRList" :label="item.DRName" :value="item.DRID" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否必填" style="margin-left:17px">
                            <el-select v-model="elform.IFRequired" placeholder="请选择" style="width:219px">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="长度">
                            <el-input v-model="elform.Length"></el-input>
                        </el-form-item>
                        <el-form-item label="精度" style="margin-left:20px">
                            <el-input v-model="elform.Precision" style="width:217px"></el-input>
                        </el-form-item>
                        <el-form-item label="单位">
                            <el-input v-model="elform.Unit"></el-input>
                        </el-form-item>
                        <el-form-item label="默认值" style="margin-left:20px">
                            <el-input v-model="elform.Defaulta" style="width:217px"></el-input>
                        </el-form-item>
                        <el-form-item label="是否展示主目录">
                            <el-select v-model="elform.IFZSZML" placeholder="请选择" style="width:202px">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否展示名称" style="margin-left:17px">
                            <el-select v-model="elform.IFZSMC" placeholder="请选择" style="width:219px">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="编码目录">
                            <el-select v-model="elform.CDID" filterable :filter-method="resourcedatafilter" :default-first-option=true placeholder="请选择资源" style="width:202px">
                                <el-option v-for="(item,index) in CDList" :label="item.CDName" :value="item.CDID" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="要素分类" style="margin-left:20px">
                            <el-select v-model="elform.ElementClassify" placeholder="请选择" style="width:219px">
                                <el-option label="普通要素" value="普通要素"></el-option>
                                <el-option label="计算要素" value="计算要素"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="elform.Note" style="width:564px"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="colse()">取 消</el-button>
                        <el-button type="primary" :loading="loading" @click="elsubmitForm('elform')">确 定</el-button>
                    </span>
                </el-dialog>
            </el-row>
        </el-main>
    </el-container>
    <!-- 资源目录右键菜单 -->
    <div v-show="menuVisible">
        <ul id="menu" class="menu">
            <li class="ms-item wrap-ms-right" @click="handleAdd()"><i class="el-icon-circle-plus icon1"></i>新增资源事务</li>
            <li class="ms-item wrap-ms-right" @click="handleXAdd()"><i class="el-icon-circle-plus icon1"></i>新增下级事务</li>
            <li class="ms-item wrap-ms-right" @click="handleUpdate()"><i class="el-icon-s-order icon1"></i>修改资源事务</li>
            <li class="ms-item wrap-ms-right" @click="handleDelete()"><i class="el-icon-delete-solid icon1"></i>删除资源事务</li>
        </ul>
    </div>
    <!-- 要素目录右键菜单 -->
    <div v-show="elmenuVisible">
        <ul id="elmenu" class="menu">
            <li class="ms-item wrap-ms-right" @click="AddElement()"><i class="el-icon-circle-plus icon1"></i>新增要素</li>
            <li class="ms-item wrap-ms-right" @click="UpdateElement()"><i class="el-icon-s-order icon1"></i>修改要素</li>
            <li class="ms-item wrap-ms-right" @click="DeleteElement()"><i class="el-icon-delete-solid icon1"></i>删除要素</li>
        </ul>
    </div>
</el-container>
</template>

<script>
import axios from 'axios';
//import * as fecha from 'element-ui/lib/utils/date';
export default {
    data() {
        return {
            //表格初始化赋值
            ResourceTableData: [],
            ElementTableData: [],
            ElementClassifyTableData: [],
            CountNormTableData: [],
            ElementRangeTableData: [],

            //标签页首选选项卡
            activeName: 'first',

            //资源目录弹出框参数
            dialogFormVisible: false,
            //资源目录弹框表单
            form: {
                ID: "",
                PID: "",
                Name: "",
                Type: "",
                Note: "",
                LastModify: "",
                ShowName: "",
                TreeForm: 0,
                RelationID: ""

            },
            //资源目录修改时保存当前行的数据
            srow: [],
            //资源目录修改时保存当前行的ID
            rid: null,
            //资源目录编辑标识
            mark: null,
            loading: false,

            //资源目录右键菜单模态框
            menuVisible: false,
            //要素目录右键菜单模态框
            elmenuVisible: false,

            //资源目录对应操作的弹框标题
            choosetitle: '',
            //要素目录对应操作的弹框标题
            elchoosetitle: '',

            //资源目录上级select框自定义搜索方法
            resourcedatafilter: null,
            //根据资源ID获取资源类型
            getType: '',

            //要素目录修改时保存当前行的要素id
            eid: '',
            //要素目录弹窗表格
            elform: {
                EID: "",
                RID: "",
                Name: "",
                Type: "",
                Unit: "",
                Note: "",
                LastModify: "",
                Length: '',
                Precision: '',
                Defaulta: "",
                CID: "",
                IFRequired: '0',
                OptionType: "",
                Numbera: "",
                DRID: "",
                IFZSZML: '0',
                IFZSMC: '1',
                CDID: "",
                ElementClassify: "普通要素"
            }
        };
    },
    created: function () {
        this.treeList();

    },
    computed: {
        //上级资源列表
        PList() {
            var obj = [];
            axios.post("GetAllResources").then(function (res) {
                var Pdata = res.data;
                for (let i in Pdata) {
                    obj.push({
                        ID: Pdata[i].ID,
                        Name: Pdata[i].Name
                    })
                }
                //console.log("进入测试");
                //console.log(obj);
            });
            return obj;
        },
        //要素目录分类列表
        ClassifyList() {
            var obj = [];
            this.$ajax.post("GetAllElementClassifyByRID",
                this.$qs.stringify({
                    RID: this.rid
                })).then(function (res) {
                var Cdata = res.data;
                for (let i in Cdata) {
                    obj.push({
                        CID: Cdata[i].ID,
                        CName: Cdata[i].Name
                    })
                }
            });
            return obj;
        },
        //值域资源列表
        DRList(){
            var obj = [];
            this.$ajax.post("GetAllDR",).then(function (res) {
                var DRdata = res.data;
                for (let i in DRdata) {
                    obj.push({
                        DRID: DRdata[i].RID,
                        DRName: DRdata[i].Name
                    })
                }
            });
            return obj;
        },
        //通用编码目录列表
        CDList(){
            var obj = [];
            this.$ajax.get("GetAllGCodedir",).then(function (res) {
                var CDdata = res.data;
                for (let i in CDdata) {
                    obj.push({
                        CDID: CDdata[i].ID,
                        CDName: CDdata[i].Name
                    })
                }
            });
            return obj;
        }
    },
    methods: {
        //资源目录树形网格
        treeList() {
            var that = this;
            axios.post("GetAllResources").then(function (res) {
                var AllData = res.data;
                console.log(AllData);
                let map = {};
                let val = [];
                //生成数据对象集合
                AllData.forEach(it => {
                    map[it.ID] = it; //department_id为每个节点的id
                });
                //生成结果集
                AllData.forEach(it => {
                    const parent = map[it.PID]; //pid_department_id为父节点的id
                    if (parent) {
                        if (!Array.isArray(parent.children)) parent.children = [];
                        parent.children.push(it);
                    } else {
                        val.push(it)
                    }
                });
                for (var i in AllData) {
                    if (AllData[i].children == null) {
                        delete AllData[i];
                        //AllData.splice(i, 1);
                        for (var j in AllData) {
                            if (AllData[j].PID != null) {
                                delete AllData[j];
                                // AllData.splice(j, 1);
                            }
                        }
                    }
                };
                console.log(AllData);
                that.ResourceTableData = AllData;
            });
        },
        //资源--要素--分类--统计指标 联动
        elementlink(row, column, event) {
            var that = this;
            console.log(row.ID);
            //要素
            this.$ajax.post('GetAllELementByResourceID',
                    this.$qs.stringify({
                        RID: row.ID
                    }))
                //返回成功调用
                .then(function (res) {
                    console.log(res);
                    that.ElementTableData = res.data;
                })
                //返回失败调用
                .catch(function (res) {
                    console.log("出错了")
                });
            //分类
            this.$ajax.post('GetAllElementClassifyByRID',
                    this.$qs.stringify({
                        RID: row.ID
                    }))
                .then(function (res) {
                    console.log(res);
                    that.ElementClassifyTableData = res.data;
                })
                .catch(function (res) {})
            //统计指标
            this.$ajax.post('GetCountNormByRID',
                    this.$qs.stringify({
                        RID: row.ID
                    }))
                .then(function (res) {
                    console.log(res);
                    that.CountNormTableData = res.data;
                })
                .catch(function (res) {})
        },
        //要素目录--文本值域选项 联动
        elementrangelink(row, column, event) {
            var that = this;
            console.log(row.ID);
            //要素值域选项
            this.$ajax.post('GetElementRangeByEID',
                    this.$qs.stringify({
                        EID: row.ID
                    }))
                .then(function (res) {
                    console.log(res);
                    that.ElementRangeTableData = res.data;
                })
                .catch(function (res) {})
        },
        //选中表格行高亮显示
        ResourceTableChange(val) {
            this.current = val;
        },
        ElementTableChange(val) {
            this.current = val;
        },
        ElementClassifyTableChange(val) {
            this.current = val;
        },
        CountNormTableChange(val) {
            this.current = val;
        },
        ElementRangeTableChange(val) {
            this.current = val;
        },
        //资源目录右键点击事件
        rightClick(row, event) {
            this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
            var menu = document.querySelector('#menu');
            this.styleMenu(menu);
            this.srow = row; //将当前行的数据保存至srow中
            //   console.log("进入保存");
            console.log(this.srow);
            //  console.log("退出保存");
            this.rid = row.ID;
            console.log(event);
        },
        //要素目录右键点击事件
        elrightClick(row, event) {
            this.elmenuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.elmenuVisible = true; // 显示模态窗口，跳出自定义菜单栏
            var elmenu = document.querySelector('#elmenu');
            this.styleMenu(elmenu);
            this.srow = row; //将当前行的数据保存至srow中
            // console.log("进入保存");
            console.log(this.srow);
            // console.log("退出保存");
            this.rid = row.RID;
            this.eid = row.EID;
            // console.log(event);
        },
        //弹窗公共方法
        foo() {
            //取消资源目录鼠标监听事件
            this.menuVisible = false;
            //取消要素目录鼠标监听事件
            this.elmenuVisible = false;
            document.removeEventListener('click', this.foo); //及时关掉监听
        },
        styleMenu(menu) {
            event.preventDefault();
            if (event.clientX > 1800) {
                menu.style.left = event.clientX - 100 + 'px';
            } else {
                menu.style.left = event.clientX + 1 + 'px';
            }
            document.addEventListener('click', this.foo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
            if (event.clientY > 700) {
                menu.style.top = event.clientY - 30 + 'px';
            } else {
                menu.style.top = event.clientY - 10 + 'px';
            }
        },

        //资源目录新增本级
        handleAdd() {
            this.choosetitle = "新增资源事务";
            this.dialogFormVisible = true;
            this.mark = 1; //编辑标识
            //   this.form = {}; //清空表单
        },

        //资源目录新增下级
        handleXAdd() {
            this.choosetitle = "新增下级事务";
            this.dialogFormVisible = true;
            this.mark = 1;
            this.form.PID = this.srow.ID; //将本级的ID作为PID
            this.form.Type = "事务";
        },

        //资源目录修改
        handleUpdate() {
            this.choosetitle = "修改资源";
            this.mark = 2;
            //console.log(this.srow);
            //console.log(this.mark);
            this.dialogFormVisible = true;
            this.form = this.srow;
        },
        //根据资源ID获取资源类型
        getTypeData() {
            var that = this;
            this.$ajax.post('GetTypeByRID',
                    this.$qs.stringify({
                        RID: this.form.PID
                    }))
                //返回成功调用
                .then(function (res) {
                    var GetType = res.data[0].Type;
                    that.getType = GetType;
                    //  console.log("调用");
                    //  console.log(that.getType);
                })
                //返回失败调用
                .catch(function (res) {
                    console.log("没有找到类型");
                });
        },
        //资源目录弹框点击确认事件
        submitForm(forname) {
            var that = this;
            if (this.form.Type == "") {
                this.$message.error('请输入资源类型');
            } else if (this.form.Name == "") {
                this.$message.error('请输入资源名称');
            } else {
                if (this.mark == 1) {
                    console.log("aa");
                    console.log(this.form);
                    var Type1 = this.form.Type;
                    console.log(Type1);
                    console.log("aa");
                    this.getTypeData();

                    console.log(this.getType);

                    if (this.getType == "资源" && Type1 == "资源") {
                        this.$message({
                            message: '资源的下级不允许再挂资源，只能添加【附加资源】！',
                            type: 'warning',
                            center: true,
                            duration: 4000,
                            offset: 40
                        });
                    } else if (this.getType == "事务" && Type1 == "事务") {
                        this.$message({
                            message: '事务的下级不允许再挂事务！',
                            type: 'warning',
                            center: true,
                            duration: 4000,
                            offset: 40
                        });
                    } else if (this.getType == "业务" && Type1 == "业务明细") {
                        this.$message({
                            message: '业务明细必须挂在业务的下级！',
                            type: 'warning',
                            center: true,
                            duration: 4000,
                            offset: 40
                        });
                    } else if (this.getType == "资源" && Type1 == "资源关系" && this.getType != "附加资源" && this.getType != "事务") {
                        this.$message({
                            message: '资源关系必须挂在资源或者附加资源的下级！',
                            type: 'warning',
                            center: true,
                            duration: 4000,
                            offset: 40
                        });
                    } else {
                        console.log("进入新增");
                        this.$ajax.post("CreateResource", this.form)
                            .then(function (obj) {
                                that.$message({
                                    type: 'success',
                                    message: '新增成功',
                                    duration: 4000,
                                    offset: 40
                                });
                                that.dialogFormVisible = false;
                                that.form = {};
                                that.mark = null;
                                that.treeList();
                            })
                            .catch(function (obj) {
                                console.log("新增失败");
                                that.$message({
                                    type: 'warning',
                                    message: '出现未知错误！',
                                    duration: 4000,
                                    offset: 40
                                });
                            })
                    }

                } else {

                    if (this.getType == "资源" && Type1 == "资源") {
                        this.$message({
                            message: '资源的下级不允许再挂资源，只能添加【附加资源】！',
                            type: 'warning',
                            center: true,
                            duration: 4000,
                            offset: 40
                        });
                    } else if (this.getType == "事务" && Type1 == "事务") {
                        this.$message({
                            message: '事务的下级不允许再挂事务！',
                            type: 'warning',
                            center: true,
                            duration: 4000,
                            offset: 40
                        });
                    } else if (this.getType == "业务" && Type1 == "业务明细") {
                        this.$message({
                            message: '业务明细必须挂在业务的下级！',
                            type: 'warning',
                            center: true,
                            duration: 4000,
                            offset: 40
                        });
                    } else if (this.getType == "资源" && Type1 == "资源关系" && this.getType != "附加资源" && this.getType != "事务") {
                        this.$message({
                            message: '资源关系必须挂在资源或者附加资源的下级！',
                            type: 'warning',
                            center: true,
                            duration: 4000,
                            offset: 40
                        });
                    } else {
                        console.log("进入修改");
                        this.$ajax.put('PutResourceByID', this.form)
                            //返回成功调用
                            .then((res) => {
                                that.$message({
                                    type: 'success',
                                    message: '修改成功！',
                                    duration: 4000,
                                    offset: 40
                                });
                                that.dialogFormVisible = false;
                                that.form = {};
                                that.mark = null;
                                that.treeList();

                            })
                            //返回失败调用
                            .catch((res) => {
                                that.$message({
                                    type: 'warning',
                                    message: '修改失败！',
                                    duration: 4000,
                                    offset: 40
                                });
                            });
                    }
                }
            }
        },

        //关闭并清空模态框
        colse() {
            //关闭资源目录弹框
            this.dialogFormVisible = false;
            this.form = {};
            //关闭要素目录弹框
            this.eldialogFormVisible = false;
            this.elform = {};
        },
        //点击X关闭模态框
        closedialog(done) {
            this.$confirm('确认关闭？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(_ => {
                    done();
                    this.form = {};
                    this.mark = null;
                    this.$refs['form'].resetFields();
                })
                .catch(_ => {});
        },

        //资源目录右键删除
        handleDelete() {
            this.$confirm('是否要删除当前资源目录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    this.$ajax.delete('DeleteResourceByID', {
                            params: ({
                                ResourceId: this.rid
                            })
                        })
                        //返回成功调用
                        .then((res) => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //location.reload();
                            this.treeList();
                        })
                        //返回失败调用
                        .catch((res) => {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });

                        });
                })
                .catch(() => {});
        },
        // 下拉框开启搜索功能
        resourcedatafilter(val) {
            this.value = val
            if (val) {
                this.options = this.optionsCopy.filter((item => {
                    if (!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase())) {
                        return true;
                    }
                }))
            } else {
                this.options = this.optionsCopy; //val为空时，还原数组
            }
        },

        //列表日期格式转换
        // dateFormat(row,column,cellValue){
        //     console.log(row,column,cellValue);
        //     return cellValue?fecha.format(new Date(cellValue),'yyyy-MM-dd'):'';
        // },
        //要素目录新增
        AddElement() {
            this.elchoosetitle = "新增要素";
            this.eldialogFormVisible = true;
            this.mark = 1;
        },
        //要素目录修改
        UpdateElement() {

        },
        //要素目录删除
        DeleteElement() {

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
</style>>
