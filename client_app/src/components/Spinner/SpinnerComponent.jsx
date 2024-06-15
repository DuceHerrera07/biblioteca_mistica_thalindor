import React from 'react'
import { Spinner } from 'react-bootstrap'

function SpinnerComponent() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100%', backgroundColor: '#F5F5DC'}}>
            <Spinner animation="border" role="status" />
            <span className="sr-only px-2">Loading...</span>
        </div>
    )
}

export default SpinnerComponent
