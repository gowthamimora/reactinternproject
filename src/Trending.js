import React from "react";
import { isEmpty } from 'lodash';

class Trending extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            repos: [],
            errorText: ''
        };
        this.dealWithResp = this.dealWithResp.bind(this);
        this.dealWithError = this.dealWithError.bind(this);
        this.dealWithBody = this.dealWithBody.bind(this);
    }

    dealWithResp(responseFromFetch) {
        if (responseFromFetch.status === 200) {
            return responseFromFetch.json();
        } else {
            return Promise.reject("Trending repositories not available");
        }
    }

    dealWithBody(responseBody) {
        this.setState({
            repos: responseBody
        });
        console.log(responseBody);
    }

    dealWithError(errorResponse) {
        this.setState({
            errorText: errorResponse
        });
        console.log(errorResponse);
    }

    componentDidMount () {
        fetch("https://ghapi.huchen.dev/developers?language=javascript&since=weekly")
            .then(this.dealWithResp)
            .then(this.dealWithBody)
            .catch(this.dealWithError)
    }

    render() {
        return (
            <div>
                { isEmpty(this.state.errorText) ? this.renderRepos(): <h1>{this.state.errorText}</h1> }
                { }
            </div>
        );
    }

    renderRepos() {
        return isEmpty(this.state.repos) ? <h1>Loading</h1> : <h1>{this.state.repos[0].username}</h1>;
    }
}

export default Trending;