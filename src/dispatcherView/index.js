import React, { memo, useState, useRef } from 'react';
import {
  Panel,
  Button,
} from 'flipper';
import brace from "brace";
import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/chrome";

import { Spacer, DispatchContainer } from '../components';
import { ACTION_TABS } from '../constants';

const DispatcherView = ({ action }) => {
  const [activeActionTab, setActiveActionTab] = useState(ACTION_TABS.ACTION);
  const [newAction, setNewAction] = useState(null);

  return (
    <Panel floating={false} heading='Dispatch Action' padded={false}>
      <DispatchContainer>
        <AceEditor
          mode="json"
          name="code"
          theme="chrome"
          width="100%"
          fontSize={12}
          onChange={setNewAction}
          editorProps={{
            $blockScrolling: true
          }}
          setOptions={{
            showLineNumbers: false,
          }}
        />
        <Spacer />
        <Button
          onClick={() => console.log('=>>>click')}
          type="primary"
          style={{ width: 200 }}
        >
          Dispatch
        </Button>
      </DispatchContainer>
    </Panel>
  )
}

export default memo(DispatcherView);
