import React from 'react';

// This errors out because of duplicate custom element definitions
// Requested a fix from DDS Team: DDS-1911
// import '@daikin-oss/design-system-web-components/components/card/index.js';
// import '@daikin-oss/design-system-web-components/components/icon/index.js';

import '../index.css';
import { alarmText } from '../text.json';

const Alarm = ({ count = 1, color = 'red', text = alarmText }) => {
    const COLORS = {
        red: `text-[#f21a27]`,
        yellow: `text-[#b88700]`,
        green: `text-[#008f7e]`
    };

    return (
        <>
            <daikin-card outline className="max-h-[274px]" data-testid="alarm-card">
                <div className="flex h-[240px] w-[240px] flex-col items-center justify-center">
                    <div className={`mb-2 h-40 w-40 ${COLORS[color]}`}>
                        <daikin-icon
                            icon="alarm"
                            color="current"
                            size="current"
                        ></daikin-icon>
                    </div>

                    <div className="flex flex-col items-center text-gray-700">
                        <div className="font-bold">{count}</div>
                        <div>{count === 1 ? text.alarm : text.alarms}</div>
                    </div>
                </div>
            </daikin-card>
        </>
    );
};

export default Alarm;
