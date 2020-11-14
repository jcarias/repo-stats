import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { subStringAfterChar } from '../../../utils/StringUtils';
import { TabContainer } from '../../UI/TabContainer';
import OpenPRChartTooltip from './OpenPRChartTooltip';


const getColor = (index, numberOfRepos) => `hsl(${(360 / numberOfRepos) * index}, 75%, 80%)`;


const OpenPRTab = ({ data }) => {
  const chartData = data.calculated.filter(c => c.granularity === "all" && c.for.repositories.length === 1).map(v => (
    {
      repository: v.for.repositories[0],
      "pr-review-time": +(v.values[0].values[0] || "").slice(0, -1),
      "pr-opened": (v.values[0].values[1] || 0),
    }
  ));

  return (
    <TabContainer>
      <div style={{ width: '75%', height: '50vh' }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{
              top: 35, right: 30, left: 60, bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="pr-opened" label={{ value: 'PRs Created', position: 'top', offset: 20 }} />
            <XAxis dataKey="repository"
              label={{ value: 'Repositories', position: 'insideBottom', offset: -35 }}
              tickFormatter={(v) => subStringAfterChar(v, "/")} />
            <Tooltip content={<OpenPRChartTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="pr-opened" >
              {
                chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(index, 4)} />
                ))
              }
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </TabContainer>
  );
}




export default OpenPRTab;