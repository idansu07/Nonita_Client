export const convertArrayBufferToBase64 = (arrayBuffer) => {
    const TYPED_ARRAY = new Uint8Array(arrayBuffer)
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
        return data + String.fromCharCode(byte)
    }, '')
    const base64String = btoa(STRING_CHAR);
    return `data:image/png;base64, ${base64String}`
}