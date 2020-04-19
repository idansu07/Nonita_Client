import axios from 'axios';
import qs from 'qs';

const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    headers:{
        "content-type": "application/json",
        Authorization:"Bearer " + localStorage.getItem("token")
    }
})

export const setToken = () => {
    axiosInstance.defaults.headers = {...axiosInstance.defaults.headers , Authorization:"Bearer " + localStorage.getItem("token")}
}

export const GET = async (url,spec) =>{
    try {
        if(spec){
            const params = qs.stringify(spec ,{
                arrayFormat:'comma',
                encodeValuesOnly:true,
                addQueryPrefix:true,
            })
            if(params){
                url = `${url}${params}`
            }
        }
        const response = await axiosInstance.get(url)
        return response
    } catch (error) {
        throw error.response
    }
}

export const POST = async (url,params) => {
    try {
        const response = await axiosInstance.post(url,params)
        return response
    } catch (error) {
        throw error.response
    }
}

export const PATCH = async (url,params) => {
    try {
        const response = await axiosInstance.patch(url,params)
        return response
    } catch (error) {
        throw error.response
    }
}

export const DELETE = async (url,params) => {
    try {
        
    } catch (error) {
        
    }
}