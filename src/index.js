import React, { useState } from 'react';
import { usePlugin, createState, useValue, Layout, styled } from 'flipper-plugin';
import { Text, SearchableTable, Button, DetailSidebar } from 'flipper';
import DetailView from './detailView';
import { MainContainer } from './components';
import { COLUMN_SIZE, COLUMNS, APP_ID } from './constants';
import { formatTimestamp } from './utils';
import DispatcherView from './dispatcherView';

export const plugin = (client) => {
  const data = createState({}, { persist: 'data' });

  client.onMessage('action', (newActionLog) => {
    data.update((draft) => {
      draft[newActionLog.id] = newActionLog;
    });
  });

  client.onDestroy(() => {
    data.set({});
  });

  return { data };
}

export const Component = (props) => {
  const [selectedRow, setSelectedRow] = useState({});
  const instance = usePlugin(plugin);
  const data = useValue(instance.data);

  const buildRow = (row) => {
    const { id, timestamp, action: { type }, executionTime } = row;
    return {
      columns: {
        timestamp: {
          value: <Text>{formatTimestamp(timestamp)}</Text>,
          filterValue: timestamp
        },
        actionType: {
          value: <Text>{type}</Text>,
          filterValue: type
        },
        time: {
          value: <Text>{executionTime}</Text>,
          filterValue: executionTime
        }
      },
      key: id,
      copyText: JSON.stringify(row),
      filterValue: type
    }
  }

  const clearData = () => instance.data.set({});

  const handleRowHighlighted = (rowId) => setSelectedRow(data[rowId]);

  const showDetailView = () => {
    if (Object.keys(selectedRow).length) {
      return <DetailView {...selectedRow} />
    }

    return null;
  }

  return (
    <Layout.ScrollContainer vertical>
      <SearchableTable
        key={APP_ID}
        rowLineHeight={28}
        floating={false}
        multiline
        columnSizes={COLUMN_SIZE}
        columns={COLUMNS}
        onRowHighlighted={handleRowHighlighted}
        rows={Object.values(data).map(buildRow)}
        stickyBottom
        actions={(<Button onClick={clearData}>🗑️ Clear</Button>)}
      />
      <DetailSidebar>{showDetailView()}</DetailSidebar>
      <DispatcherView />
    </Layout.ScrollContainer>
  );
}