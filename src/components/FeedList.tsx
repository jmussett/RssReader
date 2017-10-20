import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IFeed, IRootState } from "../state";
import { IRootAction } from "../actions";
import Feed from "./Feed";

interface IFeedListProps {
    feeds: IFeed[];
    dispatch: Dispatch<IRootAction>;
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

const mapStateToProps = (state: IRootState) => ({
    feeds: state.feeds,
});

export default connect(mapStateToProps)(FeedList);
