import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../utils/AppTheme';

const OpenPRChartTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <ToolTipContainer>
        <span className="main">{payload[0].value}<span>Pull Requests</span></span>
        <span className="label">{label}</span>
      </ToolTipContainer>
    );
  }

  return null;
};

OpenPRChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string
}

const ToolTipContainer = styled.div`
  background-color: rgba(255,255,255,0.95);
  border-radius: 8px;
  padding: 1em;
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
  color:${colors.primaryTextColor};
  
  .label, .main{
    display:block;
  }

  .main{
    font-size: 2rem;
    font-weight:500;
    span{
      margin-left:0.5em;
      font-size: 1rem
    }
  }
  
  
  .label{
    font-size: 0.75em;
    color:${colors.secondaryTextColor};
  }
  

`;
export default OpenPRChartTooltip;