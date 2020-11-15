import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../utils/AppTheme';


const TabControl = ({ tabs, selTab, handleTabChange }) => {

  return (
    <TabsWrapper>
      {tabs && tabs.map && tabs.map((tab, index) => (
        <Tab key={tab} className={index === selTab ? "selected" : ""} onClick={() => handleTabChange(index)}>
          {tab}
        </Tab>
      ))}
    </TabsWrapper>
  );
}

const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.dividerColor};
  justify-content: center;
  padding-top: 3em;
   background-color: ${colors.backgroundColor};

   & > *+*{
     margin-left: 1em;
   }
`

const Tab = styled.a`
  display: flex;
  border: 1px solid  ${colors.dividerColor};
  border-bottom: none;
  padding: 0.5em 2em;
  transition: all 200ms ease-out;
  border-radius: 8px 8px 0 0;
  background-color: whitesmoke;
  font-size: 1.25em;
  color: ${colors.darkPrimaryColor};
  
  &:hover{
    background-color: white;
    cursor: pointer;
  }
  
  
  &.selected{
    background-color: white;
    transform: translateY(1px);
    color: ${colors.defaultPrimaryColor};
  }
`

TabControl.propTypes = {
  tabs: PropTypes.array.isRequired,
  selTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired
}

export default TabControl;