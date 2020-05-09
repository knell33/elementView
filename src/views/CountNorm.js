let self;
//新增统计指标
export function countNormAdd(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    if (_this.resouceData.Type == "事务" || _this.resouceData.Type == "资源关系") {
        _this.choosetitle = "新增统计指标";
        _this.dialogFormVisibleCountNorm = true;
        _this.mark = 3; //编辑标识
        _this.form = {
            RID: _this.resouceData.ID,
            Name: _this.resouceData.Name,
            NormName: _this.resouceData.Name,
            AssociationType: _this.resouceData.Type
        };
    } else {
        self.$message({
            message: '只有资源类型为事务或者资源关系的才能新增统计指标',
            type: 'warning',
            duration: 4000,
            offset: 40
        });
    }

}
//修改统计指标
export function countNormUpdate(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    if (self.srow.ID == "" || self.srow.ID == null) {
        self.$message({
            message: '未选中相应的统计指标数据',
            type: 'warning',
            duration: 4000,
            offset: 40
        });
    } else {
        self.choosetitle = "修改统计指标";
        self.mark = 4;
        self.dialogFormVisibleCountNorm = true;
        self.form = self.srow;
        self.form.Name = self.resouceData.Name;
    }

}

//统计指标 点击确认
export function submitCountNorm(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    var that = _this;
    if (that.form.NormName == "") {
        self.$message({
            message: '指标名称不能为空',
            type: 'warning',
            duration: 4000,
            offset: 40
        });
    } else {
        if (that.mark === 3) {
            that.form.LastModify = that.UserName;
            that.$ajax.post('CreateCountNorm', that.form)
                //返回成功调用
                .then(function(res) {
                    that.$message({
                        type: 'success',
                        message: '新增成功',
                        duration: 4000,
                        offset: 40
                    });
                    //局部刷新-统计指标
                    that.$ajax.post('GetAllCountNormByRID',
                            that.$qs.stringify({
                                RID: that.form.RID
                            }))
                        .then(function(res) {
                            that.CountNormTableData = res.data;
                        })
                        .catch(function(res) {})
                    that.dialogFormVisibleCountNorm = false;
                    that.form = {};
                    that.mark = null;
                })
                //返回失败调用
                .catch((res) => {
                    that.$message({
                        type: 'success',
                        message: '新增异常',
                        duration: 4000,
                        offset: 40
                    });
                    that.dialogFormVisibleCountNorm = false;
                    that.form = {};
                    that.mark = null;
                });
        } else if (that.mark === 4) {
            that.form.LastModify = that.UserName;
            that.$ajax.put('PutCountNormByID', that.form)
                //返回成功调用
                .then((res) => {
                    that.$message({
                        type: 'success',
                        message: '统计指标修改成功！',
                        duration: 4000,
                        offset: 40
                    });
                    that.$set(that.CountNormTableData, _this.srow.row_index, _this.srow);
                    that.dialogFormVisibleCountNorm = false;
                    that.form = {};
                    that.mark = null;

                })
                //返回失败调用
                .catch((res) => {
                    that.$message({
                        type: 'warning',
                        message: '统计指标修改失败！',
                        duration: 4000,
                        offset: 40
                    });
                });
        }
    }
}

//关闭并清空模态框
export function countNormcolse(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    self.dialogFormVisible = false;
    self.dialogFormVisibleCountNorm = false;
    self.title = "";
    self.form = {};
}
//点击X关闭模态框
export function countNormclosedialog(done, _this) {
    self = _this; //将指向vue的this赋值给全局变量self
    done();
    self.form = {};
    self.mark = null;
    self.title = "";
    // self.$refs['form'].resetFields();

}

//统计指标 右键删除
export function countNormDelete(_this) {
    self = _this; //将指向vue的this赋值给全局变量self
    if (self.CountNormTableData == "" || self.CountNormTableData == undefined || self.CountNormTableData == null) {
        self.$message("该资源没有统计指标的数据，不能删除！");
    } else {
        self.$confirm('是否要删除当前统计指标？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                //console.log(self.rid);
                self.$ajax.delete('DeleteCountNormByID', {
                        params: ({
                            countNormID: self.rid
                        })
                    })
                    //返回成功调用
                    .then((res) => {
                        if (self.rid == "" || self.rid == null) {
                            self.$message({
                                type: 'error',
                                message: '选中删除数据为空，删除失败！'
                            });
                        } else {
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            _this.$delete(_this.CountNormTableData, _this.srow.row_index);
                        }
                        //location.reload();
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

//统计指标-实现要素名称和指标名称值变化联动
export function changeName(_this, val) {
    let that = _this;
    that.$ajax.post('GetAllElementByEID', that.$qs.stringify({
            EID: val
        }))
        .then(function(res) {
            that.form.NormName = res.data[0].Name;
        });
}