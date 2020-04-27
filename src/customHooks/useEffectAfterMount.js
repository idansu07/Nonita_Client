import { useEffect, useRef } from 'react';

const useEffectAfterMount = (cb,deps) => {
    const componentJusmMounted = useRef(true)
    useEffect(() => {
        if(!componentJusmMounted.current){
            return cb()
        }
        componentJusmMounted.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },deps)
}

export default useEffectAfterMount