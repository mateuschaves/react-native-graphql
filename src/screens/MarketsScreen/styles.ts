import styled from 'styled-components/native';

import {ActivityIndicator, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
`;


export const Content = styled.View`
  flex: 1;
  height: ${height}px;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled(ActivityIndicator)`
  align-self: center;
`;