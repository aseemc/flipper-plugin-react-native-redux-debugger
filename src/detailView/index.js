import React, { memo } from 'react';

import { Header } from '../components';
import ActionView from './ActionView';
import StateView from './StateView';

const DetailView = (props) => {
  return (
    <>
      <ActionView {...props} />
      <StateView {...props} />
    </>
  )
}

export default DetailView;
