import { Dispatch } from "redux";
import { IItemContent, IFeed, IItem } from "./state";

const Readability = require("readability");

const rssToJsonBaseUrl = "https://api.rss2json.com/v1/api.json?api_key=h42kylxg0dstxjte5qwkoli1m5j2hq3edekdrosq&rss_url=";
const proxyUrl = "https://galvanize-cors-proxy.herokuapp.com/";

const fakeUri = {
    spec: "http://fakehost/test/page.html",
    host: "fakehost",
    prePath: "http://fakehost",
    scheme: "http",
    pathBase: "http://fakehost/test/",
};

export const APP_LOADING        = "APP_LOADING";
export const FEED_LOADING       = "FEED_LOADING";
export const FEED_RETRIEVED     = "FEED_RETRIEVED";
export const FEED_INVALID       = "FEED_INVALID";
export const CONTENT_LOADING    = "CONTENT_LOADING";
export const CONTENT_INVALID    = "CONTENT_INVALID";
export const SHOW_CONTENT       = "SHOW_CONTENT";
export const SHOW_FEED_ITEMS    = "SHOW_FEED_ITEMS";

export interface IActions {
    APP_LOADING:        { type: typeof APP_LOADING, payload: boolean };
    FEED_LOADING:       { type: typeof FEED_LOADING, payload: boolean };
    FEED_RETRIEVED:     { type: typeof FEED_RETRIEVED, payload: IFeed };
    FEED_INVALID:       { type: typeof FEED_INVALID };
    CONTENT_LOADING:    { type: typeof CONTENT_LOADING, payload: boolean };
    CONTENT_INVALID:    { type: typeof CONTENT_INVALID };
    SHOW_CONTENT:       { type: typeof SHOW_CONTENT, payload: IItemContent };
    SHOW_FEED_ITEMS:    { type: typeof SHOW_FEED_ITEMS, payload: IItem[] };
}

export type IAction =
    | IActions[typeof APP_LOADING]
    | IActions[typeof FEED_LOADING]
    | IActions[typeof FEED_RETRIEVED]
    | IActions[typeof FEED_INVALID]
    | IActions[typeof CONTENT_LOADING]
    | IActions[typeof CONTENT_INVALID]
    | IActions[typeof SHOW_CONTENT]
    | IActions[typeof SHOW_FEED_ITEMS];

export type IRootAction =
    | IAction
    | ((dispatch: Dispatch<IAction>) => Promise<IFeed>)
    | ((dispatch: Dispatch<IAction>) => Promise<IItemContent>);

export const actionCreators = {
    appLoading: (payload: boolean): IActions[typeof APP_LOADING] => ({
        type: APP_LOADING, payload,
    }),
    feedLoading: (payload: boolean): IActions[typeof FEED_LOADING] => ({
        type: FEED_LOADING, payload,
    }),
    feedRetrieved: (payload: IFeed): IActions[typeof FEED_RETRIEVED] => ({
        type: FEED_RETRIEVED, payload,
    }),
    feedInvalid: (): IActions[typeof FEED_INVALID] => ({
        type: FEED_INVALID,
    }),
    contentLoading: (payload: boolean): IActions[typeof CONTENT_LOADING] => ({
        type: CONTENT_LOADING, payload,
    }),
    contentInvalid: (): IActions[typeof CONTENT_INVALID] => ({
        type: CONTENT_INVALID,
    }),
    showContent: (payload: IItemContent): IActions[typeof SHOW_CONTENT] => ({
        type: SHOW_CONTENT, payload,
    }),
    showFeedItems: (payload: IItem[]): IActions[typeof SHOW_FEED_ITEMS] => ({
        type: SHOW_FEED_ITEMS, payload,
    }),
};

export const addFeed = (feedUrl: string) => {
    return (dispatch: Dispatch<IAction>) => {
        dispatch(actionCreators.feedLoading(true));
        return fetch(rssToJsonBaseUrl + encodeURI(feedUrl))
            .then(res => res.json(), () => {
                dispatch(actionCreators.feedLoading(false));
                dispatch(actionCreators.feedInvalid());
            })
            .then((feed: IFeed) => {
                dispatch(actionCreators.feedLoading(false));
                if (feed.status === "ok") {
                    dispatch(actionCreators.feedRetrieved(feed));
                } else {
                    dispatch(actionCreators.feedInvalid());
                }

                return feed;
            });
    };
};

export const fetchItemContent = (link: string) => {
    return (dispatch: Dispatch<IAction>) => {
        dispatch(actionCreators.contentLoading(true));
        return fetch(proxyUrl + link)
            .then(res => res.text(), () => {
                dispatch(actionCreators.contentLoading(false));
                dispatch(actionCreators.contentInvalid());
            })
            .then((text: string) => {
                const parser = new DOMParser();

                const newDocument = parser.parseFromString(text, "text/html");

                const content: IItemContent = new Readability(fakeUri, newDocument).parse();

                dispatch(actionCreators.contentLoading(false));

                if (!content) {
                    dispatch(actionCreators.contentInvalid());
                } else {
                    dispatch(actionCreators.showContent(content));
                }

                return content;
            });
    };
};
