<!DOCTYPE html>
<template>

    <el-container>
        <el-container>
            <!-- 资源目录树形表格 -->            
                <el-aside width="350px">
                    <el-table :data="ResourceTableData" @row-contextmenu="rightClick" node-key="id" style="width: 100%;margin-bottom: 20px;" height="1000px" row-key="资源名称" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @row-click="elementlink" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" highlight-current-row @current-change="ResourceTableChange">
                        <el-table-column prop="资源名称" label="资源名称" width="220px">
                        </el-table-column>
                        <el-table-column prop="类型" label="类型">
                        </el-table-column>
                    </el-table>
                </el-aside>
                <div id="menu" v-show="menuVisible">
                    <li class="ms-item wrap-ms-right"  @click.stop="infoClick(0)"><i class="el-icon-circle-plus icon1"></i>新增本级</li>
                    <li class="ms-item wrap-ms-right"  @click.stop="infoClick(1)"><i class="el-icon-circle-plus icon1"></i>新增下级</li>
                    <li class="ms-item wrap-ms-right"  @click.stop="infoClick(2)"><i class="el-icon-s-order icon1"></i>修改</li>
                    <li class="ms-item wrap-ms-right"  @click.stop="infoClick(3)"><i class="el-icon-delete-solid icon1"></i>删除</li>
                </div>
            <!-- 要素目录表格 -->
            <el-main>
                <el-row>
                    <div class="demo-input-suffix">
                        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" >
                        </el-input>
                      </div>
                     
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
                        <el-table-column label="最后修改时间" prop="最后修改时间" width="220px">
                        </el-table-column>
                    </el-table>
                </el-row>
                <hr>

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
                        <el-tab-pane label="明细管理" name="1">
                            <el-table :data="DetailTableData" height="300px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" @row-click="detaillink" border highlight-current-row @current-change="DetailTableChange">
                                <el-table-column label="明细名称" prop="明细名称">
                                </el-table-column>
                                <!-- <el-table-column label="明细要素信息" prop="明细要素信息">
                                </el-table-column> -->
                                <el-table-column label="上级明细名称" prop="上级明细名称">
                                </el-table-column>
                                <el-table-column label="事务时间" prop="事务时间">
                                </el-table-column>
                                <el-table-column label="备注" prop="备注">
                                </el-table-column>
                                <el-table-column label="最后修改人" prop="最后修改人">
                                </el-table-column>
                                <el-table-column label="最后修改时间" prop="最后修改时间">
                                </el-table-column>
                            </el-table>
                            <hr>                       
                            <el-table :data="AuthorityTableData" height="131.5px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row @current-change="AuthorityTableChange">
                                <el-table-column label="角色名称" prop="角色名称">
                                </el-table-column>
                                <el-table-column label="类型" prop="类型">
                                </el-table-column>
                                <el-table-column label="权限类型" prop="权限类型">
                                </el-table-column>
                                <el-table-column label="主体名称" prop="主体名称">
                                </el-table-column>
                                <el-table-column label="最后修改人" prop="最后修改人">
                                </el-table-column>
                                <el-table-column label="最后修改时间" prop="最后修改时间">
                                </el-table-column>
                            </el-table>
                            <!-- <el-table :data="infoData" height="131.5px" :header-cell-style="{background:'rgba(150, 154, 146, 0.26)',color:'#606266'}" border highlight-current-row >
                                <el-table-column label="编号" prop="编号">
                                </el-table-column>
                                <el-table-column label="说明" prop="说明">
                                </el-table-column>
                            </el-table> -->
                        </el-tab-pane>
                        <!-- Dialog 弹出一个对话框 -->

                        <el-dialog title="添加资源" :visible.sync="dialogFormVisible" width="30%">
                            <el-form ref="form"  label-width="80px">
                                <el-form-item label="上级">
                                    <el-select v-model="form.上级资源ID" placeholder="请选择上级">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
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
                                    <el-switch v-model="form.是否树形"></el-switch>
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
                        
                    </el-tabs>
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
                //右键菜单
                menus: ['新增本级', '新增下级', '修改', '全部展开','全部折叠'],
                menuVisible: false,
                resourceId: null,
                //资源数据
                ResourceTableData: [],
                ElementTableData: [],
                ElementClassifyTableData: [],
                CountNormTableData: [],
                ElementRangeTableData: [],
                AuthorityTableData: [],
                DetailTableData: [],
                infoData: [],
                //标签页首选选项卡
                activeName: 'first',    
                dialogFormVisible: false,
                form: [],
                formLabelWidth: '120px'
            };
        },
        created: function () {
            this.treeList();
    
        },
        watch: {
            menuVisible(value) {
            if (value) {
                document.body.addEventListener('click', this.foo);
            } else {
                document.body.removeEventListener('click', this.foo);
            }
            }
        },
        methods: {
            //点击选择功能
            infoClick(index) { 
                if (this.menus[index] == "新增本级") {
                    this.dialogFormVisible = true;
                } else if(this.menus[index] == "新增下级"){
                    this.$alert(this.menus[index]+'功能还没有做哟', {
                        confirmButtonText: '确定',
                        callback: action => {
                        var menu = document.querySelector("#menu");
                        menu.style.display = 'none';
                    }
                });   
                }else if(this.menus[index] == "修改"){
                    this.$alert(this.menus[index]+'功能还没有做哟', {
                        confirmButtonText: '确定',
                        callback: action => {
                        var menu = document.querySelector("#menu");
                        menu.style.display = 'none';
                    }
                });   
                }else{
                    this.$alert("我也不知道你点了什么！",{
                        confirmButtonText: '确定',
                        callback: action => {
                        var menu = document.querySelector("#menu");
                        menu.style.display = 'none';
                    }
                    });
                }

            },
            //确认新增
            handleConfirm(){
                this.$alert("功能还没做哟",{
                        confirmButtonText: '确定',
                        
                    });
            },
            //右键菜单
            rightClick(row, column, event) {
                this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
                this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
                var menu = document.querySelector("#menu");
                // console.log(row.资源ID);
                this.resourceId = row.资源ID;
                event.preventDefault();
                //获取我们自定义的右键菜单
                // 根据事件对象中鼠标点击的位置，进行定位
                menu.style.left = event.clientX + 'px';
                menu.style.top = event.clientY + 'px';
                // 改变自定义菜单的隐藏与显示
                menu.style.display = 'block';
               
            },
            foo() { // 取消鼠标监听事件 菜单栏
                this.menuVisible = false
                document.removeEventListener('click', this.foo) 
            },
            //右侧对话框
            handleClose(done) {
              this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {});
            },
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
                })
            },
            detaillink(row,column,event){
                // var infoData = JSON.parse(row.明细要素信息);
                var that = this;
                //角色权限                
                this.$ajax.post('http://localhost:52225/api/Authority/GetAuthorityListByResourceDetailID',
                        this.$qs.stringify({
                            ResourceDetailID: row.资源明细id
                        }))
                    //返回成功调用
                    .then(function (res) {
                        that.AuthorityTableData = res.data;
                    })
                    //返回失败调用
                    .catch(function (res) {});
            },
            //资源--要素--分类--统计指标 联动
            elementlink(row, column, event) {
                var that = this;
                
                //明细
                this.$ajax.post('http://localhost:52225/api/Detail/GetDetailListByResourceID',
                        this.$qs.stringify({
                            ResourceID: row.资源ID
                        }))
                    //返回成功调用
                    .then(function (res) {
                        that.DetailTableData = res.data;
                    })
                    //返回失败调用
                    .catch(function (res) {});
                //要素
                this.$ajax.post('http://localhost:52225/api/Element/GetElementListByResourceID',
                        this.$qs.stringify({
                            ResourceID: row.资源ID
                        }))
                    //返回成功调用
                    .then(function (res) {
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
                        that.ElementClassifyTableData = res.data;
                    })
                    .catch(function (res) {})
                //统计指标
                this.$ajax.post('http://localhost:52225/api/CountNorm/GetCountNormListByResourceID',
                        this.$qs.stringify({
                            ResourceID: row.资源ID
                        }))
                    .then(function (res) {
                        that.CountNormTableData = res.data;
                    })
                    .catch(function (res) {})
            },
            // 选中表格行高亮显示
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
            DetailTableChange(val){
                this.current = val;
            },
            AuthorityTableChange(val){
                this.current = val;
            }
           
        }
    }
    </script>
    
    <style scoped>
    /* scoped 表示该css样式只在本页面生效 */
    .elcochoose {
        margin-top: 10px;
        background-color:rgba(217, 217, 208, 0.2);
    }
    /* 右键菜单 */
    #menu {
        width: 110px; 
        overflow: hidden; /*隐藏溢出的元素*/
        box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
        position: absolute; 
        display: none;
        z-index: 10;
        background-color: white;
        border: 1px solid #e1e1e0;
    }
 
    .wrap-ms-right {
        list-style: none;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        color: #606266;
        font-size: 16px;        
    }
    .ms-item {
        height: 30px;
        line-height: 30px;
        text-align: left;
        cursor: pointer;
    }
    .icon1{
        margin-left: 14px;
        margin-right: 3px;
    }
    .ms-item:hover {
        background-color:#525a64;
        color: #FFFFFF;
    }
    .el-tag{
        color: #525A62;
    }
    /* 搜索框 */
    .demo-input-suffix {
        width: 30%;
        float:right;
        margin-bottom: 10px;
    }
    </style>
   