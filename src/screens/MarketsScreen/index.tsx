import React, {useState, useEffect} from 'react'

import {
    ToastAndroid,
    StatusBar
} from 'react-native';

import {
    IMarket,
    IMarketPaginatedQuery,
    IMarketSubscription
} from '../../@types/Market';

import Market from './Market';


import {Container, Content, Loading} from './styles';

import {ApolloError, gql, useQuery, useSubscription} from '@apollo/client';

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


export default function MarketsScreen() {

    const [markets, setMarkets] = useState<IMarket[]>([]);
    const marketAddedSubscription = useSubscription<IMarketSubscription>(watchMarketAdded);

    const { loading } = useQuery<IMarketPaginatedQuery>(listMarketsQuery, {
        variables: {
            limit: 10,
            page: 1
        },
        onError: onError,
        onCompleted: onCompleted
    });

    useEffect(() => {
        const {name = '', id = 0} = marketAddedSubscription?.data?.marketAdded || {};
        setMarkets([...markets, {id, name}]);
    }, [marketAddedSubscription.data]);

    function onError(error: ApolloError) {
        ToastAndroid.show(error.message, ToastAndroid.BOTTOM);
    }

    function onCompleted(data: IMarketPaginatedQuery) {
        setMarkets(data.listMarket.rows);
    }

    function renderMarkets(markets?: IMarket[]) {
        return markets?.filter(market => market.name).map((market, index) => (
            <Market
                key={market.id}
                name={market.name}
                id={market.id}
                delay={index * 10}
            />
        ))
    }

    function renderLoading() {
        return (
            <Content> 
                <Loading color="#b3b3b3" size={40} /> 
            </Content>
        )
    }

    return (
        <Container>
            <StatusBar 
                barStyle="default"
            />
            {loading ? renderLoading() : renderMarkets(markets)}
        </Container>
    )
}
