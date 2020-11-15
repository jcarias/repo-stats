import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../utils/AppTheme';
import { getHumanDuration } from '../../../utils/StringUtils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <ToolTipContainer>
        <div className="top-section">
          <div>
            <span className="label">Review time</span>
            <span className="main">{getHumanDuration(payload[0].value)}</span>
          </div>
          <div className="counter">
            {`${payload[0].payload["pr-opened"]} PRs`}
          </div>
        </div>
        <span className="aux">{label}</span>
      </ToolTipContainer>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string
}

export default CustomTooltip;


const ToolTipContainer = styled.div`
  background-color: rgba(255,255,255,0.95);
  border-radius: 8px;
  padding: 1em;
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
  color:${colors.primaryTextColor};
  

  .top-section{
    display: flex;
    align-items: baseline;

    .label, .main, .aux{
      display:block;
    }
    .main{
      font-weight: 600;
    }
    
    .label{
      font-size: 0.75em;
      opacity: 0.9;
    }

    .counter{
      font-size: 0.65em;
      font-weight: 700;
      background-color: ${colors.dividerColor};
      padding: 0.5em 1em;
      margin-left: 3em;
      border-radius: 4px;
      color: ${colors.textPrimaryColor};
      flex: 0;
      white-space:nowrap;
    }
  }

  
  .aux{
    margin-top: 1em;
    font-size: 0.8em;
    color:${colors.secondaryTextColor};
  }

`;