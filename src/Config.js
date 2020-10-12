export function joinArrayObjs(arr) {
    var str = '';
    for (var i = 0, len = arr.length; i < len; i++) {
        const element = arr[i]
        let account
        // if (element.media_name=='contact'||element.media_name=='textme'){
        account = '"' + element.account.toString() + '"'

        str += element.media_name + ',' + element.account.toString() + ':';
    }
    return str;
}
export function convertArrayObjs(string) {
    let arr = [], arr1 = []
    arr1 = string.split(":")
    arr1.forEach(element => {
        if (element) {
            const item = element.split(",")
            if (item.length > 1 && item[0] && item[1])
                arr.push({ media_name: item[0], account: item[1] })
        }
    });
    return arr;
}