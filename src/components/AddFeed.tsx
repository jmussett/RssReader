import * as React from "react";
import { connect } from "react-redux";
import { addFeed, IRootAction } from "../actions";
import { IRootState } from "../state";
import { Dispatch } from "redux";

interface IAddFeedProps {
    loading: boolean;
    dispatch: Dispatch<IRootAction>;
}

const AddFeed: React.SFC<IAddFeedProps> = ({ loading, dispatch }) => {
    let input: HTMLInputElement | null;

    const handleAddFeed = () => {
        if (input != null) {
            dispatch(addFeed(input.value)); input.value = "";
        }
    };

    return (
        <div className="AddFeed">
            <span>
                <input ref={node => { input = node; }}/>
                <button onClick={handleAddFeed}>Add Feed</button>
                {loading ? "Loading..." : ""}
            </span>
        </div>
    );
};

const mapStateToProps = (state: IRootState) => ({
    loading: state.feedLoading,
});

export default connect(mapStateToProps)(AddFeed);
