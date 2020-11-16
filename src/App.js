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




function App() {
  const [dateRangeFilter, setDateRangeFilter] = useState(
    {
      startDate: moment(new Date()).subtract(2, "months").toDate(),
      endDate: new Date()
    }
  );
  const [selTab, setSelTab] = useState(0)

  const { data, error, loading } = useApiCall(dateRangeFilter.startDate.getTime(), dateRangeFilter.endDate.getTime());

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
        {error && (
          <div className="error">
            <div>Oops! something went wrong...</div>
            <span className="help-message">Please check you internet connection. If your connection is ok, please try again later.</span>
          </div>
        )}
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

  .error{
    margin: 3em auto;
    color: hsl(0deg 50% 50%);
    max-width: 50%;
    .help-message{
      font-size: 0.8em;
      font-weight: 500;
      color: ${colors.secondaryTextColor};
    }
  }
`;




export default App;
