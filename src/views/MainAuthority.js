import { NowDate } from "../utility/date"
let self;
//新增角色权限
export function mainAuthorityAdd(_this) {
    //console.log("新增角色权限");
    self = _this; //将指向vue的this赋值给全局变量self
    //self.aform.AuthorityType = ['新增'];
    _this.choosetitle = "新增角色权限";
    _this.dialogFormVisibleMainAuthority = true;
    _this.mark = 7; //编辑标识

}
//修改角色权限
export function mainAuthorityUpdate(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    self.choosetitle = "修改角色权限";
    self.aform = self.srow;
    self.mark = 8;
    //修改 权限类型
    let arr = [];
    arr = self.aform.AuthorityType;
    self.aform.AuthorityType = arr.split(',');
    console.log("修改时form数据");
    console.log(self.srow);
    //console.log(arr);
    self.dialogFormVisibleMainAuthority = true;
}

//角色权限 点击确认
export function submitMainAuthority(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    var that = _this;
    console.log("角色权限点击确认")
    console.log(that.aform);
    that.aform.LastDate = NowDate();
    if (that.mark === 7) {
        //权限类型-格式化  将数组转换为字符串
        let totalType = that.aform.AuthorityType.join(",");
        that.aform.AuthorityType = totalType;
        console.log(that.aform);
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
                        console.log(that.RoleInfo[i].RoleID);
                        break;
                    }
                }
                that.MainAuthorityTableData.push(that.aform);
                that.dialogFormVisibleMainAuthority = false;
                that.aform = {};
                that.mark = null;
            })
            //返回失败调用
            .catch((res) => {
                that.$message({
                    type: 'warning',
                    message: '新增异常',
                    duration: 4000,
                    offset: 40
                });
                that.dialogFormVisibleMainAuthority = false;
                that.aform = {};
                that.mark = null;
            });

    } else if (that.mark === 8) {
        console.log("进入修改");
        console.log(that.aform.AuthorityType);
        //权限类型-格式化   方便保存到数据库
        let totalType = that.aform.AuthorityType.join(",");
        that.aform.AuthorityType = totalType;
        console.log(that.aform.AuthorityType);
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
    console.log("取消生效1");
    //self.$refs['form'].resetFields();

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
    console.log("取消生效2");
    // self.$refs['form'].resetFields();

}

//角色权限 右键删除
export function mainAuthorityDelete(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    console.log(self);
    self.$confirm('是否要删除当前角色权限？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(() => {
            console.log(self.aid);
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

//角色权限-获取主体名称
export function getDetailname(_this, val) {
    let that = _this;
    console.log("getDetailname被调用了");
    console.log(val);

    if (val == "资源明细") {
        that.aform.MainName = that.detailName;
        that.isMainName = true;
        console.log(that.aform);
    } else if (val == "要素") {
        that.isMainName = false;
        that.aform.MainName = "";

    }
}