import { combineReducers } from 'redux'

const appLoading = (state = false, action) => {
    switch (action.type) {
        case 'FEED_LOADING':
            return action.loading
        default:
            return state
    }
}

const feedLoading = (state = false, action) => {
    switch (action.type) {
        case 'FEED_LOADING':
            return action.loading
        default:
            return state
    }
}

const feeds = (state = [], action) => {
    switch (action.type) {
        case 'FEED_RETRIEVED':
            return [...state, action.feed]
        case 'INVALID_FEED':
            alert('Invalid Url. Please Try Another.')
            return state
        default:
            return state
    }
}

const items = (state = [], action) => {
    switch (action.type) {
        case 'SHOW_FEED_ITEMS':
            return action.items
        default:
            return state
    }
}

const content = (state = {}, action) => {
    switch (action.type) {
        case 'LOADING_CONTENT':
            return Object.assign({}, state, {
                loading: action.loading
            })
        case 'INVALID_CONTENT':
            return Object.assign({}, state, {
                invalid: true
            })
        case 'SHOW_ITEM_CONTENT':
            return action.content
        default:
            return state
    }
}

export default combineReducers({appLoading, feedLoading, feeds, items, content})