import styled from "styled-components/native";

export default function SettingsScreen() {
  return (
    <Container>
      <Row>
        <text>통계</text>
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
