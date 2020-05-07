import { NowDate } from "../utility/date"
import { DataH, DataRoleUser } from '../utility/DataHandling'
import { guid } from '../utility/Guid'
import axios from 'axios';
import qs from 'qs';
//新增窗体权限
export function PermissionhandleAdd(_this) {
    _this.choosetitle = "新增窗体权限";
    _this.dialogFormVisible = true;
    //console.log(this.srow);
    _this.form.RoleID = _this.RoleIDvue; //将角色表格当前行的ID传给RoleID
    console.log(_this.form);
    console.log(_this.multipleSelection);


}
//窗体权限点击确认
export function PermissionsubmitForm(_this) {
    var that = _this;
    if (_this.AuthorityType.length != 0) {
        if (_this.multipleSelection.length != 0) {
            var m = DataH(_this.AuthorityType, _this.multipleSelection, _this.Rolerow)
            var m1 = JSON.stringify(m)
                //console.log(m1);
            that.$ajax.post('CreateMainAuthorities',
                    that.$qs.stringify({
                        maJson: m1
                    }))
                //返回成功调用
                .then(obj => {
                    that.$message({
                        type: 'success',
                        message: '新增成功',
                        duration: 4000,
                        offset: 40
                    });
                    for (let i in m) {
                        _this.PermissionData.push(m[i]);
                    }
                    // _this.multipleSelection = [];
                    _this.dialogFormVisible = false;


                })
                .catch(obj => {
                    console.log("新增失败");
                    that.$message({
                        type: 'warning',
                        message: '出现未知错误！',
                        duration: 4000,
                        offset: 40
                    });
                    that.OtherdialogFormVisible = false;
                    _this.AuthorityType = []; //清空被选中页面权限
                })
        } else {
            that.$message({
                type: 'warning',
                message: '至少选择一个页面权限！',
                duration: 4000,
                offset: 40
            });
        }
    } else {
        that.$message({
            type: 'warning',
            message: '权限类型不能为空！',
            duration: 4000,
            offset: 40
        });
    }
}

//点击取消关闭并清空窗体权限模态框
export function Permissioncolse(_this) {
    _this.dialogFormVisible = false;
    _this.AuthorityType = []; //清空被选中页面权限
}

//点击X关闭窗体权限模态框
export function Permissionclosedialog(done, _this) {
    done();
    _this.AuthorityType = []; //清空被选中页面权限
    _this.dialogFormVisible = false;
}

//新增其他权限
export function OPermissionhandleAdd(_this) {
    _this.choosetitle = "新增其他权限";
    _this.OtherdialogFormVisible = true;
    _this.oform.AID = guid(); //
    _this.oform.RoleID = _this.Rolerow.ID; //角色名称赋值给表单的RoleID
    _this.oform.RoleName = _this.Rolerow.Name; //角色名称赋值给表单的RoleName
    _this.oform.LastDate = NowDate(); //获取当前时间  
}

//其他权限点击确认
export function OPermissionsubmitForm(_this) {
    var that = _this;
    _this.oform.RoleID = _this.RoleIDvue;
    console.log("as");
    console.log(_this.RoleIDvue);
    console.log(that.oform);
    that.$ajax.post("CreateMainAuthorityByOthers", that.oform)
        .then(function(obj) {
            that.$message({
                type: 'success',
                message: '新增成功',
                duration: 4000,
                offset: 40
            });
            that.PermissionData.push(_this.oform);
            that.oform = {};
            that.PagedisabledValue = false;
            //that.$refs.oform.clearSelection(); //清空其他权限选择器
            that.OtherdialogFormVisible = false;
        })
        .catch(function(obj) {
            console.log("新增失败");
            that.$message({
                type: 'warning',
                message: '出现未知错误！',
                duration: 4000,
                offset: 40
            });
            that.oform = {};
            that.PagedisabledValue = false;
            that.OtherdialogFormVisible = false;
        })



}

//点击取消关闭并清空其他权限模态框
export function OPermissioncolse(_this) {
    _this.oform = {};
    _this.PagedisabledValue = false;
    _this.OtherdialogFormVisible = false;
}

//点击X关闭其他权限模态框
export function OPermissionclosedialog(done, _this) {
    _this.oform = {};
    done();
    _this.PagedisabledValue = false;
    _this.OtherdialogFormVisible = false;
}

//右键删除权限
export function DeletePermissionByJs(_this) {
    _this.$confirm('是否要删除当前主体权限？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(() => {
            _this.$ajax.delete('DeleteMainAuthorityByAID', {
                    params: ({
                        AID: _this.AIDvue
                    })
                })
                //返回成功调用
                .then((res) => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    _this.$delete(_this.PermissionData, _this.Prow.row_index);
                })
                //返回失败调用
                .catch((res) => {
                    _this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });

                });

        })
        .catch(() => {});
}



//新增角色用户
export function AddRoleuser1(_this) {
    _this.choosetitle = "新增角色用户";
    _this.RoleUserdialogFormVisible = true;
    //console.log(this.srow);
    // _this.form.RoleID = _this.RoleIDvue; //将角色表格当前行的ID传给RoleID
}
//新增角色用户测试
export function AddRoleuserTest1(_this) {
    _this.choosetitle = "新增角色用户测试";
    _this.RoleUserdialogFormVisibleTest = true;
    //console.log(this.srow);
    // _this.form.RoleID = _this.RoleIDvue; //将角色表格当前行的ID传给RoleID
}
//新增角色用户测试1
export function AddRoleuserTest11(_this) {
    _this.choosetitle = "新增角色用户";
    _this.RoleUserdialogFormVisibleTest1 = true;
    if (_this.RoleUserTestData[0].UserName == null) {
        _this.$message({
            showClose: true,
            message: '请从资源要素管理页重新加载用户数据',
            type: 'error',
            duration: 0
        });
    }
}

//角色用户确认
export function RoleUserSubmit1(_this) {
    var that = _this;
    var m = [];
    console.log(_this.symbol);
    if (_this.symbol == "fatherSelect") {
        m = DataRoleUser(_this.RoleUserSelection1, _this.RoleIDvue);
    } else {
        m = DataRoleUser(_this.RoleUserSelection, _this.RoleIDvue);
    }
    var m1 = JSON.stringify(m);

    console.log(m1);
    console.log(_this.RoleUserSelection);
    console.log(_this.RoleIDvue);
    if (_this.RoleIDvue == "") {
        that.$message({
            type: 'warning',
            message: '请选择角色!'
        });
    } else {
        that.$ajax.post('CreateRoleUser',
                that.$qs.stringify({
                    roleUesrJson: m1
                }))
            //返回成功调用
            .then(function(obj) {
                that.$message({
                    type: 'success',
                    message: '新增成功',
                    duration: 4000,
                    offset: 40
                });
                // for (let i in m) {
                //     _this.RoleUesrData.push(m[i]);
                // }

                that.$ajax.post('GetAllRoleUserByRID',
                        that.$qs.stringify({
                            RID: that.RoleIDvue
                        }))
                    //返回成功调用
                    .then((res) => {
                        console.log(res.data)
                        that.RoleUesrData = res.data;
                    })


                _this.RoleUserSelection = []; //清空角色用户子表格选择器
                _this.RoleUserSelection1 = []; //清空角色用户父表格选择器
                //角色用户父搜索框重置
                _this.search = "";
                //角色用户子搜索框重置
                _this.search1 = "";
                //角色用户默认展开行重置
                _this.expands = [];
                //角色用户初始页面值展示重置
                _this.RoleUserOU = _this.RoleUserOUA;
                _this.RoleUserdialogFormVisible = false;

            })
            .catch(function(obj) {
                console.log("新增失败");
                that.$message({
                    type: 'warning',
                    message: '出现未知错误！',
                    duration: 4000,
                    offset: 40
                });
                _this.RoleUserSelection = []; //清空角色用户子表格选择器
                _this.RoleUserSelection1 = []; //清空角色用户父表格选择器
                _this.RoleUserdialogFormVisible = false;
            })
    }
}

//测试确认
export function RoleUserSubmitTest1(_this) {

}
//测试确认1
export function RoleUserSubmitTest11(_this) {
    var that = _this;
    console.log("进入测试1确认");
    //确认数据源设置
    var arr = [];
    for (let i = 0; i < _this.RoleUserTest1Selection.length; i++) {
        if (_this.RoleUserTest1Selection[i].children.length == 0) {
            arr.push(_this.RoleUserTest1Selection[i]);
        }
    }
    var m = DataRoleUser(arr, _this.RoleIDvue);
    var m1 = JSON.stringify(m);

    console.log(m1);
    console.log(arr);
    console.log(_this.RoleIDvue);
    if (_this.RoleIDvue == "") {
        that.$message({
            type: 'warning',
            message: '请选择角色!'
        });
    } else {
        that.$ajax.post('CreateRoleUser',
                that.$qs.stringify({
                    roleUesrJson: m1
                }))
            //返回成功调用
            .then(function(obj) {
                that.$message({
                    type: 'success',
                    message: '新增成功',
                    duration: 4000,
                    offset: 40
                });
                // for (let i in m) {
                //     _this.RoleUesrData.push(m[i]);
                // }

                that.$ajax.post('GetAllRoleUserByRID',
                        that.$qs.stringify({
                            RID: that.RoleIDvue
                        }))
                    //返回成功调用
                    .then((res) => {
                        console.log(res.data)
                        that.RoleUesrData = res.data;
                    })

                //清空原始数据源
                _this.RoleUserTest1Selection = [];
                //清空重复搜索数据源
                _this.RoleUserTest1RepeatSelection = [];
                //清空搜索框
                _this.vxeFilterName = "";
                //重置搜索数据源
                _this.RUvxeSelectData = _this.RoleUserTestData;
                //清空测试1页面多选框
                _this.$refs.RoleUservxeTree.clearCheckboxRow();
                //关闭测试1所有展开节点
                _this.$refs.RoleUservxeTree.clearTreeExpand();
                //关闭弹窗
                _this.RoleUserdialogFormVisibleTest1 = false;

            })
            .catch(function(obj) {
                that.$message({
                    type: 'warning',
                    message: '新增失败',
                    duration: 4000,
                    offset: 40
                });
                //清空原始数据源
                _this.RoleUserTest1Selection = [];
                //清空重复搜索数据源
                _this.RoleUserTest1RepeatSelection = [];
                //清空搜索框
                _this.vxeFilterName = "";
                //重置搜索数据源
                _this.RUvxeSelectData = _this.RoleUserTestData;
                //清空测试1页面多选框
                _this.$refs.RoleUservxeTree.clearCheckboxRow();
                //关闭测试1所有展开节点
                _this.$refs.RoleUservxeTree.clearTreeExpand();
                //关闭弹窗
                _this.RoleUserdialogFormVisibleTest1 = false;
            })
    }
}

//点击取消关闭并清空角色用户弹窗
export function ColseRoleUser1(_this) {
    _this.RoleUserSelection = []; //清空角色用户子表格选择器
    _this.RoleUserSelection1 = []; //清空角色用户父表格选择器
    //角色用户父搜索框重置
    _this.search = "";
    //角色用户子搜索框重置
    _this.search1 = "";
    //角色用户默认展开行重置
    _this.expands = [];
    //角色用户初始页面值展示重置
    _this.RoleUserOU = _this.RoleUserOUA;
    _this.RoleUserdialogFormVisible = false;
}

//测试取消
export function ColseRoleUserTest1(_this) {
    _this.RoleUserSelection = []; //清空角色用户子表格选择器
    _this.RoleUserSelection1 = []; //清空角色用户父表格选择器
    //角色用户父搜索框重置
    _this.searchTest = "";
    //角色用户子搜索框重置
    _this.searchTest1 = "";
    //角色用户默认展开行重置
    _this.expands = [];
    //角色用户初始页面值展示重置
    _this.RoleUserOU = _this.RoleUserOUA;
    _this.RoleUserdialogFormVisibleTest = false;
}
//测试取消1
export function ColseRoleUserTest11(_this) {
    _this.RoleUserdialogFormVisibleTest1 = false;
    //清空搜索框
    _this.vxeFilterName = "";
    //重置搜索数据源
    _this.RUvxeSelectData = _this.RoleUserTestData;
}

//点击X关闭角色用户弹窗
export function RUClosedialog1(done, _this) {
    done();
    _this.RoleUserSelection = []; //清空角色用户子表格选择器
    _this.RoleUserSelection1 = []; //清空角色用户父表格选择器
    //角色用户父搜索框重置
    _this.search = "";
    //角色用户子搜索框重置
    _this.search1 = "";
    //角色用户默认展开行重置
    _this.expands = [];
    //角色用户初始页面值展示重置
    _this.RoleUserOU = _this.RoleUserOUA;
    //_this.RoleUserSelection = []; //清空选择器
    _this.RoleUserdialogFormVisible = false;
}
//点击X关闭角色用户弹窗测试
export function RUClosedialogTest1(done, _this) {
    done();
    //角色用户父搜索框重置
    _this.searchTest = "";
    //角色用户子搜索框重置
    _this.searchTest1 = "";
    //角色用户默认展开行重置
    _this.expands = [];
    //角色用户初始页面值展示重置
    _this.RoleUserOU = _this.RoleUserOUA;
    //_this.RoleUserSelection = []; //清空选择器
    _this.RoleUserdialogFormVisibleTest = false;
}
//点击X关闭角色用户弹窗测试1
export function RUClosedialogTest11(done, _this) {
    done();
    _this.RoleUserdialogFormVisibleTest1 = false;
    //清空搜索框
    _this.vxeFilterName = "";
    //重置搜索数据源
    _this.RUvxeSelectData = _this.RoleUserTestData;
}

//右键删除角色用户
export function DeleteRoleUser1(_this) {
    _this.$confirm('是否要删除当前用户？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(() => {
            _this.$ajax.delete('DeleteMainAuthorityByRUID', {
                    params: ({
                        RUID: _this.RoleUserRowData.RUID,
                        UserID: _this.RoleUserRowData.UserID,
                        RoleID: _this.RoleUserRowData.RID
                    })
                })
                //返回成功调用
                .then((res) => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    _this.$delete(_this.RoleUesrData, _this.RoleUserRowData.row_index);
                })
                //返回失败调用
                .catch((res) => {
                    _this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });

                });

        })
        .catch(() => {});
}