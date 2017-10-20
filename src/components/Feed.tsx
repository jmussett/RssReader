import * as React from "react";

interface IFeed {
    feed: {
        title: string
    };
    items: Array<{}>;
}

interface IFeedProps {
    feed: IFeed;
    dispatch: (action: any) => void;
}

const Feed: React.SFC<IFeedProps> = ({ feed, dispatch }) => {
    const handleShowFeed = () => dispatch({ type: "SHOW_FEED_ITEMS", items: feed.items });

    return (
        <li onClick={handleShowFeed}>
            <span dangerouslySetInnerHTML={{ __html: feed.feed.title }} />
        </li>
    );
};

export {
    Feed,
    IFeed
};
