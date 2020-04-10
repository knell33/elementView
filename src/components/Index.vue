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
            <!-- 资源目录右键菜单 -->
            <div v-show="menuVisible">
                <ul id="menu" class="menu">
                    <li class="ms-item wrap-ms-right" @click="handleAdd()"><i class="el-icon-circle-plus icon1"></i>新增资源事务</li>
                    <li class="ms-item wrap-ms-right" @click="handleXAdd()"><i class="el-icon-circle-plus icon1"></i>新增下级事务</li>
                    <li class="ms-item wrap-ms-right" @click="handleUpdate()"><i class="el-icon-s-order icon1"></i>修改</li>
                    <li class="ms-item wrap-ms-right" @click="handleDelete()"><i class="el-icon-delete-solid icon1"></i>删除</li>
                </ul>
            </div>
        </el-aside>
        <!-- 要素目录表格 -->
        <el-main>
            <el-row>
                <el-table :data="ElementTableData" height="460px" @row-click="elementrangelink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="ElementTableChange">
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
                    <el-table-column label="定义指标个数" prop="DYZBGS">
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
                    <el-table-column label="最后修改时间" prop="LastDate">
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
                <el-dialog :title="choosetitle" :visible.sync="dialogFormVisible" :before-close="closedialog" width="30%" id="resourceiframe">
                    <el-form ref="form" :model="form" :rules="ResourceRules" status-icon label-width="80px">
                        <el-form-item label="上级" prop="PID">
                            <el-select v-model="form.PID" filterable :filter-method="resourcedatafilter" :default-first-option=true placeholder="请选择上级">
                                <el-option v-for="(item,index) in PList" :label="item.Name" :value="item.ID" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型" prop="Type">
                            <el-select v-model="form.Type" placeholder="请选择资源类型">
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
            </el-row>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import axios from 'axios';
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
            //弹出框参数
            dialogFormVisible: false,
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
            //验证规格
            ResourceRules: {
                Type: [{
                    required: true,
                    message: '请选择类型',
                    trigger: 'blur'
                }],
                Name: [{
                    required: true,
                    message: '请输入名称',
                    trigger: 'blur'
                }]
            },
            //修改时保存当前行的数据
            srow: [],
            //修改时保存当前行的ID
            rid: null,
            //编辑标识
            mark: null,
            //右键菜单模态框
            menuVisible: false,
            //
            loading: false,

            formLabelWidth: '120px',
            //资源目录对应操作的弹框标题
            choosetitle: '',
            // resourcedatafilter: '',
            getType: '',
        };
    },
    created: function () {
        this.treeList();

    },
    computed: {
        //上级资源列表
        PList() {
            var obj = [];
            axios.post("http://localhost:62200/api/GetAllResources").then(function (res) {
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
        foo() {
            // 取消鼠标监听事件 菜单栏
            this.menuVisible = false;
            document.removeEventListener('click', this.foo); // 要及时关掉监听
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

        //新增本级
        handleAdd() {
            // this.title = "新增本级资源目录";
            this.choosetitle = "新增资源事务";
            this.dialogFormVisible = true;
            this.mark = 1; //编辑标识
            //   this.form = {}; //清空表单
        },

        //新增下级
        handleXAdd() {
            // this.title = "新增下级资源目录"
            this.choosetitle = "新增下级事务";
            this.dialogFormVisible = true;
            this.mark = 1;
            this.form.PID = this.srow.ID; //将本级的ID作为PID
            this.form.Type = "事务";
        },

        //修改
        handleUpdate() {
            this.choosetitle = "修改资源";
            this.mark = 2;
            //console.log(this.srow);
            //console.log(this.mark);
            this.dialogFormVisible = true;
            this.form = this.srow;
        },
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
        //点击确认
        submitForm(forname) {
            var that =this;
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
            this.dialogFormVisible = false;
            this.title = "";
            this.form = {};
            this.$refs['form'].resetFields();

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
                    this.title = "";
                    this.$refs['form'].resetFields();
                })
                .catch(_ => {});
        },
        //右键删除
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

    },
    // 上级资源列表下拉框开启搜索功能
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
