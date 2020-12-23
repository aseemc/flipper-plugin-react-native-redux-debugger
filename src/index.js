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
  const [selectedRow, setSelectedRow] = useState({});
  const instance = usePlugin(plugin);
  const data = useValue(instance.data);

  const handleRowHighlighted = (rowId) => setSelectedRow(data[rowId]);

  const showDetailView = () => {
    if (Object.keys(selectedRow).length) {
      return <DetailView {...selectedRow} />
    }

    return null;
  }

  return (
    <Layout.ScrollContainer vertical>
      <InspectorView instance={instance} handleRowHighlighted={handleRowHighlighted} />
      <DetailSidebar>{showDetailView()}</DetailSidebar>
      <DispatcherView client={clientRef.current} />
    </Layout.ScrollContainer>
  );
}