import React from 'react';
import { Dialog } from 'antd-mobile';

export const AdminListDialog = ({ visible, onClose }) => {
  const admins = ['Admin 1', 'Admin 2', 'Admin 3']; // Replace with your data

  return (
    <Dialog
      visible={visible}
      title="Admin List"
      content={
        <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
          {admins.map((admin, index) => (
            <div key={index} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
              {admin}
            </div>
          ))}
        </div>
      }
      actions={[{ key: 'close', text: 'Close', onClick: onClose }]}
      onClose={onClose}
    />
  );
};