import * as React from "react";
import { connect } from "react-redux";
import { addFeed } from "../actions";

interface IAddFeedProps {
    loading: boolean;
    dispatch: (action: any) => void;
}

const AddFeed: React.SFC<IAddFeedProps> = ({ loading, dispatch }) => {
    let input: any;

    const handleAddFeed = () => { dispatch(addFeed(input.value)); input.value = ""; };

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

const mapStateToProps = (state: any) => {
    return {
        loading: state.feedloading
    };
};

export default connect(mapStateToProps)(AddFeed);
