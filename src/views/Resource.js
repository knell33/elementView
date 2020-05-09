let self;
//新增本级
export function handleAdd(_this) {
    // _this.title = "新增本级资源目录";
    _this.choosetitle = "新增资源事务";
    _this.dialogFormVisible = true;
    _this.mark = 1; //编辑标识
    //   _this.form = {}; //清空表单
}

//新增下级
export function handleXAdd(_this) {
    // _this.title = "新增下级资源目录"
    _this.choosetitle = "新增下级事务";
    _this.dialogFormVisible = true;
    _this.mark = 1;
    _this.form.PID = _this.srow.ID; //将本级的ID作为PID
    _this.form.Type = "事务";
}

//修改
export function handleUpdate(_this) {
    _this.choosetitle = "修改资源";
    _this.mark = 2;
    //console.log(_this.srow);
    //console.log(_this.mark);
    _this.dialogFormVisible = true;
    _this.form = _this.srow;
}

//获取资源类型
export function getTypeData() {
    self.$ajax.post('GetTypeByRID',
            self.$qs.stringify({
                RID: self.form.PID
            }))
        //返回成功调用
        .then(function(res) {
            var GetType = res.data[0].Type;
            self.getType = GetType;
            //  console.log("调用");
            //  console.log(that.getType);
        })
        //返回失败调用
        .catch(function(res) {
            //console.log("没有找到类型");
        });
}

//点击确认
export function submitForm(_this) {
    self = _this;
    var that = _this;
    if (_this.form.Type == "") {
        _this.$message.error('请输入资源类型');
    } else if (_this.form.Name == "") {
        _this.$message.error('请输入资源名称');
    } else {
        if (_this.mark == 1) {
            //console.log("aa");
            //console.log(_this.form);
            var Type1 = _this.form.Type;
            //console.log(Type1);
            //console.log("aa");
            getTypeData();

            //console.log(_this.getType);

            if (_this.getType == "资源" && Type1 == "资源") {
                _this.$message({
                    message: '资源的下级不允许再挂资源，只能添加【附加资源】！',
                    type: 'warning',
                    center: true,
                    duration: 4000,
                    offset: 40
                });
            } else if (_this.getType == "事务" && Type1 == "事务") {
                _this.$message({
                    message: '事务的下级不允许再挂事务！',
                    type: 'warning',
                    center: true,
                    duration: 4000,
                    offset: 40
                });
            } else if (_this.getType == "业务" && Type1 == "业务明细") {
                _this.$message({
                    message: '业务明细必须挂在业务的下级！',
                    type: 'warning',
                    center: true,
                    duration: 4000,
                    offset: 40
                });
            } else if (_this.getType == "资源" && Type1 == "资源关系" && _this.getType != "附加资源" && _this.getType != "事务") {
                _this.$message({
                    message: '资源关系必须挂在资源或者附加资源的下级！',
                    type: 'warning',
                    center: true,
                    duration: 4000,
                    offset: 40
                });
            } else {
                //console.log("进入新增");
                _this.$ajax.post("CreateResource", _this.form)
                    .then(function(obj) {
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
                    .catch(function(obj) {
                        //console.log("新增失败");
                        that.$message({
                            type: 'warning',
                            message: '出现未知错误！',
                            duration: 4000,
                            offset: 40
                        });
                    })
            }

        } else {

            if (_this.getType == "资源" && Type1 == "资源") {
                _this.$message({
                    message: '资源的下级不允许再挂资源，只能添加【附加资源】！',
                    type: 'warning',
                    center: true,
                    duration: 4000,
                    offset: 40
                });
            } else if (_this.getType == "事务" && Type1 == "事务") {
                _this.$message({
                    message: '事务的下级不允许再挂事务！',
                    type: 'warning',
                    center: true,
                    duration: 4000,
                    offset: 40
                });
            } else if (_this.getType == "业务" && Type1 == "业务明细") {
                _this.$message({
                    message: '业务明细必须挂在业务的下级！',
                    type: 'warning',
                    center: true,
                    duration: 4000,
                    offset: 40
                });
            } else if (_this.getType == "资源" && Type1 == "资源关系" && _this.getType != "附加资源" && _this.getType != "事务") {
                _this.$message({
                    message: '资源关系必须挂在资源或者附加资源的下级！',
                    type: 'warning',
                    center: true,
                    duration: 4000,
                    offset: 40
                });
            } else {
                //console.log("进入修改");
                _this.$ajax.put('PutResourceByID', _this.form)
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
}

//关闭并清空模态框
export function colse(_this) {
    _this.dialogFormVisible = false;
    _this.title = "";
    _this.form = {};
    _this.$refs['form'].resetFields();

}

//点击X关闭模态框
export function closedialog(_this, done) {
    _this.$confirm('确认关闭？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(_ => {
            done();
            _this.form = {};
            _this.mark = null;
            //_this.title = "";
            _this.$refs['form'].resetFields();
        })
        .catch(_ => {});
}

//右键删除
export function handleDelete(_this) {
    _this.$confirm('是否要删除当前资源目录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(() => {
            _this.$ajax.delete('DeleteResourceByID', {
                    params: ({
                        ResourceId: _this.rid
                    })
                })
                //返回成功调用
                .then((res) => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //location.reload();
                    _this.treeList();
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

// 上级资源列表下拉框开启搜索功能
export function resourcedatafilter(_this, val) {
    _this.value = val
    if (val) {
        _this.options = _this.optionsCopy.filter((item => {
            if (!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase())) {
                return true;
            }
        }))
    } else {
        _this.options = _this.optionsCopy; //val为空时，还原数组
    }
}