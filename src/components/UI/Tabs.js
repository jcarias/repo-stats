import React, { useState } from 'react';
import styled from 'styled-components';



const TabControl = ({ tabs }) => {
  const [selTab, setSelTab] = useState(0)


  const handleTabChange = newSelTabIndex => {
    console.log(newSelTabIndex)
    setSelTab(newSelTabIndex);
  }

  return (
    <TabsWrapper>
      {tabs.map((tab, index) => (
        <Tab key={tab} className={index === selTab ? "selected" : ""} onClick={() => handleTabChange(index)}>
          {tab}
        </Tab>
      ))}
    </TabsWrapper>
  );
}

const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid gray;

   & > *+*{
     margin-left: 1em;
   }
`

const Tab = styled.a`
  display: flex;
  border: 1px solid gray;
  border-bottom: none;
  padding: 1em 2em;
  transition: all 200ms ease-out;
  border-radius: 8px 8px 0 0;
  background-color: whitesmoke;

  &:hover{
    background-color: white;
    cursor: pointer;
  }


  &.selected{
    background-color: white;
    transform: translateY(1px);
  }
`

export default TabControl;