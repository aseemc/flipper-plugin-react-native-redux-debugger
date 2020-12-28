import React, { memo } from 'react';
import { Panel, ManagedDataInspector } from 'flipper';
import { HEADER_TEXT } from '../constants';

const ActionView = ({ action }) => (
  <Panel floating={false} heading={HEADER_TEXT.ACTION}>
    <ManagedDataInspector data={action} collapsed={true} expandRoot />
  </Panel>
)

export default ActionView;
