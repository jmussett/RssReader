import * as React from "react";
import thunkMiddleware from "redux-thunk";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, Store } from "redux";
import { reducers } from "./reducers";
import { actionCreators, addFeed } from "./actions";
import { IRootState } from "./state";
import App from "./App";

const store: Store<IRootState> = createStore(reducers, applyMiddleware(thunkMiddleware));

const dispatch = store.dispatch;

const initialFeedPromise = dispatch(addFeed("http://feeds.bbci.co.uk/news/rss.xml"));
dispatch(addFeed("http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"));
dispatch(addFeed("http://feeds.skynews.com/feeds/rss/home.xml"));
dispatch(addFeed("http://rt.com/rss"));

dispatch(actionCreators.appLoading(true));

initialFeedPromise.then(feed => {
    dispatch(actionCreators.showFeedItems(feed.items));
    dispatch(actionCreators.appLoading(false));
});

const div = document.createElement("div");
div.setAttribute("id", "root");
document.body.appendChild(div);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);
