import React, { memo, useState } from 'react';
import {
  Panel,
  DataDescription,
  ManagedDataInspector,
  Tab,
  Tabs,
} from 'flipper';
import { TabsContainer } from '../components';
import { STATE_TABS, HEADER_TEXT } from '../constants';

const StateView = ({ nextState, prevState }) => {
  const [activeStateTab, setActiveStateTab] = useState(STATE_TABS.DIFF);

  return (
    <Panel floating={false} heading={HEADER_TEXT.STATE}>
      <TabsContainer>
        <Tabs
          defaultActive={STATE_TABS.DIFF}
          active={activeStateTab}
          onActive={(key) => setActiveStateTab(key)}
          >
          <Tab label={STATE_TABS.DIFF}>
            {
              typeof nextState !== 'object'
                ? <DataDescription type={typeof nextState} value={nextState} />
                : <ManagedDataInspector diff={prevState} data={nextState} expandRoot />
            }
          </Tab>
          <Tab label={STATE_TABS.CURRENT}>
            <ManagedDataInspector data={nextState} collapsed={true} expandRoot />
          </Tab>
        </Tabs>
      </TabsContainer>
    </Panel>
  )
}

export default StateView;
