// 输入一个带数字的字符串，返回一个对象
export function strToObj(str: string) {
    const obj:{[key: string]: string | number} = {}
    const reg = /[1-9][0-9]*/g

    obj.index = str.match(reg)?.[0] as unknown as number
    obj.name = str.replace(reg, '')
    return obj
}


export function formatter (value: string | number | Date) {
    const date = new Date(value)
    return getzf(date.getHours()) + ':' + getzf(date.getMinutes()) + '\n' + date.getDate() + '/' + (date.getMonth() + 1) + ' '; 
    function getzf(num: string | number) {
        if (parseInt(num as string) < 10) { 
            num = '0' + num; 
        } 
        return num; 
    }
}