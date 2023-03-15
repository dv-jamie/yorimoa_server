import { v4 as uuidv4 } from 'uuid';

export const formUrlEncoded = (x) =>
Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

export const createRandomNick = () => {
    const uuid = uuidv4()
    const strings = []
    const numbers = []
    for(let i = 0; i < 8; i++) {
        const ascii = uuid[i].charCodeAt()
        if(ascii >= 97 && ascii <= 122) {
            strings.push(uuid[i])
        } else {
            numbers.push(uuid[i])
        }
    }
    
    return strings.join("") + numbers.join("")
}