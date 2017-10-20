import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "./state";
import FeedList from "./components/FeedList";
import ItemList from "./components/ItemList";
import ItemContent from "./components/ItemContent";
import AddFeed from "./components/AddFeed";

interface IAppProps {
    loading: boolean;
}

const App: React.SFC<IAppProps> = ({ loading }) => {
    const renderContent = () => {
        if (!loading) {
            return (
                <div>
                    <AddFeed />
                    <div className="App">
                        <FeedList />
                        <ItemList />
                        <ItemContent />
                    </div>
                </div>
            );
        }

        return "";
    };

    return (
        <div >
            <h1>RSS Reader</h1>
            <p>This is a basic RSS reader allows you to view the items and associated content of added RSS Feeds.</p>
            <p>It's built using React and Redux and utilises Mozilla's Readability.JS library to display the content.</p>
            <p>I've added some popular feeds to get you started.</p>
            {renderContent()}
        </div>
    );
};

const mapStateToProps = (state: IRootState) => ({
    loading: state.appLoading,
});

export default connect(mapStateToProps)(App);
