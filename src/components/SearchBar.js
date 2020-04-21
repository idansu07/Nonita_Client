import React, { useState, useEffect, Fragment }  from 'react';
import { convertArrayBufferToBase64 } from '../utils/image';
import CustomSearch from './Common/CustomSearch';
import { Redirect } from 'react-router-dom';

const SearchBar = props => {
    const {api} = props
    const [profile,setProfile] = useState()
    const [source,setSource] = useState([])

    const handleSelect = (result) => {
        setProfile(result)
    }

    useEffect(() => {
        async function getSource()  {
            const response = await api()
            if(response.data){
                const results = response.data.map(r => {
                    let result = {}
                    result.title = `${r['firstName']} ${r['lastName']}`
                    result.image = r.avatar ? convertArrayBufferToBase64(r.avatar.data) : null
                    result.id = r._id
                    result.description = r.userName
                    return result
                })
                setSource(results)
            }
        }
        getSource()
    },[api])

    return(
        <Fragment>
            <CustomSearch source={source} onSelect={handleSelect} />
            {profile && <Redirect push to={`/profile/${profile.id}`} /> }
        </Fragment>
    )
}

export default SearchBar