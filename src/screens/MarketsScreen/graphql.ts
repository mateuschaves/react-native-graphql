import {gql} from '@apollo/client';

const listMarketsQuery = gql`
        query ListMarket ($page: Int!, $limit: Int!) {
            listMarket (page: $page, limit: $limit) {
                count,
                rows {
                    id,
                    name
                }
            }
        }
`;

const watchMarketAdded = gql`
  subscription MarketAdded {
    marketAdded {
      id
      name
    }
  }
`;

export {
    listMarketsQuery,
    watchMarketAdded
}