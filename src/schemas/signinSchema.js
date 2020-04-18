import validator from 'validator';
export const stateSchema = {
    email:{
        value:'',
        error:''
    },
    password:{
        value:'',
        error:''
    }
}

export const validationSchema = {
    email:{
        required:true,
        validator: {
            isValid:function(email){
                if(validator.isEmail(email)) return true
                return false
            },
            error:'email is invalid'
        }
    },
    password:{
        required:true,
        validator:{
            error:'password is invalid'
        }
    }
}