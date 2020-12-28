import React, { useState } from 'react';
import { usePlugin, createState, useValue, Layout } from 'flipper-plugin';
import { DetailSidebar } from 'flipper';

import DetailView from './detailView';
import DispatcherView from './dispatcherView';
import InspectorView from './inspectorView';

const clientRef = React.createRef();

export const plugin = (client) => {
  const data = createState({}, { persist: 'data' });
  clientRef.current = client;

  client.onMessage('action', (newActionLog) => {
    data.update((draft) => {
      draft[newActionLog.id] = newActionLog;
    });
  });

  return { data };
}

export const Component = () => {
  const instance = usePlugin(plugin);
  const data = useValue(instance.data);
  const [detailViewRowId, setDetailViewRowId] = useState();

  const showDetailView = () => {
    if (detailViewRowId) {
      return <DetailView {...data[detailViewRowId]} />
    }

    return null;
  }

  return (
    <Layout.ScrollContainer vertical>
      <InspectorView
        client={clientRef.current}
        instance={instance}
        data={data}
        setDetailViewRowId={setDetailViewRowId}
      />
      <DetailSidebar width={400}>{showDetailView()}</DetailSidebar>
      <DispatcherView client={clientRef.current} />
    </Layout.ScrollContainer>
  );
}