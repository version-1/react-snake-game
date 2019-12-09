import React, {useMemo} from 'react';

const Status = props => {
  const {status, start, stop, width} = props;

  const isPreparing = useMemo(() => status === 'preparing', [status]);

  const isStarting = useMemo(() => status === 'starting', [status]);

  const isSuspended = useMemo(() => status === 'suspended', [status]);

  const isOver = useMemo(() => status === 'over', [status]);

  return (
    <div className={`status width-${width}`}>
      {(isSuspended || isPreparing) && (
        <div className="btn btn-status start" onClick={start}>
          start
        </div>
      )}
      {isStarting && (
        <div className="btn btn-status stop" onClick={stop}>
          stop
        </div>
      )}
      {isOver && (
        <div className="btn btn-status over" onClick={window.location.reload}>
          Game Over
        </div>
      )}
    </div>
  );
};

export default Status;
