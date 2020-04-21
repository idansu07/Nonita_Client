import React, { useState } from 'react';
import { Grid, Search } from 'semantic-ui-react';
import _ from 'lodash';

const CustomSearch = ({ source , onSelect }) => {

    const [isLoading,setIsLoading] = useState(false)
    const [results,setResults] = useState([])
    const [value,setValue] = useState('')


    const handleResultSelect = (e, { result }) => {
        setValue('')
        onSelect(result)
    }

    const handleSearchChange = async (e, { value }) => {
        setIsLoading(true)
        setValue(value)

        setTimeout(() => {
            const re = new RegExp(_.escapeRegExp(value), 'i')
            const isMatch = (result) => re.test(result.title)
            setIsLoading(false)
            setResults(_.filter(source, isMatch))
          }, 300)
    }

    return(
        <Grid>
            <Grid.Column width={6}>
            <Search
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange=
                {
                    _.debounce(handleSearchChange, 5000, {
                        leading: true,
                    })
                }
                results={results}
                value={value}
            />
            </Grid.Column>
        </Grid>
    )
}

export default CustomSearch