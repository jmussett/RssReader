import * as React from "react";
import { connect } from "react-redux";
import { Feed, IFeed } from "./Feed";

interface IFeedListProps {
    feeds: IFeed[];
    dispatch: () => void;
}

const FeedList: React.SFC<IFeedListProps> = ({ feeds, dispatch }) => {
    if (!feeds || feeds.length === 0) {
        return (
            <p>No feeds available. Please add a feed.</p>
        );
    }

    return (
        <div className="FeedList">
            <ul>
                {feeds.map((feed, index) => <Feed feed={feed} dispatch={dispatch} key={index}/>)}
            </ul>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        feeds: state.feeds
    };
};

export default connect(mapStateToProps)(FeedList);
