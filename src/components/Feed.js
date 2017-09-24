import React from 'react'

var Feed = ({ feed, dispatch }) => {
    return (
        <li onClick={() => dispatch({ type: 'SHOW_FEED_ITEMS', items: feed.items })}>
            <span dangerouslySetInnerHTML={{ __html: feed.feed.title }} />
        </li>
    )
}

export default Feed