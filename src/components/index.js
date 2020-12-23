import { styled } from 'flipper-plugin';
import { Text } from 'flipper';

export const Header = styled(Text)({
  fontSize: 20,
  padding: 10,
  fontWeight: 'bold',
});

export const TabsContainer = styled.div({
  paddingTop: 10,
  paddingBottom: 10,
  display: 'flex',
  flex: 1,
});

export const Spacer = styled.div({
  height: 20,
  width: '100%'
});

export const DispatchContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: 250,
  width: '100%',
});