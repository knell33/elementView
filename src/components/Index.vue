<template>
<el-container>
    <el-container>
        <!-- 资源目录树形表格 -->
        <el-aside width="350px">
            <el-table :data="ResourceTableData" style="width: 100%;margin-bottom: 20px;" height="1000px" row-key="ID" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @row-click="elementlink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" highlight-current-row @current-change="ResourceTableChange">
                <el-table-column prop="Name" label="资源名称">
                </el-table-column>
                <el-table-column prop="Type" label="类型">
                </el-table-column>
            </el-table>
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
            <!-- 标签分栏表格 -->
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

                <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

                <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="活动名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
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
            form: [],
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
            axios.post("https://localhost:44331/api/GetAllResources").then(function (res) {
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
                for(var i in AllData){
                    if(AllData[i].children == null){
                        delete AllData[i];
                        //AllData.splice(i, 1);
                        for(var j in AllData){
                            if(AllData[j].PID != null){
                                delete AllData[j];
                               // AllData.splice(j, 1);
                            }
                        }
                    }
                };
                console.log(AllData);
                that.ResourceTableData = AllData;
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
        }
    }
}
</script>

<style scoped>
/* scoped 表示该css样式只在本页面生效 */
.elcochoose {
    margin-top: 10px;
}
</style>>
