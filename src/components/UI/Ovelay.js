import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = ({ children }) => {
  return (
    <OverlayPanel>
      {children}
    </OverlayPanel>
  );
}

Overlay.propTypes = {
  children: PropTypes.node,
}

const OverlayPanel = styled.div`
  position: fixed; 
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  z-index:100;
  color: white;

  &>*{
    margin: 1em;
  }
`;

export default Overlay;