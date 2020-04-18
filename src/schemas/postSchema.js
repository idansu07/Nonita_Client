export const stateSchema = {
    content:{
        value:'',
        error:''
    }
}

export const validationSchema = {
    content:{
        required:true,
        validator: {
            error:'Post is required field'
        }
    }
}