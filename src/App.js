import React, { useState } from 'react';
import moment from 'moment';
import DateRangeInput from './components/DateRangeInput';
import OpenPRTab from './components/TabPanels/OpenPRTab';
import ReviewTimeTab from './components/TabPanels/ReviewTimeTab';
import Overlay from './components/UI/Ovelay';
import TabControl from './components/UI/Tabs';
import { useApiCall } from './utils/hooks/useApiCall';
import NavBar from './components/UI/NavBar';
import { GitHub } from 'react-feather';
import { colors } from './utils/AppTheme';
import styled from 'styled-components';
import Loader from './components/UI/Loader';


const options = {
  method: 'POST',
  mode: 'cors',
  cache: 'default',
};

const defaultRequestBody = {
  "for": [
    {
      "repositories": [
        "github.com/athenianco/athenian-api",
        "github.com/athenianco/athenian-webapp",
        "github.com/athenianco/infrastructure",
        "github.com/athenianco/metadata"
      ],
      "repogroups": [[0], [1], [2], [3]]
    }, {
      "repositories": [
        "github.com/athenianco/athenian-api",
        "github.com/athenianco/athenian-webapp",
        "github.com/athenianco/infrastructure",
        "github.com/athenianco/metadata"
      ]
    }
  ],
  "metrics": [
    "pr-review-time",
    "pr-opened"
  ],
  "date_from": "2020-06-01",
  "date_to": "2020-09-01",
  "granularities": [
    "all",
    "day"
  ],
  "exclude_inactive": true,
  "account": 1,
  "timezone": 60

};


function App() {
  const [dateRangeFilter, setDateRangeFilter] = useState(
    {
      startDate: moment(new Date()).subtract(2, "months").toDate(),
      endDate: new Date()
    }
  );
  const [selTab, setSelTab] = useState(0)

  const { data, error, loading } = useApiCall('https://api.athenian.co/v1/metrics/prs', {
    ...options,
    body: JSON.stringify({ ...defaultRequestBody, "date_from": dateRangeFilter.startDate, "date_to": dateRangeFilter.endDate })
  });
  console.log(dateRangeFilter);

  return (
    <div>
      <NavBar title={"Simple Repo Stats"}>
        <a href="https://github.com/jcarias/repo-stats" target="_blank" rel="noreferrer"><GitHub color={colors.textPrimaryColor} /></a>
      </NavBar>
      <DateRangeInput onRangeChanged={setDateRangeFilter} />
      <TabControl tabs={["PR Review Time", "PRs Opened"]} selTab={selTab} handleTabChange={setSelTab}></TabControl>
      <TabPanel className={`${loading ? "loading" : ""}`}>
        {loading && (
          <Overlay >
            <span>Please wait...</span>
            <Loader size={64} />
          </Overlay>
        )}
        {error && <div>Oops! something went wrong...</div>}
        {data && selTab === 0 && <div><ReviewTimeTab data={data}></ReviewTimeTab></div>}
        {data && selTab === 1 && <div><OpenPRTab data={data}></OpenPRTab></div>}
      </TabPanel>
    </div>
  );
}

const TabPanel = styled.div`
  background-color: white;
  .loading{
    filter: blur(3px);
  }
`;




export default App;
