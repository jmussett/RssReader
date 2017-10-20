import * as React from "react";
import { connect } from "react-redux";

interface IItemContentProps {
    loading: boolean;
    invalid: boolean;
    title: string;
    content: string;
}

const ItemContent: React.SFC<IItemContentProps> = ({ loading, invalid, title, content }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (invalid) {
        return <div>Unable to process content. Please select another item.</div>;
    }

    if (!title) {
        return (
            <div className="ItemContent">
                <h1>Welcome to my RSS Reader</h1>
                <p style={{textAlign: "center"}}>Please select a feed item to get started.</p>
            </div>
        );
    }

    return (
        <div className="ItemContent">
            <article>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        loading: state.content.loading,
        invalid: state.content.invalid,
        title: state.content.title,
        content: state.content.content
    };
};

export default connect(mapStateToProps)(ItemContent);
