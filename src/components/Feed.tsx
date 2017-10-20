import * as React from "react";
import { Dispatch } from "redux";
import { actionCreators, IRootAction } from "../actions";
import { IFeed } from "../state";

interface IFeedProps {
    feed: IFeed;
    dispatch: Dispatch<IRootAction>;
}

const Feed: React.SFC<IFeedProps> = ({ feed, dispatch }) => {
    const handleShowFeed = () => dispatch(actionCreators.showFeedItems(feed.items));

    return (
        <li onClick={handleShowFeed}>
            <span dangerouslySetInnerHTML={{ __html: feed.feed.title }} />
        </li>
    );
};

export default Feed;
