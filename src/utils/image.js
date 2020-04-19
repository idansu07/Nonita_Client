export const convertArrayBufferToBase64 = (arrayBuffer) => {
    const TYPED_ARRAY = new Uint8Array(arrayBuffer)
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
        return data + String.fromCharCode(byte)
    }, '')
    const base64String = btoa(STRING_CHAR);
    return `data:image/png;base64, ${base64String}`
}

export const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
}

export const guessImageMime = (data) =>{
    if(data.charAt(0)==='/'){
      return "jpg";
    }else if(data.charAt(0)==='R'){
      return "gif";
    }else if(data.charAt(0)==='i'){
      return "png";
    }
  }