import * as React from "react";
import { fetchItemContent } from "../actions";
import * as moment from "moment";

interface IItem {
    thumbnail: string;
    title: string;
    pubDate: Date;
    link: string;
}

interface IItemProps {
    item: IItem;
    dispatch: (action: any) => void;
}

const Item: React.SFC<IItemProps> = ({ item, dispatch }) => {
    const handleFetchItem = () => dispatch(fetchItemContent(item.link));

    return (
        <li onClick={handleFetchItem}>
            {item.thumbnail ? <div className="ItemImageWrapper"><img src={item.thumbnail} alt="" /></div> : ""}
            {item.title ? <div className="ItemTitleWrapper" dangerouslySetInnerHTML={{ __html: item.title }} /> : ""}
            {item.pubDate ? <div className="ItemDate">{moment(item.pubDate).fromNow()}</div> : ""}
        </li>
    );
};

export {
    Item,
    IItem
};
