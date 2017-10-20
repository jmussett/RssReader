import * as React from "react";
import { connect } from "react-redux";
import { Item, IItem} from "./Item";

interface IITemListProps {
    items: IItem[];
    dispatch: () => void;
}

const ItemList: React.SFC<IITemListProps> = ({ items, dispatch }) => {
    return (
        <div className="ItemList">
            <ul >
                {items.map((item, index) => <Item item={item} dispatch={dispatch} key={index}/>)}
            </ul>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.items
    };
};

export default connect(mapStateToProps)(ItemList);
