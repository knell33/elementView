<template>
<el-container>
    <el-container>
        <!-- 资源目录树形表格 -->
        <el-aside width="350px">
            <el-table :data="ResourceTableData" style="width: 100%;margin-bottom: 20px;" height="1000px" row-key="资源名称" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @row-click="elementlink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" highlight-current-row @current-change="ResourceTableChange" @row-contextmenu="rightClick">
                <el-table-column prop="资源名称" label="资源名称">
                </el-table-column>
                <el-table-column prop="类型" label="类型">
                </el-table-column>
            </el-table>
            <div v-show="menuVisible">
                <ul id="menu" class="menu">
                    <li class="menu__item" @click="handleAdd()">本级新增</li>
                    <li class="menu__item" @click="handleAdd">下级新增</li>
                    <li class="menu__item">修改</li>
                    <li class="menu__item">删除</li>
                </ul>
            </div>
        </el-aside>
        <!-- 要素目录表格 -->
        <el-main>
            <el-row>
                <el-table :data="ElementTableData" height="460px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="ElementTableChange">
                    <el-table-column label="序号" prop="序号">
                    </el-table-column>
                    <el-table-column label="分类名称" prop="分类名称">
                    </el-table-column>
                    <el-table-column label="要素名称" prop="要素名称">
                    </el-table-column>
                    <el-table-column label="要素类型" prop="要素类型">
                    </el-table-column>
                    <el-table-column label="选项类型" prop="选项类型">
                    </el-table-column>
                    <el-table-column label="定义指标个数" prop="定义指标个数">
                    </el-table-column>
                    <el-table-column label="单位" prop="单位">
                    </el-table-column>
                    <el-table-column label="长度" prop="长度">
                    </el-table-column>
                    <el-table-column label="精度" prop="精度">
                    </el-table-column>
                    <el-table-column label="要素分类" prop="要素分类">
                    </el-table-column>
                    <el-table-column label="选项" prop="选项">
                    </el-table-column>
                    <el-table-column label="备注" prop="备注">
                    </el-table-column>
                    <el-table-column label="最后修改人" prop="最后修改人">
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="最后修改时间">
                    </el-table-column>
                </el-table>
            </el-row>

            <el-row class="elcochoose">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="要素分类" name="first">
                        <!-- 要素分类表格 -->
                        <el-table :data="ElementClassifyTableData" height="450px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="ElementClassifyTableChange">
                            <el-table-column label="分类名称" prop="分类名称">
                            </el-table-column>
                            <el-table-column label="备注" prop="备注">
                            </el-table-column>
                            <el-table-column label="最后修改人" prop="最后修改人">
                            </el-table-column>
                            <el-table-column label="最后修改时间" prop="最后修改时间">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="统计指标定义" name="second">
                        <!-- 统计指标关联表格 -->
                        <el-table :data="CountNormTableData" height="450px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="CountNormTableChange">
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
                    </el-tab-pane>
                    <el-tab-pane label="要素值域选项" name="third">
                        <!-- 要素值域选项表格 -->
                        <el-table :data="ElementRangeTableData" height="450px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="ElementRangeTableChange">
                            <el-table-column label="选项名称" prop="选项名称">
                            </el-table-column>
                            <el-table-column label="备注" prop="备注">
                            </el-table-column>
                            <el-table-column label="最后修改人" prop="最后修改人">
                            </el-table-column>
                            <el-table-column label="最后修改时间" prop="最后修改时间">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>

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

                <el-dialog title="新增资源" :visible.sync="dialogFormVisible" width="30%">
                    <el-form ref="mform" :model="form" label-width="80px">
                        <el-form-item label="上级">
                            <el-select v-model="form.上级资源ID" placeholder="请选择上级">
                                <el-option v-for="item in ResourceTableData" :label="item.资源名称" :value="item.资源ID"></el-option>
                                
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="form.类型" placeholder="请选择资源类型">
                                <el-option label="目录" value="目录"></el-option>
                                <el-option label="资源" value="资源"></el-option>
                                <el-option label="附加资源" value="附加资源"></el-option>
                                <el-option label="资源关系" value="资源关系"></el-option>
                                <el-option label="事务" value="事务"></el-option>
                                <el-option label="业务" value="业务"></el-option>
                                <el-option label="业务明细" value="业务明细"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="form.资源名称"></el-input>
                        </el-form-item>
                        <el-form-item label="显示名称">
                            <el-input v-model="form.显示名称"></el-input>
                        </el-form-item>

                        <el-form-item label="是否树形">
                            <el-switch v-model="form.是否树形" :active-value="1":inactive-value="0"@change=chang($event,state)></el-switch>
                        </el-form-item>
                        <el-form-item label="备注">

                            <el-input type="textarea" v-model="form.备注"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible=false">取 消</el-button>
                        <el-button type="primary" @click="handleConfirm">确 定</el-button>
                    </span>
                </el-dialog>

            </el-row>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
import { Message } from 'element-ui'
Vue.use(Message)
Vue.prototype.$message = Message;
export default {
    data() {
        return {
            ResourceTableData: [],
            ALL:[],
            ElementTableData: [],
            ElementClassifyTableData: [],
            CountNormTableData: [],
            ElementRangeTableData: [],
            //标签页首选选项卡
            activeName: 'first',
            menuVisible: false,
            dialogFormVisible: false,
            form:{
                上级资源ID:"",
                资源名称:"",
                类型:"",
                备注:"",
                最后修改人:"",
                显示名称:"",
                是否树形:0,
                关系资源ID:""

            },
            formLabelWidth: '120px'
        };
    },
    created: function () {
        this.treeList();

    },
    methods: {

        //资源目录树形网格
        treeList() {
            var that = this;
            axios.post("http://localhost:52225/api/Resource/GetResource").then(function (res) {
                let datas = res.data;
                var AllData = datas;

                let treeMapList = AllData.reduce((memo, current) => {
                    current.label = current.资源名称;
                    memo[current["资源ID"]] = current;
                    return memo;
                }, {});
                let resultdata = AllData.reduce((arr, current) => {
                    let pid = current.上级资源ID;
                    let parent = treeMapList[pid];
                    if (parent) {
                        parent.children ? parent.children.push(current) : parent.children = [current]
                    } else if (pid === "") { //则是根节点
                        arr.push(current)
                    }
                    return arr;
                }, []);
                that.ResourceTableData = resultdata;
                that.ALL=treeMapList;
                console.log(that.ResourceTableData);
            })
        },
        //资源--要素--分类--统计指标 联动
        elementlink(row, column, event) {
            var that = this;
            console.log(row, event, column);
            //要素
            this.$ajax.post('http://localhost:52225/api/Element/GetElementListByResourceID',
                    this.$qs.stringify({
                        ResourceID: row.资源ID
                    }))
                //返回成功调用
                .then(function (res) {
                    console.log(res);
                    that.ElementTableData = res.data;
                })
                //返回失败调用
                .catch(function (res) {});
            //分类
            this.$ajax.post('http://localhost:52225/api/ElementClassify/GetElementClassifyListByResourceID',
                    this.$qs.stringify({
                        ResourceID: row.资源ID
                    }))
                .then(function (res) {
                    console.log(res);
                    that.ElementClassifyTableData = res.data;
                })
                .catch(function (res) {})
            //统计指标
            this.$ajax.post('http://localhost:52225/api/CountNorm/GetCountNormListByResourceID',
                    this.$qs.stringify({
                        ResourceID: row.资源ID
                    }))
                .then(function (res) {
                    console.log(res);
                    that.CountNormTableData = res.data;
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
        //y j c d
        rightClick(row, event) {
            this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
            this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
            var menu = document.querySelector('#menu');

            this.styleMenu(menu);
            console.log(row);
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
        //点击增加
        handleAdd() {
            this.dialogFormVisible = true;
        },

         resetForm(formName) {
         this.$refs[formName].resetFields();},

        //点击确认
        handleConfirm() { 
           
    
            this.$ajax.post('http://localhost:52225/api/Resource/GreateNResource',this.form)                  
                //返回成功调用
                .then((res)=>{
                     this.$message('新增成功!');
                     this.dialogFormVisible=false;
                     this.$refs['mform'].resetFields(); // 清空表单
                     this.$refs['mform'].clearValidate();//清空数据
                     location.reload();

                })
                //返回失败调用
                .catch((res)=>{
                     this.$message('新增失败!');
                     

                
                });
        }

    }
}
</script>

<style scoped>
/* scoped 表示该css样式只在本页面生效 */
.elcochoose {
    margin-top: 10px;
}

.menu__item {
    display: block;
    line-height: 20px;
    text-align: left;
    margin-top: 10px;

}

.menu {
    height: 130px;
    width: 70px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid #999999;
    background-color: #f4f4f4;
}

li:hover {
    background-color: #1790ff;
    color: white;
}
</style>
