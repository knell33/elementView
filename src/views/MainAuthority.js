import { NowDate } from "../utility/date"
let self;
//新增角色权限
export function mainAuthorityAdd(_this) {
    if (_this.aform.DID == "" || _this.aform.DID == undefined) {
        _this.$message({
            type: 'warning',
            message: '未选择相应的资源明细数据',
            duration: 4000,
            offset: 40
        });
    } else {
        self = _this;
        _this.choosetitle = "新增角色权限";
        _this.dialogFormVisibleMainAuthority = true;
        _this.mark = 7; //编辑标识
    }
}
//修改角色权限
export function mainAuthorityUpdate(_this) {
    if (_this.aform.DID == "" || _this.aform.DID == null) {
        _this.$message({
            message: '未选中相应的资源明细数据',
            type: 'warning',
            duration: 4000,
            offset: 40
        });
    } else if (_this.aid == "" || _this.aid == null) {
        _this.$message({
            message: '未选中相应的角色权限数据',
            type: 'warning',
            duration: 4000,
            offset: 40
        });
    } else {
        self = _this;
        self.choosetitle = "修改角色权限";
        self.aform = self.srow;
        self.mark = 8;
        //修改 权限类型
        let arr = [];
        arr = self.aform.AuthorityType;
        self.aform.AuthorityType = arr.split(',');
        self.dialogFormVisibleMainAuthority = true;
    }

}

//角色权限 点击确认
export function submitMainAuthority(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    var that = _this;
    that.aform.LastDate = NowDate();
    if (that.mark === 7) {
        if(that.aform.RoleID == "" || that.aform.RoleID == undefined || that.aform.RoleID == null){
            that.$message({
                type: 'warning',
                message: '角色不能为空,请选择',
                duration: 4000,
                offset: 40
            });
        }else if(that.aform.AuthorityType == "" || that.aform.AuthorityType == undefined || that.aform.AuthorityType == null){
            that.$message({
                type: 'warning',
                message: '权限类型不能为空，请选择',
                duration: 4000,
                offset: 40
            });
        }else{
             //权限类型-格式化  将数组转换为字符串
            let totalType = that.aform.AuthorityType.join(",");
            that.aform.AuthorityType = totalType;
            that.aform.LastModify = that.UserName;
            that.$ajax.post('CreateMainAuthority', that.aform)
            //返回成功调用
            .then(function(res) {
                that.$message({
                    type: 'success',
                    message: '新增成功',
                    duration: 4000,
                    offset: 40
                });
                for (let i = 0; i < that.RoleInfo.length; i++) {
                    if (that.RoleInfo[i].RoleID == that.aform.RoleID) {
                        that.aform.RoleName = that.RoleInfo[i].RoleName;
                        break;
                    }
                }
                //局部刷新-角色权限
                that.$ajax.post('GetAllMainAuthorityByDetailID',
                        that.$qs.stringify({
                            DID: that.aform.DID
                        }))
                    .then(function(res) {
                        that.MainAuthorityTableData = res.data;
                    })
                    .catch(function(res) {})
                    //关闭模态框 清空数据
                that.dialogFormVisibleMainAuthority = false;
                that.aform = {};
                that.isMainName = true;
                that.mark = null;
            })
            //返回失败调用
            .catch((res) => {
                that.$message({
                    type: 'warning',
                    message: '选择资源明细数据无效，请重新选择！',
                    duration: 4000,
                    offset: 40
                });
                that.dialogFormVisibleMainAuthority = false;
                that.aform = {};
                that.mark = null;
            });
        }
    } else if (that.mark === 8) {
        //权限类型-格式化   方便保存到数据库
        let totalType = that.aform.AuthorityType.join(",");
        that.aform.AuthorityType = totalType;
        that.aform.LastModify = that.UserName;
        that.$ajax.put('PutMainAuthorityByAID', that.aform)
            //返回成功调用
            .then((res) => {
                that.$message({
                    type: 'success',
                    message: '角色权限修改成功！',
                    duration: 4000,
                    offset: 40
                });
                that.$set(that.MainAuthorityTableData, _this.srow.row_index, _this.srow);
                that.dialogFormVisibleMainAuthority = false;
                that.aform = {};
                that.isMainName = true;
                that.mark = null;

            })
            //返回失败调用
            .catch((res) => {
                that.$message({
                    type: 'warning',
                    message: '角色权限修改失败！',
                    duration: 4000,
                    offset: 40
                });
            });
    }
}

//关闭并清空模态框
export function mainAuthoritycolse(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    self.dialogFormVisibleMainAuthority = false;
    self.title = "";
    self.isMainName = true;
    let oldaform = self.aform;
    self.aform = {};
    //保存取消前的数据
    self.aform.DID = oldaform.DID;
    self.aform.RID = oldaform.RID;
    //console.log("关闭并清空模态框");

}
//点击X关闭模态框
export function mainAuthorityclosedialog(done, _this) {
    self = _this; //将指向vue的this赋值给全局变量self
    let oldaform = self.aform;
    done();
    self.aform = {};
    //保存取消前的数据
    self.aform.DID = oldaform.DID;
    self.aform.RID = oldaform.RID;
    self.isMainName = true;
    self.mark = null;
    self.title = "";
    //console.log("点击X关闭模态框");

}

//角色权限 右键删除
export function mainAuthorityDelete(_this) {
    if (_this.aid == "" || _this.aid == undefined) {
        _this.$message({
            type: 'warning',
            message: '未选中相应的角色信息数据',
            duration: 4000,
            offset: 40
        });
    } else {
        self = _this; //将指向vue的this赋值给全局变量self
        self.$confirm('是否要删除当前角色权限？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                self.$ajax.delete('DeleteMainAuthorityByAID', {
                        params: ({
                            AID: self.aid
                        })
                    })
                    //返回成功调用
                    .then((res) => {
                        if (self.aid == "" || self.aid == null) {
                            self.$message({
                                type: 'error',
                                message: '选中删除数据为空，删除失败！'
                            });
                        } else {
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            _this.$delete(_this.MainAuthorityTableData, _this.srow.row_index);
                        }
                    })
                    //返回失败调用
                    .catch((res) => {
                        self.$message({
                            type: 'error',
                            message: '删除失败!'
                        });

                    });
            })
            .catch(() => {});
    }
}

//角色权限-获取主体名称
export function getDetailname(_this, val) {
    let that = _this;
    if (val == "资源明细") {
        that.aform.MID = that.detailID;
        that.aform.MainName = that.detailName;
        that.isMainName = true;
    } else if (val == "要素") {
        that.isMainName = false;
        that.aform.MainName = "";
        that.aform.MID = "";

    }
}