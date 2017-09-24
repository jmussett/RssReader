import React from 'react'
import { connect } from 'react-redux'
import { addFeed } from '../actions'

var AddFeed = ({ loading, dispatch }) => {
    let input

    return (
        <div className='AddFeed'>
            <span>
                <input ref={node => {
                    input = node
                }}/>
                <button onClick={() => {
                    dispatch(addFeed(input.value))
                    input.value = ''
                }}>Add Feed</button>
                {loading ? 'Loading...' : ''}
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.feedloading
    }
}

export default connect(mapStateToProps)(AddFeed)