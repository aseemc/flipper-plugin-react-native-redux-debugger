import React, { memo, useState, useRef } from 'react';
import {
  Panel,
  Button,
} from 'flipper';
import "brace";
import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/chrome";

import { Spacer, DispatchContainer } from '../components';
import { validateJson } from '../utils';

const DispatcherView = ({ client }) => {
  const [newAction, setNewAction] = useState({});

  const handleDispatch = async () => {
    const validJson = validateJson(newAction);
    if (validJson) {
      await client.send('dispatch', validJson);
    } else {
      alert('Invalid action.')
    }
  }

  return (
    <Panel floating={false} heading='Dispatcher' padded={false}>
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
          onClick={handleDispatch}
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
