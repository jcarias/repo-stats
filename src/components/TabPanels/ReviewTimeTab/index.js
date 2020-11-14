import moment from 'moment';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { colors } from '../../../utils/AppTheme';
import CardKPI from '../../CardKPI';
import { TabContainer } from '../../UI/TabContainer';
import CustomTooltip from './Tooltip';

const dateTickFormatter = dateStr => moment(dateStr).format("MMM D");
const timeTickFormatter = seconds => moment.duration(seconds, "seconds").humanize();

const ReviewTimeTab = ({ data }) => {

  // Extract data relevant for the char
  const reviewTimeData = data.calculated.filter(c => c.granularity === "day" && c.for.repositories.length > 1)[0].values.map(v =>
    (
      {
        date: v.date,
        "pr-review-time": +(v.values[0] || "").slice(0, -1),
        "pr-opened": v.values[1] || 0
      }
    ));

  // Compute Review time average
  const avgReviewTime = reviewTimeData.reduce((p, c) => (p + (c["pr-review-time"] || 0)), 0) / reviewTimeData.length;


  return (
    <TabContainer>
      <div style={{ width: '75%', height: '53vh' }}>
        <ResponsiveContainer>
          <LineChart
            data={reviewTimeData}
            margin={{
              top: 35, right: 50, left: 40, bottom: 75,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-75} tickMargin={50} tickFormatter={dateTickFormatter} />
            <YAxis label={{ value: 'Review Time', position: 'top', offset: 20 }} tickFormatter={timeTickFormatter} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={avgReviewTime} stroke={colors.accentColor} />
            <Line type="monotone" dataKey="pr-review-time" stroke={colors.defaultPrimaryColor} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <CardKPI
        title={"Average"}
        color={colors.accentColor}
        mainInfo={moment.duration(avgReviewTime, "seconds").humanize()}>
        <span>{`(${Math.round(moment.duration(avgReviewTime, "seconds").asSeconds())} seconds)`}</span>
      </CardKPI>

    </TabContainer>
  );
}



export default ReviewTimeTab;