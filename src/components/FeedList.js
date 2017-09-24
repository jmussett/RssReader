import React from 'react'
import { connect } from 'react-redux'
import Feed from './Feed'

var FeedList = ({ feeds, loading, dispatch }) => {
    if (!feeds || feeds.length === 0) {
        return (
            <p>No feeds available. Please add a feed.</p>
        )
    }
    return (
        <div className='FeedList'>
            <ul>
                {feeds.map((feed, index) => {
                    return <Feed feed={feed} dispatch={dispatch} key={index}/>
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        feeds: state.feeds
    }
}

export default connect(mapStateToProps)(FeedList);