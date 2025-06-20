import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
  border: 0;
  padding: 0;
  overflow: auto;
`;

export const SubWrapper = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 95%;
`;

export const Content = styled.div`
  z-index: 1;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #efefef;
  overflow: auto;
`;
