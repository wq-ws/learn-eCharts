// 输入一个带数字的字符串，返回一个对象
export function strToObj(str: string) {
    const obj:{[key: string]: string | number} = {}
    const reg = /[1-9][0-9]*/g

    obj.index = str.match(reg)?.[0] as unknown as number
    obj.name = str.replace(reg, '')
    return obj
}