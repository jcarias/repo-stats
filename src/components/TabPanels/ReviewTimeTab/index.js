import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { colors } from '../../../utils/AppTheme';
import CardKPI from '../../CardKPI';
import { TabContainer } from '../../UI/TabContainer';
import CustomTooltip from "./Tooltip";
import { getHumanDuration } from '../../../utils/StringUtils';

const dateTickFormatter = dateStr => moment(dateStr).format("MMM D");
const timeTickFormatter = seconds => moment.duration(seconds, "seconds").asHours().toFixed(0);

const ReviewTimeTab = ({ data }) => {

  // Extract data relevant for the char
  const reviewTimeData = data.calculated.filter(c => c.granularity === "day" && c.for.repositories.length > 1)[0].values.map(v =>
    (
      {
        date: v.date,
        "pr-review-time": +(v.values[0] || "").slice(0, -1),
        "pr-opened": v.values[1] || 0,
        reviewTimeByPr: +(v.values[0] || "").slice(0, -1) / (v.values[1] || 1),
      }
    ));

  // Compute Review time average
  const avgReviewTime = reviewTimeData.reduce((p, c) => (p + (c["pr-review-time"] || 0)), 0) / reviewTimeData.length;

  // Compute average review time / PR
  const avgReviewTimeByPR = avgReviewTime / reviewTimeData.reduce((p, c) => (p + (c["pr-opened"] || 0)), 0);

  return (
    <TabContainer>
      <div style={{ width: '75%', height: '53vh' }}>
        <ResponsiveContainer>
          <LineChart
            data={reviewTimeData}
            margin={{
              top: 35, right: 50, left: 50, bottom: 75,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-75} tickMargin={25} tickFormatter={dateTickFormatter} />
            <YAxis label={{ value: 'Review Time (Hours)', position: 'top', offset: 20 }} tickFormatter={timeTickFormatter} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: colors.lightPrimaryColorFade, strokeWidth: 3 }} />
            <ReferenceLine y={avgReviewTime} stroke={colors.accentColor} />
            <Line type="monotone" dataKey="pr-review-time" stroke={colors.defaultPrimaryColor} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <CardKPI
        title={"Average Review Time"}
        color={colors.accentColor}
        mainInfo={`${getHumanDuration(avgReviewTime)}`}>
        <span>{`(about ${moment.duration(avgReviewTimeByPR, "seconds").humanize()} / PR)`}</span>
      </CardKPI>

    </TabContainer>
  );
}

ReviewTimeTab.propTypes = {
  data: PropTypes.object.isRequired
}


export default ReviewTimeTab;