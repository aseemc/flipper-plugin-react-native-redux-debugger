import React, { memo } from 'react';
import { Panel, ManagedDataInspector } from 'flipper';

const ActionView = ({ action }) => (
  <Panel floating={false} heading='Action'>
    <ManagedDataInspector data={action} collapsed={true} expandRoot />
  </Panel>
)

export default memo(ActionView);
