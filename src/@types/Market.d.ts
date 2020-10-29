interface IMarket {
    id: number;
    name: string;
}

interface IMarketPaginatedQuery {
    listMarket: {
        rows: IMarket[];
        count: number;
        page: number;
    }
}

interface IMarketSubscription {
    marketAdded: {
        id: number;
        name: string;
    }
}

export  {
    IMarket,
    IMarketSubscription,
    IMarketPaginatedQuery,
}