import{guid} from './Guid'
import{NowDate} from './date'
//var newguid= guid();
export function DataH(a, b,row,) {
    // for (let i in x) {
    //     for (let j in s) {
    //         form.push({})
    //     }
    //var c =a.length

    // }
    var c= [];
    for(let i=0;i<b.length;i++){
        for(let j=0;j<a.length;j++){
            c.push({AID:guid(),RoleID:row.ID,RoleName:row.Name,MID:b[i].Code,MainName:b[i].Name,Type:"页面",AuthorityType:a[j],LastDate:NowDate()});
           
            
        }
    }
    return c;
};

