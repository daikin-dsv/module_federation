import React from 'react';

import {
    colorBlue50,
    colorCommonBrandDefault,
    colorGray70
} from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';

// This errors out because of duplicate custom element definitions
// Requested a fix from DDS Team: DDS-1911
// import '@daikin-oss/design-system-web-components/components/card/index.js';

/**
 * A half-circle energy gauge:
 *  - The top half of the circle is the "fill" from left to right.
 *  - The bottom is left empty (the gap).
 *  - Displays the kWh usage, an icon, and the building name.
 */
const EnergyGauge = ({ usage, maxUsage, buildingName }) => {
    const radius = 120;
    const percent = (usage / maxUsage) * 100;
    const strokeWidth = 10;
    const innerRadius = radius - strokeWidth;
    const circumference = innerRadius * 2 * Math.PI;
    const arc = circumference * 0.75;
    const dashArray = `${arc} ${circumference}`;
    const transform = `rotate(135, ${radius}, ${radius})`;
    const offset = arc - (percent / 100) * arc;

    return (
        <daikin-card outline className="max-h-[274px]">
            <div className="relative flex h-[240px] w-[240px] items-center justify-center">
                <svg height={radius * 2} width={radius * 2}>
                    <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                            <stop
                                offset="15%"
                                stopColor={colorCommonBrandDefault}
                                stopOpacity="1"
                            />
                            <stop offset="85%" stopColor={colorBlue50} stopOpacity="1" />
                        </linearGradient>
                    </defs>

                    <circle
                        className="gauge_base"
                        cx={radius}
                        cy={radius}
                        fill="transparent"
                        r={innerRadius}
                        stroke={colorGray70}
                        strokeDasharray={dashArray}
                        strokeLinecap="round"
                        strokeWidth="15"
                        transform={transform}
                    />

                    <circle
                        className="gauge_percent"
                        cx={radius}
                        cy={radius}
                        fill="transparent"
                        r={innerRadius}
                        stroke="url(#grad)"
                        strokeDasharray={dashArray}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        strokeWidth="15"
                        transform={transform}
                    />
                </svg>

                {/* Centered usage info */}
                <div className="absolute flex flex-col items-center justify-center">
                    {/* Lightning icon */}
                    <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className={`mb-1 h-14 w-14 text-[#0097e0]`}
                    >
                        <path d="M13 2L3 14H11L9 22L19 10H11L13 2Z" />
                    </svg>

                    <div className="font-medium text-gray-800">
                        {usage.toFixed(1)} kWh
                    </div>
                    <div className="text-xs text-[#616161]">{buildingName}</div>
                </div>

                {/* Left/bottom label: "0" */}
                <div className="absolute bottom-2 left-10 text-xs text-[#616161]">0</div>
                {/* Right/bottom label: maxUsage */}
                <div className="absolute right-10 bottom-2 text-xs text-[#616161]">
                    {maxUsage}
                </div>
            </div>
        </daikin-card>
    );
};

export default EnergyGauge;
