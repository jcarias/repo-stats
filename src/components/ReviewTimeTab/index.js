import moment from 'moment';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, } from 'recharts';
import styled from 'styled-components';


const ReviewTimeTab = ({ data }) => {

  // Extract data relevant for the char
  const reviewTimeData = data.calculated.filter(c => c.granularity === "day" && c.for.repositories.length > 1)[0].values.map(v =>
    (
      { date: v.date, "pr-review-time": +(v.values[0] || "").slice(0, -1), "pr-opened": v.values[1] || 0 }
    ))

  const avgReviewTime = reviewTimeData.reduce((p, c) => (p + c["pr-review-time"]), 0) / reviewTimeData.length;





  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      console.log(payload);
      return (
        <ToolTipContainer>
          <span className="label">Review time</span>
          <span className="main">{moment.duration(payload[0].value, "seconds").humanize()}</span>
          <span className="aux">{`${label} (${5} PRs)`}</span>
        </ToolTipContainer>
      );
    }

    return null;
  };


  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart

          data={reviewTimeData}
          margin={{
            top: 20, right: 50, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />

          <YAxis axisLine />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={avgReviewTime} stroke="red" />
          <Line type="monotone" dataKey="pr-review-time" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


const ToolTipContainer = styled.div`
  background-color: rgba(255,255,255,0.9);
  border: 1px solid whitesmoke;
  padding: 1em;

  .label, .main, .aux{
    display:block;
  }

  .label{
    font-size: 0.75em;
    opacity: 0.75;
  }

  .aux{
    margin-top: 1em;
    font-size: 0.8em;
    opacity: 0.5;
  }

`;



export default ReviewTimeTab;