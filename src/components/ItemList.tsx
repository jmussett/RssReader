import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IItem, IRootState } from "../state";
import { IRootAction } from "../actions";
import Item from "./Item";

interface IITemListProps {
    items: IItem[];
    dispatch: Dispatch<IRootAction>;
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

const mapStateToProps = (state: IRootState) => ({
    items: state.items,
});

export default connect(mapStateToProps)(ItemList);
