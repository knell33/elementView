let self; //定义全局变量，用于存放指向vue的_this

export function cfoo() {
    // 取消鼠标监听事件 菜单栏
    self.menuVisible = false;
    self.cmenuVisible = false;
    self.menuVisibleCountNorm = false;
    self.menuVisibleMainAuthority = false;
    self.RoleVisible = false;
    self.PermissionVisible = false;
    self.RoleUserVisible = false;
    document.removeEventListener('click', cfoo); // 要及时关掉监听
};

//资源目录 右键菜单
export function rightClick(_this, row, column, event) {
    self = _this; //将指向vue的this赋值给全局变量self
    _this.menuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
    _this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
    _this.cmenuVisible = false;
    _this.menuVisibleCountNorm = false;

    var menu = document.querySelector('#menu');
    styleMenu(menu);
    _this.srow = JSON.parse(JSON.stringify(row)); //将当前行的数据保存至srow中
    //   console.log("进入保存");
    //console.log(this.srow);
    //  console.log("退出保存");
    _this.rid = row.ID;
    //console.log(event);
}

//资源目录 右键菜单布局
export function styleMenu(menu) {
    event.preventDefault();
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    if (event.clientX > 1800) {
        menu.style.left = event.clientX + scrollX - 100 + 'px';
    } else {
        menu.style.left = event.clientX + scrollX + 1 + 'px';
    }
    document.addEventListener('click', cfoo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
    if (event.clientY > 700) {
        menu.style.top = event.clientY + scrollY - 30 + 'px';
    } else {
        menu.style.top = event.clientY + scrollY - 10 + 'px';
    }
}


//要素分类 右键菜单
export function crightClick(_this, row, column, event, state) {
    self = _this; //将指向vue的this赋值给全局变量self
    _this.cmenuVisible = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
    _this.cmenuVisible = true; // 显示模态窗口，跳出自定义菜单栏
    self.menuVisible = false;
    self.elmenuVisible = false;
    self.menuVisibleCountNorm = false;
    self.menuVisibleMainAuthority = false;
    var menu = document.querySelector('#cmenu');
    cstyleMenu(menu);
    if (state == 'header') {
        _this.rid = _this.treedata; ////将单击树形后的当前ID赋值给表单的rid
        _this.disabledvalue = false;
    } else {
        _this.disabledvalue = true
        _this.rid = _this.treedata; ////将单击树形后的当前ID赋值给表单的rid
        _this.crow = JSON.parse(JSON.stringify(row));
        _this.cid = row.ID;
    }
    //console.log(_this.cid)
    //console.log('ROW:'+_this.crow.row_index);
    //console.log(event);

};



//要素分类 右键菜单布局
export function cstyleMenu(menu) {
    event.preventDefault();
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    if (event.clientX > 1800) {
        menu.style.left = event.clientX + scrollX - 100 + 'px';
    } else {
        menu.style.left = event.clientX + scrollX + 1 + 'px';
    }
    document.addEventListener('click', cfoo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
    if (event.clientY > 700) {
        menu.style.top = event.clientY + scrollY - 30 + 'px';
    } else {
        menu.style.top = event.clientY + scrollY - 10 + 'px';
    }
};

//统计指标 右键菜单
export function rightClickCountNorm(_this, row, event, state) {

    self = _this; //将指向vue的this赋值给全局变量self
    _this.menuVisibleCountNorm = false;
    _this.menuVisibleCountNorm = true;
    var menu = document.querySelector('#menuCountNorm');
    styleMenuCountNorm(menu);
    if (state == 'header') {
        _this.disabledvalue = false
    } else {
        _this.disabledvalue = true
    }
    _this.srow = JSON.parse(JSON.stringify(row)); //将当前行的数据保存至srow中
    //console.log("右键保存数据srow");
    //console.log(_this.srow);
    //console.log("退出保存");
    _this.rid = row.ID;
}

//统计指标 右键菜单布局
export function styleMenuCountNorm(menu) {
    event.preventDefault();
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    if (event.clientX > 1800) {
        menu.style.left = event.clientX + scrollX - 100 + 'px';
    } else {
        menu.style.left = event.clientX + scrollX + 1 + 'px';
    }
    document.addEventListener('click', cfoo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
    if (event.clientY > 700) {
        menu.style.top = event.clientY + scrollY - 30 + 'px';
    } else {
        menu.style.top = event.clientY + scrollY - 10 + 'px';
    }
}
//资源明细-角色权限 右键菜单
export function rightClickMainAuthority(_this, row, event, state) {
    self = _this; //将指向vue的this赋值给全局变量self
    _this.menuVisibleMainAuthority = false;
    _this.menuVisibleMainAuthority = true;
    var menu = document.querySelector('#menuMainAuthority');
    styleMenuMainAuthority(menu);
    if (state == 'header') {
        _this.disabledvalue = false
    } else {
        _this.disabledvalue = true
    }
    //判断修改的类型为要素则主体名称可选
    if(row.Type == "要素"){
        self.isMainName = false;
    }else{
        self.isMainName = true;
    }
    _this.srow = JSON.parse(JSON.stringify(row)); //将当前行的数据保存至srow中
    _this.aid = row.AID;
    //console.log()
}

//资源明细-角色权限 右键菜单布局
export function styleMenuMainAuthority(menu) {
    event.preventDefault();
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    if (event.clientX > 1800) {
        menu.style.left = event.clientX + scrollX - 100 + 'px';
    } else {
        menu.style.left = event.clientX + scrollX + 1 + 'px';
    }
    document.addEventListener('click', cfoo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
    if (event.clientY > 700) {
        menu.style.top = event.clientY + scrollY - 30 + 'px';
    } else {
        menu.style.top = event.clientY + scrollY - 10 + 'px';
    }
}

//角色 右键菜单
export function rightRole(_this, row, event) {
    self = _this; //将指向vue的this赋值给全局变量self
    _this.RoleVisible = false;
    _this.RoleVisible = true;
    self.PermissionVisible = false;
    self.RoleUserVisible = false;
    var menu = document.querySelector('#romenu');
    styleMenuRole(menu);
    _this.Rolerow = JSON.parse(JSON.stringify(row)); //将当前行的数据保存至srow中
    _this.RoleIDvue = row.ID;
    //console.log("右键保存数据srow");
    //console.log(_this.srow);
    //console.log(row);
}

//角色 右键菜单布局
export function styleMenuRole(menu) {
    event.preventDefault();
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    if (event.clientX > 1800) {
        menu.style.left = event.clientX + scrollX - 100 + 'px';
    } else {
        menu.style.left = event.clientX + scrollX + 1 + 'px';
    }
    document.addEventListener('click', cfoo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
    if (event.clientY > 700) {
        menu.style.top = event.clientY + scrollY - 30 + 'px';
    } else {
        menu.style.top = event.clientY + scrollY - 10 + 'px';
    }
}

//权限 右键菜单
export function rightPermission(_this, row) {
    self = _this; //将指向vue的this赋值给全局变量self
    _this.PermissionVisible = false;
    _this.PermissionVisible = true;
    self.RoleVisible = false;
    self.RoleUserVisible = false;
    var menu = document.querySelector('#pmmenu');
    stylePermission(menu);
    _this.AIDvue = row.AID;
    _this.Prow = JSON.parse(JSON.stringify(row));
    //console.log(_this.Prow);
}

//权限 右键菜单布局
export function stylePermission(menu) {
    event.preventDefault();
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    if (event.clientX > 1800) {
        menu.style.left = event.clientX + scrollX - 100 + 'px';
    } else {
        menu.style.left = event.clientX + scrollX + 1 + 'px';
    }
    document.addEventListener('click', cfoo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
    if (event.clientY > 700) {
        menu.style.top = event.clientY + scrollY - 30 + 'px';
    } else {
        menu.style.top = event.clientY + scrollY - 10 + 'px';
    }
}

//角色用户右键菜单
export function rightRoleUser(_this, row, event, state) {
    self = _this; //将指向vue的this赋值给全局变量self
    _this.RoleUserVisible = false;
    _this.RoleUserVisible = true;
    self.RoleVisible = false;
    self.PermissionVisible = false;
    var menu = document.querySelector('#roleusermenu');
    styleRoleUser(menu);
    if (state == 'header') {
        _this.disabledvalue = false
    } else {
        _this.disabledvalue = true
    }
    //保存当前行数据
    _this.RoleUserRowData = JSON.parse(JSON.stringify(row));
    //console.log(_this.RoleUserRowData);
}

//角色用户右键菜单布局
export function styleRoleUser(menu) {
    event.preventDefault();
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    if (event.clientX > 1800) {
        menu.style.left = event.clientX + scrollX - 100 + 'px';
    } else {
        menu.style.left = event.clientX + scrollX + 1 + 'px';
    }
    document.addEventListener('click', cfoo); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
    if (event.clientY > 700) {
        menu.style.top = event.clientY + scrollY - 30 + 'px';
    } else {
        menu.style.top = event.clientY + scrollY - 10 + 'px';
    }
}