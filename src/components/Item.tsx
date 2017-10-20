import * as React from "react";
import * as moment from "moment";
import { Dispatch } from "redux";
import { fetchItemContent, IRootAction } from "../actions";
import { IItem } from "../state";

interface IItemProps {
    item: IItem;
    dispatch: Dispatch<IRootAction>;
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

export default Item;
