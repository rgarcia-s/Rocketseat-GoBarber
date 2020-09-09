import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 0 30px 40px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  height: 186px;
  width: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';

  margin: 24px 0;
`;

export const SignOutButton = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #ff1515;
  border-radius: 10px;
  margin-top: 12px;

  justify-content: center;
  align-items: center;
`;

export const SignOutButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 20px;
`;
