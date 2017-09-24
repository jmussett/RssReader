import React from 'react'
import { fetchItemContent } from '../actions'
import moment from 'moment'

var Item = ({ item, dispatch }) => {
    return (
        <li onClick={() => dispatch(fetchItemContent(item.link))}>
            {item.thumbnail ? <div className='ItemImageWrapper'><img src={item.thumbnail} alt='' /></div> : ''}
            {item.title ? <div className='ItemTitleWrapper' dangerouslySetInnerHTML={{ __html: item.title }} /> : ''}
            {item.pubDate ? <div className='ItemDate'>{moment(item.pubDate).fromNow()}</div> : ''}
        </li>
    )
}

export default Item