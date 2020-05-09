import { guid } from './Guid'
import { NowDate } from './date'
//窗体权限新增保存数据处理
export function DataH(a, b, row) {
    //用户名
    let username = window.sessionStorage.getItem('user');
    var c = [];
    for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < a.length; j++) {
            c.push({ AID: guid(), RoleID: row.ID, RoleName: row.Name, MID: b[i].Code, MainName: b[i].Name, Type: "页面", AuthorityType: a[j], LastModify: username, LastDate: NowDate() });
        }
    }
    return c;
};
//角色用户新增保存数据处理
export function DataRoleUser(a, row) {
    //用户名
    let username = window.sessionStorage.getItem('user');
    var b = [];
    for (let i = 0; i < a.length; i++) {
        b.push({ RUID: guid(), RID: row, UserID: a[i].AccountName, LastModify: username, LastDate: NowDate(), UserName: a[i].UserName, Code: a[i].AccountName, Organization: a[i].OU, EmailAddress: a[i].Email });
    }
    return b;
};