import React, { Component } from 'react';
import { SPEED_STEP_BY } from '../Constant';
class Info extends Component {
  render() {
    const { length, status, interval, setSpeed } = this.props;
    return (
      <div className="info">
        <div className="form">
          <div className="form-group">
            <div className="lable">Length</div>
            <div className="content">
              <input
                className="input"
                value={length}
                min={10}
                max={10000}
                disabled
                type="number"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="label">Speed</div>
            <div className="content speed-pannel">
              <input
                className="input"
                value={interval}
                min={10}
                max={10000}
                onChange={e => setSpeed(e.target.value)}
                type="number"
                disabled={status === 'starting'}
              />
              <div className="speed-pannel-icon">
                <a
                  className="up-arrow"
                  onClick={() => setSpeed(interval + SPEED_STEP_BY)}
                >
                  ▲
                </a>
                <a
                  className="down-arrow"
                  onClick={() => setSpeed(interval - SPEED_STEP_BY)}
                >
                  ▽
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
