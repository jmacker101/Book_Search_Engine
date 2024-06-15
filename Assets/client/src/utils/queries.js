import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Luke {
        person @rest(type: "Person", path: "people/1/") {
            name
        }
    }
`;
