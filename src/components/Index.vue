<!DOCTYPE html>
<template>
    <el-container>
        <el-container>
            <!-- 资源目录树形表格 -->
            <el-aside width="350px">
                <h3 class="tabletitle ttop">资源目录</h3>
                <el-table :data="ResourceTableData" style="width: 100%;margin-bottom: 20px;" height="870px" row-key="ID"
                    border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @row-click="elementlink"
                    :header-cell-style="{background:'white',color:'#606266'}" highlight-current-row
                    @current-change="ResourceTableChange" @row-contextmenu="rightClick"
                    @header-contextmenu="rightHeaderClick">
                    <el-table-column prop="Name" label="资源名称" header-align="center">
                    </el-table-column>
                    <el-table-column prop="Type" label="类型" align="center">
                    </el-table-column>
                </el-table>
            </el-aside>
            <!-- 要素目录表格 -->
            <el-main>
                <el-row>
                    <el-tabs v-model="activeName" type="card">
                        <div class="tabletitle g-element">要素目录</div>
                        <el-popover placement="top-start" width="200" trigger="hover" content="点击链接跳转到权限管理界面">
                            <el-button slot="reference" type="info" icon="el-icon-user-solid" class="g-permission" plain
                                @click="Permission()">权限管理</el-button>
                        </el-popover>
                        <!-- <div class="g-permission" @click="Permission()">权限管理</div> -->
                        <!-- <el-table :data="ElementTableData" height="350px" @row-click="elementrangelink" -->
                        <el-table :data="ElementTableData" height="350px"
                            :row-style="changeRowColor" :header-cell-style="{background:'white',color:'#606266'}" border
                            highlight-current-row @current-change="ElementTableChange" @row-contextmenu="elrightClick"
                            @header-contextmenu="elrightHeaderClick"
                            :default-sort="{prop: 'Numbera',order: 'descending'}">
                            <el-table-column label="序号" prop="Numbera" align="center" sortable>
                            </el-table-column>
                            <el-table-column label="分类名称" prop="ClassifyName" align="center">
                            </el-table-column>
                            <el-table-column label="要素名称" prop="Name" align="center">
                            </el-table-column>
                            <el-table-column label="要素类型" prop="Type" align="center">
                            </el-table-column>
                            <el-table-column label="选项类型" prop="OptionType" align="center">
                            </el-table-column>
                            <el-table-column label="定义指标个数" prop="DYZBGS" align="center" width="110px">
                            </el-table-column>
                            <el-table-column label="单位" prop="Unit" align="center">
                            </el-table-column>
                            <el-table-column label="长度" prop="Length" align="center">
                            </el-table-column>
                            <el-table-column label="精度" prop="Precision" align="center">
                            </el-table-column>
                            <el-table-column label="要素分类" prop="ElementClassify" align="center">
                            </el-table-column>
                            <el-table-column label="选项" prop="OptionType" align="center">
                            </el-table-column>
                            <el-table-column label="备注" prop="Note" align="center">
                            </el-table-column>
                            <el-table-column label="最后修改人" prop="LastModify" align="center">
                            </el-table-column>
                            <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" min-width="165px"
                                align="center" sortable>
                            </el-table-column>
                        </el-table>
                    </el-tabs>
                </el-row>
                <!-- 标签分栏表格 -->
                <el-row class="elcochoose">
                    <el-tabs v-model="activeName" type="card">
                        <el-tab-pane label="要素分类" name="first">
                            <!-- 要素分类表格 -->
                            <el-table :data="ElementClassifyTableData" height="440px"
                                :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row
                                @current-change="ElementClassifyTableChange"
                                :row-class-name="ElementClassifytableRowClassName"
                                @row-contextmenu="ElementClassifyRightClick"
                                @header-contextmenu="ElementClassifyheaderRightClick">
                                <el-table-column label="分类名称" prop="Name" align="center" sortable>
                                </el-table-column>
                                <el-table-column label="备注" prop="Note" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改人" prop="LastModify" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" align="center"
                                    sortable>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="统计指标定义" name="second">
                            <!-- 统计指标关联表格 -->
                            <el-table :data="CountNormTableData" @row-contextmenu="rightClickNorm"
                                @header-contextmenu="rightheaderClickNorm" height="440px"
                                :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row
                                @current-change="CountNormTableChange" :row-class-name="CountNormtableRowClassName">
                                <el-table-column label="指标名称" prop="NormName" align="center" sortable>
                                </el-table-column>
                                <el-table-column label="计算类型" prop="CalculateType" align="center" sortable>
                                </el-table-column>
                                <el-table-column label="运算符" prop="Operator" align="center">
                                </el-table-column>
                                <el-table-column label="运算值" prop="Ovalue" align="center">
                                </el-table-column>
                                <el-table-column label="关联类型" prop="AssociationType" align="center">
                                </el-table-column>
                                <el-table-column label="备注" prop="Note" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改人" prop="LastModify" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" align="center"
                                    sortable>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="要素值域选项" name="third">
                            <el-table :data="ElementRangeTableData" height="440px"
                                :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row
                                @current-change="ElementRangeTableChange">
                                <el-table-column class="test" label="选项名称" prop="Name" align="center" sortable>
                                </el-table-column>
                                <el-table-column label="备注" prop="Note" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改人" prop="LastModify" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" align="center"
                                    sortable>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane> -->
                        <!-- 资源明细 -->
                        <el-tab-pane label="资源明细" name="fourth">
                            <el-table :data="DetailTableData" height="250px" @row-click="detaillink"
                                :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row
                                @current-change="DetailTableChange">
                                <el-table-column label="明细名称" prop="DetailName" align="center" sortable>
                                </el-table-column>
                                <el-table-column label="上级明细名称" prop="PDetailName" align="center">
                                </el-table-column>
                                <el-table-column label="事务时间" prop="TransactionDate" :formatter="dateFormat"
                                    align="center" sortable>
                                </el-table-column>
                                <el-table-column label="备注" prop="Note" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改人" prop="LastModify" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" align="center"
                                    sortable>
                                </el-table-column>
                            </el-table>
                            <!-- 角色权限 -->
                            <el-table :data="MainAuthorityTableData" @row-contextmenu="rightClickMainAuthority"
                                @header-contextmenu="rightClicheaderkMainAuthority" height="190px"
                                :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row
                                @current-change="MainAuthorityTableChange"
                                :row-class-name="MainAuthoritytableRowClassName">
                                <el-table-column label="角色名称" prop="RoleName" align="center" sortable>
                                </el-table-column>
                                <el-table-column label="类型" prop="Type" align="center">
                                </el-table-column>
                                <el-table-column label="权限类型" prop="AuthorityType" align="center" sortable>
                                </el-table-column>
                                <el-table-column label="主体名称" prop="MainName" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改人" prop="LastModify" align="center">
                                </el-table-column>
                                <el-table-column label="最后修改时间" prop="LastDate" :formatter="dateFormat" align="center"
                                    sortable>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>

                    <!-- 轮播形式展现数据表 -->
                    <!-- <el-carousel type="card" height="490px" :autoplay="false">
                        <el-carousel-item v-for="item in 3" :key="item">

                            <el-table :data="ElementClassifyTableData" height="490px" :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row @current-change="ElementClassifyTableChange">
                                <el-table-column label="分类名称" prop="分类名称">
                                </el-table-column>
                                <el-table-column label="备注" prop="备注">
                                </el-table-column>
                                <el-table-column label="最后修改人" prop="最后修改人">
                                </el-table-column>
                                <el-table-column label="最后修改时间" prop="最后修改时间">
                                </el-table-column>
                            </el-table>

                            <el-table :data="CountNormTableData" height="490px" :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row @current-change="CountNormTableChange">
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

                            <el-table :data="ElementRangeTableData" height="490px" :header-cell-style="{background:'white',color:'#606266'}" border highlight-current-row @current-change="ElementRangeTableChange">
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
                    <!-- 资源目录新增、修改弹窗 -->
                    <el-dialog :title="choosetitle" :visible.sync="dialogFormVisible" :before-close="closedialog"
                        width="30%">
                        <el-form ref="form" :model="form" status-icon label-width="80px">
                            <el-form-item label="上级">
                                <!-- <el-select v-model="form.PID" filterable :filter-method="datafilter" :default-first-option="true" placeholder="请选择上级" style="width:100%">
                                <el-option v-for="(item,index) in PList" :label="item.Name" :value="item.ID" :key="index"></el-option>
                            </el-select> -->
                                <treeselect v-model="form.PID" placeholder="请选择或搜索" :options="ResourceTableData" />
                            </el-form-item>
                            <el-form-item label="类型" prop="Type">
                                <el-select v-model="form.Type" placeholder="请选择资源类型" @change="relationResourceChange"
                                    style="width:100%">
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
                                <el-input v-model="form.Name"></el-input>
                            </el-form-item>
                            <el-form-item label="显示名称">
                                <el-input v-model="form.ShowName"></el-input>
                            </el-form-item>

                            <el-form-item label="是否树形">
                                <el-switch v-model="form.TreeForm" :active-value="1" :inactive-value="0"></el-switch>
                            </el-form-item>
                            <el-form-item label="关系资源" v-if="isRelationResource">
                                <el-select v-model="form.RelationID" placeholder="请选择关系资源" style="width: 100%">
                                    <el-option v-for="(item,index) in RelationResourceTableData" :label="item.Name"
                                        :value="item.ID" :key="index"></el-option>
                                </el-select>
                                <!-- <treeselect v-model="form.RelationID" placeholder="请选择关系资源" :options="ResourceTableData"></treeselect> -->
                            </el-form-item>

                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="form.Note"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" :loading="loading" @click="submitForm('form')">确 定</el-button>
                            <el-button @click="colse()">取 消</el-button>
                        </span>
                    </el-dialog>
                    <!-- 要素目录新增、修改弹窗 -->
                    <el-dialog :title="elchoosetitle" :visible.sync="eldialogFormVisible" :before-close="closedrawer"
                        width="42.5%">
                        <el-form ref="elform" :label-position="position" :model="elform" status-icon label-width="150px"
                            :inline="true">
                            <el-form-item label="序号">
                                <el-input v-model="elform.Numbera" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="资源" style="margin-left:20px" clearable>
                                <!-- <el-select v-model="elform.RID" filterable :filter-method="datafilter" :default-first-option="true" placeholder="请选择资源" @change="resourceChange">
                                <el-option v-for="(item,index) in PList" :label="item.Name" :value="item.ID" :key="index"></el-option>
                            </el-select> -->
                                <treeselect v-model="elform.RID" placeholder="请选择资源" :options="ResourceTableData"
                                    @change="resourceChange" style="width:215px" />
                            </el-form-item>
                            <el-form-item label="要素名称">
                                <el-input v-model="elform.Name"></el-input>
                            </el-form-item>
                            <el-form-item label="分类" style="margin-left:20px">
                                <el-select v-model="elform.CID" filterable :filter-method="datafilter"
                                    :default-first-option="true" placeholder="请选择分类" style="width:217px" clearable>
                                    <el-option v-for="(item,index) in ClassifyList" :label="item.Name"
                                        :value="item.ID" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="要素类型">
                                <el-select v-model="elform.Type" placeholder="请选择要素类型" style="width:203px"
                                    @change="typeChange" clearable>
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
                                <el-select v-model="elform.OptionType" placeholder="请选择选项类型" style="width:220px"
                                    :disabled="optiondis" clearable>
                                    <el-option label="下拉单选" value="下拉单选"></el-option>
                                    <el-option label="下拉多选" value="下拉多选"></el-option>
                                    <el-option label="平面单选" value="平面单选"></el-option>
                                    <el-option label="平面多选" value="平面多选"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="值域资源">
                                <el-select v-model="elform.DRID" filterable :filter-method="datafilter"
                                    :default-first-option="true" placeholder="请选择资源" style="width:203px"
                                    :disabled="drdis" clearable>
                                    <el-option v-for="(item,index) in DRList" :label="item.DRName" :value="item.DRID"
                                        :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否必填" style="margin-left:17px">
                                <el-switch v-model="elform.IFRequired" :active-value="1" :inactive-value="0"
                                    style="width:217px"></el-switch>
                            </el-form-item>
                            <el-form-item label="长度">
                                <el-input v-model="elform.Length" :disabled="lengthdis"></el-input>
                            </el-form-item>
                            <el-form-item label="精度" style="margin-left:17px">
                                <el-input v-model="elform.Precision" style="width:217px"></el-input>
                            </el-form-item>
                            <el-form-item label="单位">
                                <el-input v-model="elform.Unit" :disabled="unitdis"></el-input>
                            </el-form-item>
                            <el-form-item label="默认值" style="margin-left:20px">
                                <el-input v-model="elform.Defaulta" style="width:217px"></el-input>
                            </el-form-item>
                            <el-form-item label="是否展示主目录">
                                <el-switch v-model="elform.IFZSZML" :active-value="1" :inactive-value="0"
                                    style="width:217px"></el-switch>
                            </el-form-item>
                            <el-form-item label="是否展示名称" style="margin-left:10x" clearable>
                                <el-switch v-model="elform.IFZSMC" :active-value="1" :inactive-value="0"
                                    :disabled="zsmcdis" style="width:217px"></el-switch>
                            </el-form-item>
                            <el-form-item label="编码目录">
                                <el-select v-model="elform.CDID" filterable :filter-method="datafilter"
                                    :default-first-option="true" placeholder="请选择资源" style="width:202px"
                                    :disabled="cddis" clearable>
                                    <el-option v-for="(item,index) in CDList" :label="item.CDName" :value="item.CDID"
                                        :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="要素分类" style="margin-left:20px">
                                <el-select v-model="elform.ElementClassify" placeholder="请选择" style="width:219px"
                                    clearable>
                                    <el-option label="普通要素" value="普通要素"></el-option>
                                    <el-option label="计算要素" value="计算要素"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="elform.Note" style="width:605px"
                                    :autosize="{ minRows: 2}"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" :loading="loading" @click="elsubmitForm()">确 定</el-button>
                            <el-button @click="colse()">取 消</el-button>
                        </span>
                    </el-dialog>
                    <!--要素分类弹窗-->
                    <el-dialog :title="choosetitle" :visible.sync="ClassifydialogFormVisible"
                        :before-close="ElementClassifyother" width="30%" id="classifyiframe">
                        <el-form ref="cform" :model="cform" status-icon label-width="8%">
                            <el-form-item label="资源" prop="RID">
                                <el-select :disabled="true" v-model="cform.RID" filterable :default-first-option="true"
                                    placeholder="请选择资源" style="width: 100%">
                                    <el-option v-for="(item,index) in PList" :label="item.Name" :value="item.ID"
                                        :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="名称" prop="Name">
                                <el-input v-model="cform.Name" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="备注" prop="Note">
                                <el-input type="textarea" v-model="cform.Note"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="ElementClassify('submit')">确 定</el-button>
                            <el-button @click="ElementClassify('cancel')">取 消</el-button>
                        </span>
                    </el-dialog>
                    <!-- 统计指标定义弹窗 -->
                    <el-dialog :title="choosetitle" :visible.sync="dialogFormVisibleCountNorm"
                        :before-close="CountNormother" width="30%">
                        <el-form ref="mform" :model="form" label-width="80px">
                            <el-form-item label="资源">
                                <el-input v-model="form.Name" label="form.Name" value="form.RID" :disabled="true">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="关联类型">
                                <el-input v-model="form.AssociationType" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="指标名称">
                                <el-input v-model="form.NormName" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="要素名称">
                                <el-select v-model="form.GLID" placeholder="请选择要素名称" @change="ElementchangeName"
                                    style="width: 100%">
                                    <el-option v-for="(item,index) in ElementList" :label="item.Name" :value="item.EID"
                                        :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="计算类型">
                                <el-select v-model="form.CalculateType" placeholder="请选择资源类型" style="width: 100%">
                                    <el-option label="计数" value="计数"></el-option>
                                    <el-option label="求和" value="求和"></el-option>
                                    <el-option label="是否" value="是否"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="运算符">
                                <el-select v-model="form.Operator" placeholder="请选择资源类型" style="width: 100%">
                                    <el-option label="=" value="="></el-option>
                                    <el-option label=">" value=">"></el-option>
                                    <el-option label="<" value="<"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="运算值">
                                <el-input v-model="form.Ovalue" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="form.Note"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" :loading="loading" @click="CountNorm('submit')">确 定</el-button>
                            <el-button @click="CountNorm('cancel')">取 消</el-button>
                        </span>
                    </el-dialog>
                    <!-- 角色权限弹窗 -->
                    <el-dialog :title="choosetitle" :visible.sync="dialogFormVisibleMainAuthority"
                        :before-close="MainAuthorityother" width="30%">
                        <el-form ref="aform" :model="aform" label-width="80px">
                            <el-form-item label="类型">
                                <el-select v-model="aform.Type" placeholder="请选择类型" style="width: 100%"
                                    @change="RolechangeName">
                                    <el-option label="资源明细" value="资源明细"></el-option>
                                    <!-- <el-option label="要素" value="要素"></el-option> -->
                                </el-select>
                            </el-form-item>
                            <el-form-item label="主体名称">
                                <el-input v-model="aform.MainName" :disabled="isMainName"
                                    @input="changeMainName($event)"></el-input>
                            </el-form-item>
                            <el-form-item label="角色">
                                <el-select v-model="aform.RoleID" placeholder="请选择要素名称" style="width: 100%" filterable
                                    :filter-method="datafilter">
                                    <el-option v-for="(item,index) in RoleList" :label="item.RoleName"
                                        :value="item.RoleID" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="权限类型">
                                <el-select v-model="aform.AuthorityType" multiple placeholder="请选择" value-key="id"
                                    change="changeValue" style="width:100%;">
                                    <el-option v-for="item in authoritys" :key="item.id" :label="item.text"
                                        :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" :loading="loading" @click="MainAuthority('submit')">确 定
                            </el-button>
                            <el-button @click="MainAuthority('cancel')">取 消</el-button>
                        </span>
                    </el-dialog>
                </el-row>
            </el-main>
        </el-container>
        <!-- 资源目录右键菜单 -->
        <div v-show="menuVisible">
            <ul id="menu" class="menu">
                <li class="ms-item wrap-ms-right" @click="handleAdd()"><i class="el-icon-circle-plus icon1"></i>新增资源事务
                </li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="handleXAdd()"><i
                        class="el-icon-circle-plus icon1"></i>新增下级事务</li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="handleUpdate()"><i
                        class="el-icon-s-order icon1"></i>修改资源事务</li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="handleDelete()"><i
                        class="el-icon-delete-solid icon1"></i>删除资源事务</li>
                <li class="ms-item wrap-ms-right" @click="Permission()"><i class="el-icon-s-order icon1"></i>权限管理</li>
            </ul>
        </div>

        <!-- 要素目录右键菜单 -->
        <div v-show="elmenuVisible">
            <ul id="elmenu" class="menu">
                <li class="ms-item wrap-ms-right" @click="AddElement()"><i class="el-icon-circle-plus icon1"></i>新增要素
                </li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="UpdateElement()"><i
                        class="el-icon-s-order icon1"></i>修改要素</li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="DeleteElement()"><i
                        class="el-icon-delete-solid icon1"></i>删除要素</li>
            </ul>
        </div>

        <!-- 统计指标右键菜单 -->
        <div v-show="menuVisibleCountNorm">
            <ul id="menuCountNorm" class="menu">
                <!-- 统计指标 -->
                <li class="ms-item wrap-ms-right" @click="CountNorm('add')"><i
                        class="el-icon-circle-plus icon1"></i>新增统计</li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="CountNorm('update')"><i
                        class="el-icon-s-order icon1"></i>修改统计</li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="CountNorm('delete')"><i
                        class="el-icon-delete-solid icon1"></i>删除统计</li>
            </ul>
        </div>

        <!-- 要素分类右键菜单 -->
        <div v-show="cmenuVisible">
            <ul id="cmenu" class="menu">
                <li class="ms-item wrap-ms-right" @click="ElementClassify('add')"><i
                        class="el-icon-circle-plus icon1"></i>新增要素分类</li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="ElementClassify('update')"><i
                        class="el-icon-s-order icon1"></i>修改要素分类</li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="ElementClassify('delete')"><i
                        class="el-icon-delete-solid icon1"></i>删除要素分类</li>
            </ul>
        </div>

        <!-- 角色权限右键表头菜单 -->
        <div v-show="menuVisibleMainAuthority">
            <ul id="menuMainAuthority" class="menu">
                <li class="ms-item wrap-ms-right" @click="MainAuthority('add')"><i
                        class="el-icon-circle-plus icon1"></i>新增角色权限</li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="MainAuthority('update')"><i
                        class="el-icon-s-order icon1"></i>修改角色权限</li>
                <li v-show="disabledvalue" class="ms-item wrap-ms-right" @click="MainAuthority('delete')"><i
                        class="el-icon-delete-solid icon1"></i>删除角色权限</li>
            </ul>
        </div>
    </el-container>
</template>

<script>
    // 引入vue-treeselect组件
    import Treeselect from '@riophae/vue-treeselect'
    // 引入vue-treeselect样式
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import axios from 'axios';
    import qs from 'qs';
    import * as fecha from "element-ui/lib/utils/date";
    import {
        NowDate,
        DatePutT

    } from '../utility/date';

    import {
        cfoo,
        crightClick,
        cstyleMenu,
        // rightClick,
        // styleMenu,
        rightClickCountNorm,
        styleMenuCountNorm,
        rightClickMainAuthority,
        styleMenuMainAuthority
    } from '../utility/rightclick';

    // import {
    //     handleAdd,
    //     handleXAdd,
    //     handleUpdate,
    //     submitForm,
    //     colse,
    //     closedialog,
    //     handleDelete,
    //     resourcedatafilter
    // } from '../views/Resource';

    import {
        ClassifyhandleAdd,
        ClassifyhandleUpdate,
        ClassifysubmitForm,
        Classifycolse,
        Classifyclosedialog,
        ClassifyhandleDelete
    } from '../views/ElementClassify';

    import {
        countNormAdd,
        countNormUpdate,
        submitCountNorm,
        countNormcolse,
        countNormclosedialog,
        countNormDelete,
        changeName,

    } from '../views/CountNorm';
    //资源明细角色权限
    import {
        mainAuthorityAdd,
        mainAuthorityUpdate,
        submitMainAuthority,
        mainAuthoritycolse,
        mainAuthorityclosedialog,
        mainAuthorityDelete,
        getDetailname,
    } from '../views/MainAuthority';
    //获取登录用户名
    import {
        getUserName,
        getQueryVariable
    } from '../utility/User'

    //角色权限
    const authorityOptions = ['新增', '修改', '删除', '查询'];

    export default {
        data() {
            return {
                ElementList: [],
                ClassifyList: [],
                //资源目录新增下级单的字段-类型
                PType: "",
                //要素目录左对齐
                position: 'left',
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
                //要素目录弹出框参数
                eldialogFormVisible: false,
                //资源目录弹框表单
                form: {
                    ID: "",
                    PID: null,
                    Name: "",
                    Type: "",
                    Note: "",
                    LastModify: "",
                    ShowName: "",
                    TreeForm: 0,
                    RelationID: null,
                    //统计指标 需要用到的数据
                    RID: "",
                    NormName: ""
                },
                //关系资源字段
                isRelationResource: false,
                //关系资源下拉选择框
                RelationResourceTableData: [],
                //资源目录修改时保存当前行的数据
                srow: [],
                //资源目录修改时保存当前行的ID
                rid: null,
                //资源目录编辑标识
                mark: null,
                loading: false,
                //上级是否禁用
                disabledvalue: "",

                //资源目录右键菜单模态框
                menuVisible: false,
                //资源目录右键菜单模态框
                btmenuVisible: false,
                //要素目录右键菜单模态框
                elmenuVisible: false,

                //资源目录对应操作的弹框标题
                choosetitle: '',
                //要素目录对应操作的弹框标题
                elchoosetitle: '',

                //资源目录上级select框自定义搜索方法
                //datafilter: null,
                //根据资源ID获取资源类型
                // getType: '',

                //要素目录修改时保存当前行的要素id
                eid: '',
                //要素目录修改时保存对应行信息
                erow: [],
                //鼠标左键单击资源目录保存资源ID
                lrid: '',
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
                    IFRequired: 0,
                    OptionType: "",
                    Numbera: "",
                    DRID: "",
                    IFZSZML: 0,
                    IFZSMC: 1,
                    CDID: "",
                    ElementClassify: "普通要素"
                },
                //要素目录弹窗字段禁用初始值
                zsmcdis: false, //名称是否展示
                unitdis: false, //单位
                lengthdis: false, //长度
                optiondis: false, //选项类型
                drdis: false, //值域资源
                cddis: false, //编码目录

                //要素分类模态框
                cmenuVisible: false,
                ClassifydialogFormVisible: false,
                cform: {
                    ID: "",
                    RID: "",
                    Name: "",
                    Note: "",
                    LastModify: "",
                    LastDate: ""
                },
                //单击树形后的当前行ID
                treedata: "",
                //右键要素目录后的当前行的数据
                crow: [],
                ////右键要素目录后的当前行的ID
                cid: '',
                //统计指标 弹出窗参数
                dialogFormVisibleCountNorm: false,
                //统计指标 弹出窗需要的数据
                resouceData: [],
                //右键菜单模态框-统计指标
                menuVisibleCountNorm: false,
                //禁用装态
                isDisabled: false,

                //角色权限初始化赋值
                authoritys: authorityOptions,
                DetailTableData: [],
                MainAuthorityTableData: [],
                aform: {
                    RoleID: "",
                    MID: "",
                    MainName: "",
                    Type: "",
                    AuthorityType: [],
                    RID: "",
                    DID: ""
                },
                RoleInfo: [],
                dialogFormVisibleMainAuthority: false,
                menuVisibleMainAuthority: false,
                detailID: "",
                detailName: "",
                isMainName: true,
                //要素目录新增弹窗左对齐参数
                positiona: 'left',

                //权限页 角色用户 树形数据
                RoleUserTestData: [],
                //设置树形数据加载完成标识符
                RUTreeDataSymbol: false,
                //登录用户名
                UserName: "",

            };

        },
        components: {
            Treeselect
        }, //注册组件
        activated: function () {
            this.treeList();
            //权限页 角色用户 树形数据
            this.RoleUserData();
            //角色用户数据加载完成提示
            // var tips = setInterval(() => {
            //     this.RoleUserTestDataControl();
            // }, 1000);

            // setInterval(() => {
            //     if (this.RUTreeDataSymbol) {
            //         clearInterval(tips);
            //     }
            // }, 1000);

            //获取登录用户名
            //this.getQueryVariable();
            this.GetUserName();

        },
        computed: {
            //上级资源列表
            PList() {
                var obj = [];
                this.$ajax.post("GetAllResources").then(function (res) {
                    var Pdata = res.data;
                    for (let i in Pdata) {
                        obj.push({
                            ID: Pdata[i].ID,
                            Name: Pdata[i].Name,
                            Type: Pdata[i].Type
                        })
                    }
                });
                return obj;
            },
            //值域资源列表
            DRList() {
                var obj = [];
                this.$ajax.post("GetAllDR").then(function (res) {
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
            CDList() {
                var obj = [];
                this.$ajax.get("GetAllGCodedir").then(function (res) {
                    var CDdata = res.data;
                    for (let i in CDdata) {
                        obj.push({
                            CDID: CDdata[i].ID,
                            CDName: CDdata[i].Name
                        })
                    }
                });
                return obj;
            },
            //角色权限-角色信息
            RoleList() {
                let obj = [];
                this.$ajax.post('GetAllRoleInfo')
                    .then(function (res) {
                        for (let i in res.data) {
                            obj.push({
                                RoleID: res.data[i].RoleID,
                                RoleName: res.data[i].RoleName
                            })
                        }
                        //解决当获取的列表有值但无法选择
                        if (!res.data.RoleID) {
                            res.data.RoleID = null;
                        }
                    });
                this.RoleInfo = obj;
                return obj;
            },
        },
        methods: {
            //资源目录树形网格
            treeList() {
                var that = this;
                axios.post("GetAllResources").then(function (res) {
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
                    var treeData = [];
                    var relationResource = [];
                    var count = 0
                    AllData.forEach(function (item) {
                        //树形下拉框参数 item.label item.id
                        if (item.Type == "资源" || item.Type == "附加资源") {
                            relationResource.push(item);
                        }
                        item.label = item.Name;
                        item.id = item.ID
                        // 以当前遍历项的pid,去map对象中找到索引的id
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
                    that.ResourceTableData = treeData;
                    that.RelationResourceTableData = relationResource;
                });
            },
            //资源--要素--分类--统计指标 联动
            //资源--明细 联动
            elementlink(row, column, event) {
                var that = this;
                
                //单击资源目录保存资源ID
                that.treedata = row.ID;
                //单击资源目录保存当前行记录
                that.resouceData = row;
                //保存资源ID供要素目录新增时使用
                this.lrid = row.ID;
                //要素
                this.$ajax.post('GetAllELementByResourceID',
                    this.$qs.stringify({
                        RID: row.ID
                    }))
                    //返回成功调用
                    .then(function (res) {
                        that.ElementTableData = res.data;
                        //刷新要素目录的分类字段
                        that.ElementList = res.data;
                    })
                    //返回失败调用
                    .catch(function (res) {
                    });
                //分类
                this.$ajax.post('GetAllElementClassifyByRID',
                    this.$qs.stringify({
                        RID: row.ID
                    }))
                    .then(function (res) {
                        that.ElementClassifyTableData = res.data;
                        that.ClassifyList = res.data;                        
                    })
                    .catch(function (res) { })
                //统计指标
                this.$ajax.post('GetAllCountNormByRID',
                    this.$qs.stringify({
                        RID: row.ID
                    }))
                    .then(function (res) {
                        that.CountNormTableData = res.data;
                    })
                    .catch(function (res) { })
                //资源明细
                this.$ajax.post('GetAllDetailByResourceID',
                    this.$qs.stringify({
                        RID: row.ID
                    }))
                    .then(function (res) {
                        that.DetailTableData = res.data;
                    })
                    .catch(function (res) { })
                //清空角色权限
                that.MainAuthorityTableData = [];
            },
            //要素目录--文本值域选项 联动
            // elementrangelink(row, column, event) {
            //     var that = this;
            //     //要素值域选项
            //     this.$ajax.post('GetAllElementRangeByEID',
            //         this.$qs.stringify({
            //             EID: row.EID
            //         }))
            //         .then(function (res) {
            //             that.ElementRangeTableData = res.data;
            //         })
            //         .catch(function (res) { })
            // },
            //明细目录--角色权限 联动
            detaillink(row, column, event) {
                var that = this;
                that.aform.DID = row.DID;
                that.aform.RID = row.RID;
                that.detailID = row.DID;
                that.detailName = row.DetailName;
                //角色权限
                this.$ajax.post('GetAllMainAuthorityByDetailID',
                    this.$qs.stringify({
                        DID: row.DID
                    }))
                    .then(function (res) {
                        that.MainAuthorityTableData = res.data;
                    })
                    .catch(function (res) { })
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
            //选中表格行高亮显示
            //角色权限
            DetailTableChange(val) {
                this.current = val;
            },
            MainAuthorityTableChange(val) {
                this.current = val;
            },
            //资源目录右键点击事件
            rightClick(row, event) {
                this.disabledvalue = true;
                this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
                this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
                this.elmenuVisible = false;
                this.cmenuVisible = false;
                this.menuVisibleCountNorm = false;
                this.menuVisibleMainAuthority = false;
                var menu = document.querySelector('#menu');
                this.styleMenu(menu);
                this.srow = JSON.parse(JSON.stringify(row)); //将当前行的数据保存至srow中
                //判断修改的类型是否为资源关系
                if(row.Type == "资源关系"){
                    this.isRelationResource = true;
                }
                this.rid = row.ID;
            },
            //要素目录右键点击事件
            elrightClick(row, event) {
                this.disabledvalue = true;
                this.elmenuVisible = false;
                this.elmenuVisible = true;
                this.menuVisible = false;
                this.cmenuVisible = false;
                this.menuVisibleCountNorm = false;
                this.menuVisibleMainAuthority = false;
                var elmenu = document.querySelector('#elmenu');
                this.styleMenu(elmenu);
                this.erow = JSON.parse(JSON.stringify(row)); //将当前行的数据保存至srow中
                this.rid = row.RID;
                this.eid = row.EID;
            },
            //资源目录右键点击表头事件
            rightHeaderClick(column, event) {
                this.disabledvalue = false;
                this.menuVisible = false;
                this.menuVisible = true;
                this.elmenuVisible = false;
                this.cmenuVisible = false;
                this.menuVisibleCountNorm = false;
                this.menuVisibleMainAuthority = false;
                var menu = document.querySelector('#menu');
                this.styleMenu(menu);
            },
            //要素目录右键点击表头事件
            elrightHeaderClick(column, event) {
                this.disabledvalue = false;
                this.elmenuVisible = false;
                this.elmenuVisible = true;
                this.menuVisible = false;
                this.cmenuVisible = false;
                this.menuVisibleCountNorm = false;
                this.menuVisibleMainAuthority = false;
                var elmenu = document.querySelector('#elmenu');
                this.styleMenu(elmenu);
            },
            //弹窗公共方法
            foo() {
                //取消资源目录鼠标监听事件
                this.menuVisible = false;
                //取消要素目录鼠标监听事件
                this.elmenuVisible = false;
                this.btmenuVisible = false;
                document.removeEventListener('click', this.foo); //及时关掉监听
            },
            styleMenu(menu) {
                event.preventDefault();
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                if (event.clientX > 1800) {
                    menu.style.left = event.clientX + scrollX - 100 + 'px';
                } else {
                    menu.style.left = event.clientX + scrollX + 1 + 'px';
                }
                document.addEventListener('click', this.foo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
                if (event.clientY > 700) {
                    menu.style.top = event.clientY + scrollY - 30 + 'px';
                } else {
                    menu.style.top = event.clientY + scrollY - 10 + 'px';
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
                this.PType = this.srow.Type;
                this.form.Type = "事务";
            },

            //资源目录修改
            handleUpdate() {
                this.choosetitle = "修改资源";
                this.mark = 2;
                this.dialogFormVisible = true;
                this.form = this.srow;
                this.PType = this.srow.Type;
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
                        let Type1 = this.form.Type;
                        if (this.PType == "资源" && Type1 == "资源") {
                            this.$message({
                                type: 'warning',
                                message: '资源的下级不允许在挂载资源,只能添加【附加资源】!'
                            });
                        }
                        else if (this.PType == "事务" && Type1 == "事务") {
                            this.$message({
                                message: '事务的下级不允许再挂事务！',
                                type: 'warning',
                                center: true,
                                duration: 4000,
                                offset: 40
                            });
                        } else if (this.PType != "业务" && Type1 == "业务明细") {
                            this.$message({
                                message: '业务明细必须挂在业务的下级！',
                                type: 'warning',
                                center: true,
                                duration: 4000,
                                offset: 40
                            });
                        } else if (this.PType != "资源" && Type1 == "资源关系" && this.PType != "附加资源" && this.PType != "事务") {
                            this.$message({
                                message: '资源关系必须挂在资源或者附加资源的下级！',
                                type: 'warning',
                                center: true,
                                duration: 4000,
                                offset: 40
                            });
                        } else {
                            this.form.LastModify = this.UserName;
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
                                    that.$message({
                                        type: 'warning',
                                        message: '出现未知错误！',
                                        duration: 4000,
                                        offset: 40
                                    });
                                })
                        }

                    } else {          
                        let Type1 = this.form.Type;
                        let PType1 = "";
                        //通过提交数据的PID找到对应父级的类型
                        for (let i = 0; i < this.ResourceTableData.length; i++) {
                            if (this.form.PID == this.ResourceTableData[i].ID) {
                                PType1 = this.ResourceTableData[i].Type;
                                break;
                            }
                        }
                        if (PType1 == "资源" && Type1 == "资源") {
                            this.$message({
                                type: 'warning',
                                message: '资源的下级不允许在挂载资源,只能添加【附加资源】!'
                            });
                        }
                        else if (PType1 == "事务" && Type1 == "事务") {
                            this.$message({
                                message: '事务的下级不允许再挂事务！',
                                type: 'warning',
                                center: true,
                                duration: 4000,
                                offset: 40
                            });
                        } else if (PType1 != "业务" && Type1 == "业务明细") {
                            this.$message({
                                message: '业务明细必须挂在业务的下级！',
                                type: 'warning',
                                center: true,
                                duration: 4000,
                                offset: 40
                            });
                        } else if (PType1 != "资源" && Type1 == "资源关系" && PType1 != "附加资源" && PType1 != "事务") {
                            this.$message({
                                message: '资源关系必须挂在资源或者附加资源的下级！',
                                type: 'warning',
                                center: true,
                                duration: 4000,
                                offset: 40
                            });
                        } else {
                            this.form.LastModify = this.UserName;
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
                //将关系资源字段隐藏;
                this.isRelationResource = false;
                this.form = {};
                //关闭要素目录弹框
                this.eldialogFormVisible = false;
                this.elform = {
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
                    IFRequired: 0,
                    OptionType: "",
                    Numbera: "",
                    DRID: "",
                    IFZSZML: 0,
                    IFZSMC: 1,
                    CDID: "",
                    ElementClassify: "普通要素"
                };
            },
            //点击X关闭资源目录模态框
            closedialog(done) {
                done();
                this.form = {};
                this.mark = null;
                //将关系资源字段隐藏;
                this.isRelationResource = false;
                this.$refs['form'].resetFields();
            },
            //点击X关闭要素目录模态框
            closedrawer(done) {
                done();
                this.elform = {
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
                    IFRequired: 0,
                    OptionType: "",
                    Numbera: "",
                    DRID: "",
                    IFZSZML: 0,
                    IFZSMC: 1,
                    CDID: "",
                    ElementClassify: "普通要素"
                };
                this.mark = null;
                this.$refs['elform'].resetFields();
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
                                s
                            });
                    })
                    .catch(() => { });
            },
            // 下拉框开启搜索功能
            datafilter(val) {
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
            //要素目录新增
            AddElement() {
                if (this.lrid == "" || this.lrid == undefined) {
                    this.$message({
                        type: 'warning',
                        message: '未选择相应的资源目录数据',
                        duration: 4000,
                        offset: 40
                    });
                } else {
                    this.elchoosetitle = "新增要素";
                    this.eldialogFormVisible = true;
                    this.mark = 1;
                    this.elform.RID = this.lrid;
                    //单位、长度、选项类型、值域资源、编码目录字段禁用
                    this.unitdis = true;
                    this.lengthdis = true;
                    this.optiondis = true;
                    this.drdis = true;
                    this.cddis = true;
                    //设置初始序号
                    this.elform.Numbera = (this.ElementTableData.length + 1).toString();
                }
            },
            //要素目录修改
            UpdateElement() {
                this.elchoosetitle = "修改要素";
                this.mark = 2;
                this.eldialogFormVisible = true;
                this.elform = this.erow;
                //设置名称是否展示禁用
                if (this.erow.Type == "资源") {
                    this.zsmcdis = true;
                }
                //单位、长度、选项类型、值域资源、编码目录字段禁用
                if (this.erow.Type != "数字") {
                    this.unitdis = true;
                } else {
                    this.unitdis = false;
                };
                if (this.erow.Type != "数字" && this.erow.Type != "字符" && this.erow.Type != "单行文本" && this.erow.Type != "单行文本(带选项)" && this.erow.Type != "多行文本") {
                    this.lengthdis = true;
                } else {
                    this.lengthdis = false;
                };
                if (this.erow.Type != "选项" && this.erow.Type != "资源" && this.erow.Type != "资源关系" && this.erow.Type != "通用编码") {
                    this.optiondis = true;
                } else {
                    this.optiondis = false;
                };
                if (this.erow.Type != "资源") {
                    this.drdis = true;
                } else {
                    this.drdis = false;
                };
                if (this.erow.Type != "通用编码") {
                    this.cddis = true;
                } else {
                    this.cddis = false;
                }

            },
            //要素目录删除
            DeleteElement() {
                var that = this;
                this.$confirm('是否要删除当前要素目录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$ajax.delete('DeleteElementByEID', {
                            params: ({
                                EID: this.eid
                            })
                        })
                            //返回成功调用
                            .then((res) => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                //要素
                                this.$ajax.post('GetAllELementByResourceID',
                                    this.$qs.stringify({
                                        RID: this.lrid
                                    }))
                                    //返回成功调用
                                    .then(function (res) {
                                        that.ElementTableData = res.data;
                                    })
                                    //返回失败调用
                                    .catch(function (res) {
                                    });
                                //统计指标-要素名称字段刷新
                                that.$ajax.post('GetAllElementByResourceID', that.$qs.stringify({
                                    RID: that.rid
                                }))
                                    .then(function (res) {
                                        that.ElementList = res.data;
                                        //解决当获取的列表有值但无法选择
                                        if (!res.data.GLID) {
                                            res.data.GLID = null;
                                        }
                                    });
                            })
                            //返回失败调用
                            .catch((res) => {
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });

                            });
                    })
                    .catch(() => { });
            },
            //根据条件设置要素目录新增、修改字段的禁用状态
            resourceChange() {
                var that = this;
                //根据资源类型改变名称是否展示禁用
                for (let i in this.ResourceTableData) {
                    if (this.ResourceTableData[i].ID == this.elform.RID) {
                        if (this.ResourceTableData[i].Type == "资源") {
                            this.zsmcdis = true;
                        } else {
                            this.zsmcdis = false;
                        }
                    }
                };
                //自动填充序号
                this.$ajax.post('GetAllELementByResourceID',
                    this.$qs.stringify({
                        RID: this.elform.RID
                    }))
                    //返回成功调用
                    .then(function (res) {
                        that.elform.Numbera = (res.data.length + 1).toString();
                    })
                    //返回失败调用
                    .catch(function (res) {
                    });
            },
            //根据资源目录类型决定是否显示资源关系字段
            relationResourceChange() {
                this.$forceUpdate();
                if (this.form.Type == "资源关系") {
                    this.isRelationResource = true;
                } else {
                    this.isRelationResource = false;
                }
            },
            //根据要素类型改变单位、长度、选项类型、值域资源、编码目录字段禁用
            typeChange() {
                if (this.elform.Type != "数字") {
                    this.unitdis = true;
                } else {
                    this.unitdis = false;
                };
                if (this.elform.Type != "数字" && this.elform.Type != "字符" && this.elform.Type != "单行文本" && this.elform.Type != "单行文本(带选项)" && this.elform.Type != "多行文本") {
                    this.lengthdis = true;
                } else {
                    this.lengthdis = false;
                };
                if (this.elform.Type != "选项" && this.elform.Type != "资源" && this.elform.Type != "资源关系" && this.elform.Type != "通用编码") {
                    this.optiondis = true;
                } else {
                    this.optiondis = false;
                };
                if (this.elform.Type != "资源") {
                    this.drdis = true;
                } else {
                    this.drdis = false;
                };
                if (this.elform.Type != "通用编码") {
                    this.cddis = true;
                } else {
                    this.cddis = false;
                }
            },
            //要素目录弹框确认提交事件
            elsubmitForm() {
                var that = this;
                if (this.elform.Type == "资源关系" && this.elform.DRID == null) {
                    this.$message.error('请录入值域资源');
                } else if (this.elform.Type == "选项" && this.elform.OptionType == null) {
                    this.$message.error('请选择选项类型');
                } else {
                    if (this.mark == 1) {
                        console.log(that.elform);
                        this.elform.LastModify = this.UserName;
                        axios.post("CreateElement", qs.stringify(this.elform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                            //返回成功调用
                            .then((res) => {
                                this.$message({
                                    type: 'success',
                                    message: '新增成功!'
                                });
                                //要素
                                this.$ajax.post('GetAllELementByResourceID',
                                    this.$qs.stringify({
                                        RID: this.lrid
                                    }))
                                    //返回成功调用
                                    .then(function (res) {
                                        that.ElementTableData = res.data;
                                    })
                                    //返回失败调用
                                    .catch(function (res) {
                                    });
                                //统计指标-要素名称字段刷新
                                that.$ajax.post('GetAllElementByResourceID', that.$qs.stringify({
                                    RID: that.elform.RID
                                }))
                                    .then(function (res) {
                                        that.ElementList = res.data;
                                        //解决当获取的列表有值但无法选择
                                        if (!res.data.GLID) {
                                            res.data.GLID = null;
                                        }
                                    });
                                that.eldialogFormVisible = false;
                                that.elform = {
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
                                    IFRequired: 0,
                                    OptionType: "",
                                    Numbera: "",
                                    DRID: "",
                                    IFZSZML: 0,
                                    IFZSMC: 1,
                                    CDID: "",
                                    ElementClassify: "普通要素"
                                };
                                that.mark = null;
                               
                            })
                            //返回失败调用
                            .catch((res) => {
                                this.$message({
                                    type: 'error',
                                    message: '新增失败!'
                                });

                            });

                    } else {
                        this.elform.LastModify = this.UserName;
                        this.$ajax.put('UpdateElementByEID', this.elform)
                            //返回成功调用
                            .then((res) => {
                                that.$message({
                                    type: 'success',
                                    message: '修改成功！',
                                    duration: 4000,
                                    offset: 40
                                });
                                //要素
                                this.$ajax.post('GetAllELementByResourceID',
                                    this.$qs.stringify({
                                        RID: this.lrid
                                    }))
                                    //返回成功调用
                                    .then(function (res) {
                                        that.ElementTableData = res.data;
                                    })
                                    //返回失败调用
                                    .catch(function (res) {
                                    });
                                //统计指标-要素名称字段刷新
                                that.$ajax.post('GetAllElementByResourceID', that.$qs.stringify({
                                    RID: that.elform.RID
                                }))
                                    .then(function (res) {
                                        that.ElementList = res.data;
                                        //解决当获取的列表有值但无法选择
                                        if (!res.data.GLID) {
                                            res.data.GLID = null;
                                        }
                                    });
                                that.eldialogFormVisible = false;
                                that.elform = {
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
                                    IFRequired: 0,
                                    OptionType: "",
                                    Numbera: "",
                                    DRID: "",
                                    IFZSZML: 0,
                                    IFZSMC: 1,
                                    CDID: "",
                                    ElementClassify: "普通要素"
                                };
                                that.mark = null;                                
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
            },
            //表格日期显示格式转换
            dateFormat(row, column, cellValue) {
                return cellValue ? fecha.format(new Date(cellValue), 'yyyy-MM-dd HH:mm:ss') : '--';
            },
            //获取资源目录表格行的索引
            ResourcetableRowClassName({
                row,
                rowIndex
            }) {
                row.row_index = rowIndex;
            },
            //获取要素分类表格行的索引
            ElementClassifytableRowClassName({
                row,
                rowIndex
            }) {
                row.row_index = rowIndex;
            },

            //要素分类右键
            ElementClassifyRightClick(row, column, event) {
                let _this = this;
                crightClick(_this, row, column, event, 'normal');

            },
            //要素分类表头右键
            ElementClassifyheaderRightClick(row, column, event) {
                let _this = this;
                crightClick(_this, row, column, event, 'header');

            },

            //要素分类 打开不同编辑类型的模态框
            ElementClassify(state) {
                let _this = this;
                if (state == 'add') {
                    ClassifyhandleAdd(_this);
                } else if (state == 'update') {
                    ClassifyhandleUpdate(_this);

                } else if (state == 'delete') {
                    ClassifyhandleDelete(_this);

                } else if (state == 'submit') {
                    ClassifysubmitForm(_this);

                } else if (state == 'cancel') {
                    Classifycolse(_this);
                }

            },
            //点击其他区域关闭要素分类模态框
            ElementClassifyother(done) {
                let _this = this;
                Classifyclosedialog(done, _this);
            },

            //获取统计指标表格行的索引
            CountNormtableRowClassName({
                row,
                rowIndex
            }) {
                row.row_index = rowIndex;
            },
            //获取角色权限表格行的索引
            MainAuthoritytableRowClassName({
                row,
                rowIndex
            }) {
                row.row_index = rowIndex;
            },
            //统计指标右键
            rightClickNorm(row, event) {
                let _this = this;
                rightClickCountNorm(_this, row, event, 'normal');
            },

            //统计指标表头右键
            rightheaderClickNorm(row, event) {
                let _this = this;
                rightClickCountNorm(_this, row, event, 'header');
            },
            //角色权限右键
            rightClickMainAuthority(row, event) {
                let _this = this;
                rightClickMainAuthority(_this, row, event, 'normal');
            },

            //角色权限表头右键
            rightClicheaderkMainAuthority(row, event) {
                let _this = this;
                rightClickMainAuthority(_this, row, event, 'header');
            },

            //统计指标 打开不同编辑类型的模态框
            CountNorm(state, row, event) {
                let _this = this;
                if (state == 'add') {
                    countNormAdd(_this);

                } else if (state == 'update') {
                    countNormUpdate(_this);

                } else if (state == 'delete') {
                    countNormDelete(_this);

                } else if (state == 'submit') {
                    submitCountNorm(_this);
                } else if (state == 'cancel') {
                    countNormcolse(_this);
                }

            },
            //角色权限 打开不同编辑类型的模态框
            MainAuthority(state, row, event) {
                let _this = this;
                if (state == 'add') {
                    mainAuthorityAdd(_this);

                } else if (state == 'update') {
                    mainAuthorityUpdate(_this);

                } else if (state == 'delete') {
                    mainAuthorityDelete(_this);

                } else if (state == 'submit') {
                    submitMainAuthority(_this);
                } else if (state == 'cancel') {
                    mainAuthoritycolse(_this);
                }

            },
            //点击其他区域关闭统计指标模态框
            CountNormother(done) {
                countNormclosedialog(done, this);
            },
            //点击其他区域关闭角色权限模态框
            MainAuthorityother(done) {
                mainAuthorityclosedialog(done, this);
            },
            //统计指标-实现要素名称和指标名称值变化联动
            ElementchangeName(val) {
                changeName(this, val);
            },
            RolechangeName(val) {
                getDetailname(this, val);
            },

            //权限页 角色用户树形数据
            RoleUserData() {
                var RUTree = localStorage.getItem('ruTree');
                if (RUTree == null) {
                    //测试数据源
                    this.$ajax.post("GetZLAllUser1")
                        .then((res) => {
                            var arr = [];
                            //将children为null的值转换为Arryay[0]
                            for (let i = 0; i < res.data.length; i++) {
                                for (let j = 0; j < res.data[i].children.length; j++) {
                                    if (res.data[i].children[j].children == null) {
                                        res.data[i].children[j].children = arr;
                                    }
                                }
                            }
                            this.RoleUserTestData = res.data;
                            localStorage.setItem('ruTree', JSON.stringify(res.data));
                            this.$message({
                                showClose: true,
                                message: '角色用户数据加载完成',
                                type: 'success',
                                duration: 2000
                            })
                        });
                }
                else {
                    this.RoleUserTestData = JSON.parse(RUTree);
                }
            },
            //角色用户数据加载完成提示
            RoleUserTestDataControl() {
                if (this.RoleUserTestData.length > 0) {
                    this.$message({
                        showClose: true,
                        message: '角色用户数据加载完成',
                        type: 'success',
                        duration: 2000
                    });
                    //设置数据加载完成标识符
                    this.RUTreeDataSymbol = true;
                }
            },
            //权限管理跳转页面
            Permission() {
                this.$router.push({
                    path: '/permission',
                    // query: {
                    //     RoleUserTestData: this.RoleUserTestData
                    // }
                })
            },
            //解决当element中input标签输入值不能正常输入
            changeMainName() {
                this.$forceUpdate();
            },
            //要素目录-定义指标个数大于0样式修改
            changeRowColor({
                row,
                rowIndex
            }) {
                if (row.DYZBGS == 0) {
                    return ''
                } else {
                    return {
                        'color': '#409EFF'
                    }
                }
            },

            //获取登录用户
            GetUserName() {
                this.UserName = window.sessionStorage.getItem('user');
            },

        }
    }
</script>

<style scoped>
    /* scoped 表示该css样式只在本页面生效 */
    .elcochoose {
        margin-top: 10px;
    }

    /* 要素目录弹窗样式 */

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

    .el-main {
        padding-top: 0px;
    }

    /* 调整样式 */
    .tabletitle {
        color: #3a87ad;
        font-size: 1.5rem;
    }

    .ttop {
        margin: 3px;
        padding: 5px;
    }

    .g-element {
        float: left;
        font-size: 24px;
        font-weight: 1000;
        padding: 7px;
    }

    .g-permission {
        float: right;
        margin: 0 1rem;
        cursor: pointer;
        /* border: 1px solid #e4e5e3; */
        border: none;
        /* border-radius: 4px; */
        padding: 5px;
        background-color: white !important;
        color: #3a87ad !important;
        font-size: 20px;
        margin-top: 7px;
    }

    .g-permission:hover {
        /* background-color:#e4e5e3; */
        background-color: white !important;
        color: #3a87ad !important;
    }

    .el-dialog /deep/ {
        position: relative;
        margin: 0 auto 50px;
        border-radius: 5px;
        -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
        box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 50%;
    }
</style>