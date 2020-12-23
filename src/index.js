import React, { useState } from 'react';
import { usePlugin, createState, useValue, Layout } from 'flipper-plugin';
import { Text, SearchableTable, Button, DetailSidebar, Panel } from 'flipper';
import moment from 'moment';

import DetailView from './detailView';
import { Header, MainContainer } from './components';
import { COLUMN_SIZE, COLUMNS, APP_ID } from './constants';
import { formatTimestamp } from './utils';
import DispatcherView from './dispatcherView';

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

export const Component = (props) => {
  const [selectedRow, setSelectedRow] = useState({});
  const instance = usePlugin(plugin);
  const data = useValue(instance.data);

  const buildRow = (row) => {
    const { id, requestTime, action: { type }, duration } = row;
    return {
      columns: {
        timestamp: {
          value: <Text style={{ color: 'grey' }}>{moment(requestTime).format('HH:mm:ss.SSS')}</Text>,
          filterValue: requestTime
        },
        actionType: {
          value: <Text>{type}</Text>,
          filterValue: type
        },
        time: {
          value: <Text>{duration}</Text>,
          filterValue: duration
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
      <Panel floating={false} heading='Inspector' padded={false} style={{ flex: 1 }}>
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
          actions={(<Button onClick={clearData}>Clear</Button>)}
        />
      </Panel>
      
      <DetailSidebar>{showDetailView()}</DetailSidebar>
      <DispatcherView client={clientRef.current} />
    </Layout.ScrollContainer>
  );
}