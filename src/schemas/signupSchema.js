import validator from 'validator';
export const stateSchema = {
    firstName:{
        value:'',
        error:''
    },
    lastName:{
        value:'',
        error:''
    },
    userName:{
        value:'',
        error:''
    },
    email:{
        value:'',
        error:''
    },
    password:{
        value:'',
        error:''
    },
    birthday:{
        value:null,
        error:''
    }
}

export const validationSchema = {
    firstName:{
        required:true,
        validator:{
            error:'First name is required'
        }
    },
    lastName:{
        required:true,
        validator:{
            error:'Last name is required'
        }
    },
    userName:{
        required:true,
        validator:{
            error:'User name is required'
        }
    },
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
            isValid:function(password){
               if(password.length >= 7) return true
               return false
            },
            error:'Password must contains at least 7 chras'
        }
    },
    birthday:{
        required:false,
        validator:{
            isValid:function(date){
                let isDate = false
                if(date){
                    isDate = validator.toDate(date.toISOString())
                }
                return isDate
            },
            error:'Birthday should be valid date'
        }
    }
}