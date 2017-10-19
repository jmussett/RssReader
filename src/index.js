import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'
import { addFeed } from './actions'
import App from './App';

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

var dispatch = store.dispatch;

var initialFeedPromise = dispatch(addFeed('http://feeds.bbci.co.uk/news/rss.xml'))
dispatch(addFeed('http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'))
dispatch(addFeed('http://feeds.skynews.com/feeds/rss/home.xml'))
dispatch(addFeed('http://rt.com/rss'))

dispatch({type: 'LOADING_APP', loading: true})

initialFeedPromise.then(feed => {
    dispatch({ type: 'SHOW_FEED_ITEMS', items: feed.items })
    dispatch({type: 'LOADING_APP', loading: false})
})

var div = document.createElement('div');
div.setAttribute('id', 'root');
document.body.appendChild(div);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);