import React from 'react';
import styled from 'styled-components';

const CardKPI = ({ color = "inherit", title, mainInfo, children }) => {
  return (
    <KpiContainer>
      <KpiTitle textColor={color}>{title}</KpiTitle>
      <KpiContents >
        <KpiMainInfo>{mainInfo}</KpiMainInfo>
        {children && <KpiAuxInfo>{children}</KpiAuxInfo>}
      </KpiContents>
    </KpiContainer>
  );
}

const KpiContainer = styled.div`
  display:flex;
  flex-flow:column nowrap;
  align-items:stretch;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
`;

const KpiTitle = styled.span`
  padding: 1em 2em;
  color: ${({ textColor }) => textColor};
  border-bottom: 1px solid whitesmoke;
  text-align:center;
`;

const KpiContents = styled.div`
  display:flex;
  flex-flow:column nowrap;
  align-items: center;
  padding: 2em 2em;
`;

const KpiMainInfo = styled.div`
  padding: 0;
  font-weight:600;
`;

const KpiAuxInfo = styled.div`
  padding: 0;
  font-size:0.75em;
  opacity: 0.6;
`;

export default CardKPI;