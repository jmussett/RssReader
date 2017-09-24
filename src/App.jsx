import React, { Component } from 'react';
import { connect } from 'react-redux'
import FeedList from './components/FeedList'
import ItemList from './components/ItemList'
import ItemContent from './components/ItemContent'
import AddFeed from './components/AddFeed'

class App extends Component {
    render() {
        return (
            <div >
                <h1>RSS Reader</h1>
                <p>This is a basic RSS reader allows you to view the items and associated content of added RSS Feeds.</p>
                <p>It's built using React and Redux and utilises Mozilla's Readability.JS library to display the content.</p>
                <p>I've added some popular feeds to get you started.</p>

                {
                    !this.props.loading ? 
                    (
                        <div>
                            <AddFeed />
                            <div className='App'>
                                <FeedList />
                                <ItemList />
                                <ItemContent />
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.appLoading
    }
}

export default connect(mapStateToProps)(App);