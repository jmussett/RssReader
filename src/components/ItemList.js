import React from 'react'
import { connect } from 'react-redux'
import Item from './Item'

var ItemList = ({ items, dispatch }) => {
    return (
        <div className="ItemList">
            <ul >
                {items.map((item, index) => {
                    return <Item item={item} dispatch={dispatch} key={index}/>
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        items: state.items
    }
}

export default connect(mapStateToProps)(ItemList);