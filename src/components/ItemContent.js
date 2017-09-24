import React, { Component } from 'react';
import { connect } from 'react-redux'


class ItemContent extends Component {
    render() {
        if (this.props.loading) {
            return <div>Loading...</div>
        }

        if (this.props.invalid) {
            return <div>Unable to process content. Please select another item.</div>
        }

        if (!this.props.title){
            return (
                <div className="ItemContent">
                    <h1>Welcome to my RSS Reader</h1>
                    <p style={{textAlign: 'center'}}>Please select a feed item to get started.</p>
                </div>
            )
        }

        return (
            <div className="ItemContent">
                <article>
                    <h1>{this.props.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
                </article>
            </div>
        )
    }
}

export default connect(state => state.content)(ItemContent);