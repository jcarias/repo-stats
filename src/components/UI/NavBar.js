import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../utils/AppTheme';
import { BarChart2 } from "react-feather"

const NavBar = ({ title, children }) => {
  return (
    <NavContainer>
      <NavTitle><BarChart2 size={"2rem"} /><span>{title}</span></NavTitle>
      {children && <NavItems>{children}</NavItems>}
    </NavContainer>
  );
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

const NavContainer = styled.nav`
  background-color: ${colors.defaultPrimaryColor};
  color: ${colors.textPrimaryColor};
  padding: 1em;
  display: flex;
  align-items:center;
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
`;

const NavTitle = styled.div`
  display: flex;
  align-items:center;
  flex:1;

  font-size: 1.75rem;
  font-weight:600;

  &>*+*{
    margin-left: 1rem;
  }
`;

const NavItems = styled.div`
   display: flex;
  align-items:center;
  &>*{
    margin-left: 1rem;
  }
`;

export default NavBar;
