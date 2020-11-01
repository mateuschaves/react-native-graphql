import React, {useState, useEffect} from 'react'

import {
    StatusBar,
    FlatList
} from 'react-native';

import {
    IMarket,
    IMarketPaginatedQuery,
    IMarketSubscription
} from '../../@types/Market';

import Market from './Market';

import { 
    listMarketsQuery,
    watchMarketAdded
} from './graphql';

import {Container, Content, Loading} from './styles';

import {useSubscription, useQuery} from '@apollo/client';


export default function MarketsScreen() {

    const [markets, setMarkets] = useState<IMarket[]>([]);
    const marketAddedSubscription = useSubscription<IMarketSubscription>(watchMarketAdded);

    const {loading} = useQuery<IMarketPaginatedQuery>(listMarketsQuery, {
        onCompleted: onCompleted,
        variables: {
            page: 1,
            limit: 5
        }
    });

    useEffect(() => {
        const {name = '', id = 0} = marketAddedSubscription?.data?.marketAdded || {};
        setMarkets([...markets, {id, name}]);
    }, [marketAddedSubscription.data]);

    function onCompleted(data: IMarketPaginatedQuery) {
        setMarkets([...markets, ...data.listMarket.rows]);
    }

    function renderMarkets(markets?: IMarket[]) {
        return <FlatList
                    data={markets?.filter(market => market.name)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) =>  
                        <Market
                            name={item.name}
                            id={item.id}
                            duration={(index + 1) * 20}
                        />}
                />
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
