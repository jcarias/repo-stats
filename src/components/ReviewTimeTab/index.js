import moment from 'moment';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Label, } from 'recharts';
import styled from 'styled-components';
import CardKPI from '../CardKPI';


const ReviewTimeTab = ({ data }) => {

  // Extract data relevant for the char
  const reviewTimeData = data.calculated.filter(c => c.granularity === "day" && c.for.repositories.length > 1)[0].values.map(v =>
    (
      { date: v.date, "pr-review-time": +(v.values[0] || "").slice(0, -1), "pr-opened": v.values[1] || 0 }
    ))

  const avgReviewTime = reviewTimeData.reduce((p, c) => (p + (c["pr-review-time"] || 0)), 0) / reviewTimeData.length;


  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <ToolTipContainer>
          <span className="label">Review time</span>
          <span className="main">{moment.duration(payload[0].value, "seconds").humanize()}</span>
          <span className="aux">{`${label} (${payload[0].payload["pr-opened"]} PRs)`}</span>
        </ToolTipContainer>
      );
    }

    return null;
  };


  return (
    <TabContainer>

      <div style={{ width: '75%', height: '50vh' }}>
        <ResponsiveContainer>
          <LineChart
            data={reviewTimeData}
            margin={{
              top: 20, right: 50, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tick={false} >
              <Label value="Review time" offset={5} position="top" />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={avgReviewTime} stroke="red" />
            <Line type="monotone" dataKey="pr-review-time" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <CardKPI
        title={"Average"}
        color="red"
        mainInfo={moment.duration(avgReviewTime, "seconds").humanize()}>
        <span>{`(${Math.round(moment.duration(avgReviewTime, "seconds").asSeconds())} seconds)`}</span>
      </CardKPI>



    </TabContainer>
  );
}

const TabContainer = styled.div`
display:flex;
padding: 2em 3em;
align-items: center;
`


const ToolTipContainer = styled.div`
  background-color: rgba(255,255,255,0.95);
  border-radius: 8px;
  padding: 1em;
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);

  .label, .main, .aux{
    display:block;
  }

  .label{
    font-size: 0.75em;
    opacity: 0.5;
  }

  .aux{
    margin-top: 1em;
    font-size: 0.8em;
    opacity: 0.7;
  }

`;



export default ReviewTimeTab;