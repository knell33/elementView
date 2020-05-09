//获取登录用户名
export function getUserName(username, url) {
    return decodeURIComponent((new RegExp('[?|&]' + username + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
//获取用户登录名1
export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            //console.log(pair[1]);
            return pair[1];
        }
    }
    return (false);
}