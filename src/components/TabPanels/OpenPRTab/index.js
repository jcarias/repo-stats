import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import styled from 'styled-components';
import { colors } from '../../../utils/AppTheme';
import { subStringAfterChar } from '../../../utils/StringUtils';
import CardKPI from '../../CardKPI';
import { TabContainer } from '../../UI/TabContainer';
import OpenPRChartTooltip from './OpenPRChartTooltip';


const getColor = (index, numberOfRepos) => `hsl(${(360 / numberOfRepos) * index}, 75%, 80%)`;


const OpenPRTab = ({ data }) => {

  // Extract chart data from API returned data
  const chartData = data.calculated.filter(c => c.granularity === "all" && c.for.repositories.length === 1).map(v => (
    {
      repository: v.for.repositories[0],
      "pr-review-time": +(v.values[0].values[0] || "").slice(0, -1),
      "pr-opened": (v.values[0].values[1] || 0),
    }
  ));

  // Compute average PRs/Repo
  const avgPRsByRepo = +(chartData.reduce((prev, curr) => prev + curr["pr-opened"], 0) / chartData.length).toFixed(2);


  return (
    <TabContainer>
      <div style={{ width: '75%', height: '53vh' }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{
              top: 35, right: 50, left: 60, bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="pr-opened" label={{ value: 'PRs Created', position: 'top', offset: 20 }} />
            <XAxis dataKey="repository"
              label={{ value: 'Repositories', position: 'insideBottom', offset: -35 }}
              tickFormatter={(v) => subStringAfterChar(v, "/")} />
            <Tooltip content={<OpenPRChartTooltip />} cursor={{ fill: colors.lightPrimaryColorFade }} />
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
      <CardKPI
        title={"Average"}
        color={colors.defaultPrimaryColor}
        mainInfo={<MainKPIInfo>{avgPRsByRepo} <span>PRs/day</span></MainKPIInfo>}>
      </CardKPI>
    </TabContainer>
  );
}


const MainKPIInfo = styled.div`
  font-size: 2rem;
  font-weight: 500;
  span{
    font-size: 1rem;
    font-weight: 300;
  }
`;



export default OpenPRTab;