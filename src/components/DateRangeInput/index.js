import Tippy from '@tippyjs/react/headless';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Info } from 'react-feather';

import styled from 'styled-components';
import { colors } from '../../utils/AppTheme';

const DateRangeInput = ({ onRangeChanged }) => {

  const defaultDateFormat = "yyyy/MM/dd"

  const [startDate, setStartDate] = useState(moment(new Date()).subtract(2, "months").toDate());
  const [endDate, setEndDate] = useState(new Date());


  const updateStartDate = newStartDate => {
    setStartDate(newStartDate);

    var maxEndDate = moment(newStartDate).add(3, 'M');

    if (moment(endDate).isAfter(maxEndDate))
      setEndDate(maxEndDate.toDate());

    if (moment(newStartDate).isValid()) {
      onRangeChanged({ startDate: newStartDate, endDate });
    }

  }

  const updateEndDate = newEndDate => {
    setEndDate(newEndDate);

    var maxStartDate = moment(newEndDate).subtract(3, 'M');
    if (moment(startDate).isBefore(maxStartDate))
      setStartDate(maxStartDate.toDate());

    if (moment(newEndDate).isValid()) {
      onRangeChanged({ startDate, endDate: newEndDate });
    }
  }

  const rangeValue = Math.abs(moment.duration(moment(startDate).diff(moment(endDate), "ms")).asDays()).toFixed(0);


  return (
    <Wrapper>

      <RangeContainer>

        <Title>
          <span> Search Range</span>
          <SelectedRangeInfo>Current range span: <span className="sel-range">{isNaN(rangeValue) ? "Invalid range" : `${rangeValue} days`}</span></SelectedRangeInfo>
        </Title>

        <FieldsContainer>
          <Field>
            <label>From</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => updateStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={endDate}
              dateFormat={defaultDateFormat}
              className={`${moment(startDate).isValid() ? "" : "invalid-value"}`}
            />
          </Field>

          <Field>
            <label>To</label>
            <DatePicker
              selected={endDate}
              onChange={date => updateEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat={defaultDateFormat}
              className={`${moment(endDate).isValid() ? "" : "invalid-value"}`}
            />
          </Field>
        </FieldsContainer >

        <div className="helper-info">
          <span>Change the dates to update display.</span>
          <Tippy inertia render={attrs => (
            <div className="tooltip" {...attrs}><strong>Note:</strong> the dates will adjust automatically to cover a <strong>maximum range of 3 months.</strong></div>
          )}>
            <Info color={colors.accentColor} size={"1.5em"} />
          </Tippy>
        </div>

      </RangeContainer>
    </Wrapper>
  );
}

DateRangeInput.propTypes = {
  onRangeChanged: PropTypes.func.isRequired
}


const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  padding-top: 1em;
  background-color: ${colors.backgroundColor};

  .react-datepicker{
    font-family: 'Manrope';
  }
`;
const RangeContainer = styled.div`
  display:flex;
  flex-direction: column;
  margin: auto;
  div.helper-info{
    display: flex;
    font-size: 0.8rem;
    font-weight: 500;
    color: #757575;
    max-width: 480px;

    &>*+*{
      margin-left: 1em;
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items:baseline;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight:500;
  border-bottom: 1px solid ${colors.dividerColor};
  padding-bottom: 0.5rem;

  `;

const SelectedRangeInfo = styled.div`
  font-size: 0.8rem;
  font-weight:400;
  color: ${colors.secondaryTextColor};
  span.sel-range{
    font-weight: 600;
  }
`

const FieldsContainer = styled.div`
  padding: 1rem 0;
  display:flex;
  align-items:flex-start;

  &>*+*{
    margin-left: 2rem;
  }
`;


const Field = styled.div`
    display: flex;
    align-items: baseline;

    input{
      margin-left: 1em;
      padding: 0.5rem 1rem;
      border: 1px solid ${colors.dividerColor};
      border-radius: 4px;
      font-family: "Manrope", sans-serif;
      font-weight: 500;
    }
    .invalid-value{
      border-color: red;
      box-shadow: inset 0 0px 4px 0px red;
    }
`;

export default DateRangeInput;