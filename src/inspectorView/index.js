import React, { useState } from 'react';
import { Text, SearchableTable, Button, Panel } from 'flipper';
import moment from 'moment';

import { COLUMN_SIZE, COLUMNS, APP_ID, HEADER_TEXT } from '../constants';

export const InspectorView = ({ client, instance, data, setDetailViewRowId }) => {
  const [selectedIds, setSelectedIds] = useState();

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

  const clearData = () => {
    setDetailViewRowId();
    setSelectedIds();
    instance.data.set({});
  };

  const handleRowHighlighted = (rowIds) => {
    if (rowIds && rowIds.length === 1) {
      setDetailViewRowId(rowIds[0]);
    } else {
      setDetailViewRowId();
    }

    setSelectedIds(rowIds);
  };

  const handleActionReplay = async () => {
    try {
      const sortedActions = selectedIds.sort();
      const actions = sortedActions.map(id => data[id].action);
      await client.send('dispatch', actions);
    } catch (error) {
      alert('Invalid action replay');
    }
  }

  return (
    <Panel floating={false} heading={HEADER_TEXT.INSPECTOR} padded={false} style={{ flex: 1 }}>
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
        actions={(
          <>
            <Button onClick={clearData}>Clear</Button>
            <Button onClick={handleActionReplay} disabled={!selectedIds}>Action Replay</Button>
          </>
        )}
        multiHighlight
      />
    </Panel>
  );
}

export default InspectorView;