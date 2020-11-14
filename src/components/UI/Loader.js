import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader as Spinner } from 'react-feather';
const Loader = ({ size = 32 }) => {
  return (
    <LoaderContainer>
      <Spinner className="spinner" size={size} color="white" />
    </LoaderContainer>
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;


const LoaderContainer = styled.div`
  .spinner{
    animation: ${rotate} 1s ease-in-out infinite;
  }
`;
export default Loader;
