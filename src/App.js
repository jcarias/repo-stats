import React from 'react';
import DateRangeInput from './components/DateRangeInput';
import TabControl from './components/UI/Tabs';

function App() {

  const handleRangeChanged = range => console.log(range);

  return (
    <div><p>Hello World</p>
      <DateRangeInput onRangeChanged={handleRangeChanged} />
      <TabControl tabs={["Tab 1", "Tab2"]}></TabControl>
    </div>
  );
}

export default App;
