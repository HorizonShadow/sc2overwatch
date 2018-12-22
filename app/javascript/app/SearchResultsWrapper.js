import React from 'react';
import {graphql} from "react-apollo";
import SearchResults from "./components/SearchResults";
import gql from "graphql-tag";

const GET_QUERY = gql`
    {
        q @client
        searchOpen @client
    }    
`;

@graphql(GET_QUERY)
class SearchResultsWrapper extends React.Component {
    render() {
        const { data: { q, searchOpen } } = this.props;
        if(q.length === 0 || !searchOpen) return null;
        return(
            <SearchResults query={q} />
        )
    }
}

export default SearchResultsWrapper;
