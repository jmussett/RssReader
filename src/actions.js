import Readability from 'readability'

const rssToJsonBaseUrl = 'https://api.rss2json.com/v1/api.json?api_key=h42kylxg0dstxjte5qwkoli1m5j2hq3edekdrosq&rss_url='
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const fakeUri = {
    spec: "http://fakehost/test/page.html",
    host: "fakehost",
    prePath: "http://fakehost",
    scheme: "http",
    pathBase: "http://fakehost/test/"
}

export const addFeed = feedUrl => {
    return dispatch => {
        dispatch({type: 'FEED_LOADING', loading: true})
        return fetch(rssToJsonBaseUrl + encodeURI(feedUrl))
            .then(res => res.json(), err => {
                dispatch({type: 'FEED_LOADING', loading: false})
                dispatch({ type: 'INVALID_FEED' })
            })
            .then(feed => {
                dispatch({type: 'FEED_LOADING', loading: false})
                if (feed.status === 'ok') {
                    dispatch({ type: 'FEED_RETRIEVED', feed })
                } else {
                    dispatch({ type: 'INVALID_FEED' })
                }

                return feed
            })
    }
}

export const fetchItemContent = link => {
    return dispatch => {
        dispatch({type: 'LOADING_CONTENT', loading: true})
        return fetch(proxyUrl + link)
            .then(res => res.text(), err => {
                dispatch({ type: 'LOADING_CONTENT', loading: false})
                dispatch({ type: 'INVALID_CONTENT'})
            })
            .then(text => {
                var parser = new DOMParser()

                var newDocument = parser.parseFromString(text, 'text/html')

                var content = new Readability(fakeUri, newDocument).parse();

                dispatch({ type: 'LOADING_CONTENT', loading: false})

                if (!content) {
                    dispatch({ type: 'INVALID_CONTENT'})
                } else {
                    dispatch({ type: 'SHOW_ITEM_CONTENT', content })
                }

                return content
            })
    }
}