import styled from "styled-components/native";

export default function SettingsScreen() {
  return (
    <Container>
      <Row>
        <Text>통계</Text>
      </Row>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({theme}) => theme.background};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.Text`
  color: ${({theme}) => theme.text};
`;
