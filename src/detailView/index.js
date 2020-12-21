import React, { memo } from 'react';

import { Header } from '../components';
import ActionView from './ActionView';
import StateView from './StateView';

const DetailView = (props) => {
  return (
    <>
      <Header>{props.action.type}</Header>
      <ActionView {...props} />
      <StateView {...props} />
    </>
  )
}

export default memo(DetailView);
