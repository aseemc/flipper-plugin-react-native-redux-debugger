import React from 'react';
import { useValue } from 'flipper-plugin';
import { Text, SearchableTable, Button, Panel } from 'flipper';
import moment from 'moment';

import { COLUMN_SIZE, COLUMNS, APP_ID, HEADER_TEXT } from '../constants';

export const InspectorView = ({ instance, handleRowHighlighted }) => {
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
        actions={(<Button onClick={clearData}>Clear</Button>)}
      />
    </Panel>
  );
}

export default InspectorView;