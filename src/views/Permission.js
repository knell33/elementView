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


}
//窗体权限点击确认
export function PermissionsubmitForm(_this) {
    var that = _this;
    var m = DataH(_this.AuthorityType, _this.multipleSelection, _this.Rolerow)
    var m1 = JSON.stringify(m)
    console.log(m1);
    that.$ajax.post('CreateMainAuthorities',
            that.$qs.stringify({
                maJson: m1
            }))
        //返回成功调用
        .then(function(obj) {
            that.$message({
                type: 'success',
                message: '新增成功',
                duration: 4000,
                offset: 40
            });
            for (let i in m) {
                _this.PermissionData.push(m[i]);
            }
            _this.dialogFormVisible = false;
            this.$refs.PagePermission.clearSelection();

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
            that.OtherdialogFormVisible = false;
        })
}

//点击取消关闭并清空窗体权限模态框
export function Permissioncolse(_this) {
    _this.dialogFormVisible = false;
    _this.multipleSelection = []; //清空选择器
    _this.AuthorityType = []; //清空被选中页面权限
}

//点击X关闭窗体权限模态框
export function Permissionclosedialog(done, _this) {
    done();
    _this.multipleSelection = []; //清空选择器
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
            that.OtherdialogFormVisible = false;
        })



}

//点击取消关闭并清空其他权限模态框
export function OPermissioncolse(_this) {
    _this.oform = {};
    _this.OtherdialogFormVisible = false;

}

//点击X关闭其他权限模态框
export function OPermissionclosedialog(done, _this) {
    _this.oform = {};
    done();
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
//角色用户确认
export function RoleUserSubmit1(_this) {
    var that = _this;
    var m = DataRoleUser(_this.RoleUserSelection, _this.RoleIDvue);
    var m1 = JSON.stringify(m);
    console.log(m1);
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
                for (let i in m) {
                    _this.RoleUesrData.push(m[i]);
                }
                _this.RoleUserSelection = []; //清空选择器
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
                _this.RoleUserSelection = []; //清空选择器
                _this.RoleUserdialogFormVisible = false;
            })
    }
}

//点击取消关闭并清空角色用户弹窗
export function ColseRoleUser1(_this) {
    _this.RoleUserSelection = []; //清空选择器
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

//点击X关闭角色用户弹窗
export function RUClosedialog1(done, _this) {
    done();
    //角色用户父搜索框重置
    _this.search = "";
    //角色用户子搜索框重置
    _this.search1 = "";
    //角色用户默认展开行重置
    _this.expands = [];
    //角色用户初始页面值展示重置
    _this.RoleUserOU = _this.RoleUserOUA;
    _this.RoleUserSelection = []; //清空选择器
    _this.RoleUserdialogFormVisible = false;
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