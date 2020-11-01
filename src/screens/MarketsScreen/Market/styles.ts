import styled from 'styled-components/native';

import * as Animatable from 'react-native-animatable';


export const Container = styled(Animatable.View)`
    height: 80px;
    justify-content: center;
    align-items: center;
    background-color: #212121;
    elevation: 2;
    border-radius: 8px;
    padding: 8px;
    margin: 15px 15px 7.5px 15px;
`;

export const Title = styled.Text`
    font-size: 16px;
    color: #b3b3b3;
    font-weight: bold;
`;
