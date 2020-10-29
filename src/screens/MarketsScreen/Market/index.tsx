import React from 'react'

interface IMarketProps {
    id: number;
    name: string;
    delay: number;
}

import {Container, Title} from './styles';

export default function Market({id, name, delay}: IMarketProps) {
    return (
        <Container
            animation="slideInLeft"
            delay={delay}
        >
            <Title>{`#${id} - ${name}`}</Title>
        </Container>
    )
}
