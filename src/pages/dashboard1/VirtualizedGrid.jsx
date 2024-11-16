// src/components/VirtualizedGrid.jsx
import React, { memo, useRef, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualizedGrid = memo(({ items, onClick }) => {
  const parentRef = useRef(null);
  const [itemsPerRow, setItemsPerRow] = useState(4);
  
  // Update itemsPerRow based on screen size
  useEffect(() => {
    const updateGridColumns = () => {
      const width = window.innerWidth;
      if (width < 768) setItemsPerRow(1);
      else if (width < 1024) setItemsPerRow(2);
      else if (width < 1280) setItemsPerRow(3);
      else setItemsPerRow(4);
    };

    updateGridColumns();
    window.addEventListener('resize', updateGridColumns);
    return () => window.removeEventListener('resize', updateGridColumns);
  }, []);

  const virtualizer = useVirtualizer({
    count: Math.ceil(items.length / itemsPerRow),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="virtualized-grid-container"
      style={{
        height: '800px',
        overflow: 'auto',
        width: '100%',
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => {
          const start = virtualRow.index * itemsPerRow;
          const end = Math.min(start + itemsPerRow, items.length);

          return (
            <div
              key={virtualRow.index}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
                gap: '1rem',
                padding: '0.5rem',
              }}>
                {items.slice(start, end).map(user => (
                  <div
                    key={user.id}
                    className="profile-card"
                    onClick={() => onClick(user.id)}
                  >
                    <img
                      className="profile-image"
                      src={user.Pictures?.replace(/[\[\]']/g, "").split(", ")[0] || user.profilePicture?.url}
                      alt={`${user.FirstName}'s profile`}
                      loading="lazy"
                    />
                    <div className="profile-info">
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                        <div>
                          <span className="profile-name">
                            {user.FirstName} {user.LastName}
                          </span>
                        </div>
                        <span>Age: {user.age}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default VirtualizedGrid;