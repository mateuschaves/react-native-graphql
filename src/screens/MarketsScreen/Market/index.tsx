import React from 'react'

interface IMarketProps {
    id: number;
    name: string;
    duration: number;
}

import {Container, Title} from './styles';

export default function Market({id, name, duration}: IMarketProps) {
    return (
        <Container
            animation="slideInLeft"
            duration={duration}
        >
            <Title>{`#${id} - ${name}`}</Title>
        </Container>
    )
}
