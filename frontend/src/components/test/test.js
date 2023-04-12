import { Button } from '@mui/material'
import React, { useState } from 'react'

export const Test = () => {
    const [process, setProcess] = useState(1)
    return (
        <>
            <label htmlFor="">Name</label>
            <input type="text" />
            <Button>Next</Button>
        </>
    )
}
