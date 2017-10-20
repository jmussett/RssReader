import { combineReducers } from "redux";
import { IFeed, IItem, IRootState, IItemContent } from "./state";

import {
    IAction,
    APP_LOADING,
    FEED_LOADING,
    FEED_RETRIEVED,
    FEED_INVALID,
    CONTENT_LOADING,
    CONTENT_INVALID,
    SHOW_CONTENT,
    SHOW_FEED_ITEMS,
} from "./actions";

export const reducers = combineReducers<IRootState>({
    appLoading: (state = false, action: IAction): boolean => {
        switch (action.type) {
            case APP_LOADING:
                return action.payload;
            default:
                return state;
        }
    },
    feedLoading: (state = false, action: IAction): boolean => {
        switch (action.type) {
            case FEED_LOADING:
                return action.payload;
            default:
                return state;
        }
    },
    feeds: (state: IFeed[] = [], action: IAction): IFeed[] => {
        switch (action.type) {
            case FEED_RETRIEVED:
                return [...state, action.payload];
            case FEED_INVALID:
                alert("Invalid Url. Please Try Another.");
                return state;
            default:
                return state;
        }
    },
    items: (state: IItem[] = [], action: IAction): IItem[] => {
        switch (action.type) {
            case SHOW_FEED_ITEMS:
                return action.payload;
            default:
                return state;
        }
    },
    content: (state: IItemContent = {}, action: IAction): IItemContent => {
        switch (action.type) {
            case CONTENT_LOADING:
                return {...state, loading: action.payload};
            case CONTENT_INVALID:
                return {...state, invalid: true};
            case SHOW_CONTENT:
                return action.payload;
            default:
                return state;
        }
    },
});
