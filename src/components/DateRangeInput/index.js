import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

const DateRangeInput = ({ onRangeChanged }) => {

  const defaultDateFormat = "yyyy/MM/dd"

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  const updateStartDate = newStartDate => {
    setStartDate(newStartDate);

    var maxEndDate = moment(newStartDate).add(3, 'M');
    if (moment(endDate).isAfter(maxEndDate))
      setEndDate(maxEndDate).toDate();

    onRangeChanged({ startDate, endDate });

  }

  const updateEndDate = newEndDate => {
    setEndDate(newEndDate);

    var maxStartDate = moment(newEndDate).subtract(3, 'M');
    if (moment(startDate).isBefore(maxStartDate))
      setStartDate(maxStartDate.toDate());

    onRangeChanged({ startDate, endDate });
  }


  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={date => updateStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat={defaultDateFormat}
      />
      <DatePicker
        selected={endDate}
        onChange={date => updateEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat={defaultDateFormat}
      />
    </>
  );
}

DateRangeInput.propTypes = {
  onRangeChanged: PropTypes.func.isRequired
}

export default DateRangeInput;