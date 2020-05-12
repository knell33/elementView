import { NowDate } from "../utility/date"
export function ClassifyhandleAdd(_this) {
    if (_this.rid == "" || _this.rid == undefined) {
        _this.$message({
            type: 'warning',
            message: '未选择相应的资源目录数据',
            duration: 4000,
            offset: 40
        });
    } else {
        _this.choosetitle = "新增要素分类";
        _this.ClassifydialogFormVisible = true;
        _this.cform.RID = _this.rid; //将单击树形后的当前ID赋值给表单的RID
        _this.mark = 1; //编辑标识
        _this.form = {}; //清空表单
    }

}
//修改
export function ClassifyhandleUpdate(_this) {
    _this.choosetitle = "修改要素分类";
    _this.mark = 2;
    _this.ClassifydialogFormVisible = true;
    _this.cform = _this.crow;
}

//点击确认
export function ClassifysubmitForm(_this) {
    var that = _this;
    that.cform.LastDate = NowDate();
    if (that.mark == 1) {
        if (_this.cform.Name != "") {
            //console.log("cform:"+that.cform);
            that.cform.LastModify = that.UserName;
            //console.log(that.cform);
            that.$ajax.post("CreateElementClassify", that.cform)
                .then(function(obj) {
                    that.$message({
                        type: 'success',
                        message: '新增成功',
                        duration: 4000,
                        offset: 40
                    });
                    //局部刷新-要素分类
                    that.$ajax.post('GetAllElementClassifyByRID',
                            that.$qs.stringify({
                                RID: that.cform.RID
                            }))
                        .then(function(res) {
                            that.ElementClassifyTableData = res.data;
                            //刷新要素目录的分类字段
                            that.ClassifyList = res.data;
                        })
                        .catch();                   
                    that.ClassifydialogFormVisible = false;
                    that.cform = {};
                    that.cmark = null;

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
        } else {
            that.$message({
                type: 'warning',
                message: '名称不能为空!',
                duration: 4000,
                offset: 40
            });
        }
    } else {
        //console.log("进入修改");
        if (_this.cform.Name != "") {
            that.cform.LastModify = that.UserName;
            that.$ajax.put('PutElementClassifyByID', that.cform)
                //返回成功调用
                .then((res) => {
                    that.$message({
                        type: 'success',
                        message: '修改成功！',
                        duration: 4000,
                        offset: 40
                    });
                    that.$set(that.ElementClassifyTableData, _this.crow.row_index, _this.crow); //替换要素分类表格中的数据
                    //刷新要素目录的分类字段
                    that.$ajax.post("GetAllElementClassifyByRID",
                    that.$qs.stringify({
                            RID: that.cform.RID
                        })).then(function (res) {
                            that.ClassifyList = res.data;
                        });
                    that.ClassifydialogFormVisible = false;
                    that.cform = {};
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
        } else {
            that.$message({
                type: 'warning',
                message: '名称不能为空!',
                duration: 4000,
                offset: 40
            });
        }
    }
}



//关闭并清空模态框
export function Classifycolse(_this) {
    _this.ClassifydialogFormVisible = false;
    _this.cform = {};
    _this.$refs['cform'].resetFields();

}

//点击X关闭模态框
export function Classifyclosedialog(done, _this) {
    var that = _this;
    _this.$confirm('确认关闭？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(_ => {
            done();
            that.ClassifydialogFormVisible = false;
            that.cform = {};
            that.mark = null;
            //this.title = "";
            that.$refs['cform'].resetFields();
        })
        .catch(_ => {});
}

//右键删除
export function ClassifyhandleDelete(_this) {
    _this.$confirm('是否要删除当前要素分类？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(() => {
            _this.$ajax.delete('DeleteElementClassifyByID', {
                    params: ({
                        CID: _this.cid
                    })
                })
                //返回成功调用
                .then((res) => {
                    _this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    _this.$delete(_this.ElementClassifyTableData, _this.crow.row_index);
                    //资源目录-分类字段
                    _this.$delete(_this.ClassifyList, _this.crow.row_index);

                })
                //返回失败调用
                .catch((res) => {
                    _this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });

                });
            _this.$delete(_that.ElementClassifyTableData, _this.crow.row_index);
        })
        .catch(() => {});
}