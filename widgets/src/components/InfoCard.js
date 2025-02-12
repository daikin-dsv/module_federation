import React from 'react';

// This errors out because of duplicate custom element definitions
// Requested a fix from DDS Team: DDS-1911
// import '@daikin-oss/design-system-web-components/components/card/index.js';

/**
 * A reusable card that shows:
 *  - an icon on the left
 *  - a label
 *  - a value on the right
 *
 * Tailwind handles the layout/styling.
 * The `icon` prop is any React node (often an <svg>).
 * The `label` is a string describing the info (e.g. "Building 1A").
 * The `value` is the numeric or string value on the right side (e.g. "512 ft³").
 */
const InfoCard = ({ icon, label, value }) => {
    return (
        <daikin-card outline className="max-h-[75px]">
            <div className="flex w-60 items-center justify-between p-2">
                {/* Left side: Icon + Label */}
                <div className="flex items-center space-x-2">
                    {/* Icon wrapper. We apply colorClass to color the icon via "text-*" */}
                    <div className="h-6 max-h-6 w-6 max-w-6 flex-shrink-0 text-[#0097e0]">
                        {icon}
                    </div>
                    <div className="text-sm font-medium text-[#616161]">{label}</div>
                </div>

                {/* Right side: Value */}
                <div className="text-sm font-semibold text-gray-900">{value}</div>
            </div>
        </daikin-card>
    );
};

export const WaterIcon = (
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full">
        <path d="M12 2C8 7 6 10 6 13C6 16.87 9.13 20 13 20C16.87 20 20 16.87 20 13C20 10 18 7 14 2L12 2Z" />
    </svg>
);

export const BatteryIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="h-full w-full"
    >
        <path
            fillRule="evenodd"
            d="M3.75 6.75a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 0 0-3-3h-15Zm15 1.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5h15ZM4.5 9.75a.75.75 0 0 0-.75.75V15c0 .414.336.75.75.75H18a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75H4.5Z"
            clipRule="evenodd"
        />
    </svg>
);

// Fire
export const FireIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-full w-full"
    >
        <path
            fillRule="evenodd"
            d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
            clipRule="evenodd"
        />
    </svg>
);

// Temperature (Thermometer)
export const TemperatureIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        fill="currentColor"
        className="h-full w-full"
    >
        <path d="M160 64c-26.5 0-48 21.5-48 48l0 164.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5L208 112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112l0 164.4c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6L48 112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3L144 144c0-8.8 7.2-16 16-16s16 7.2 16 16l0 178.7c18.6 6.6 32 24.4 32 45.3z" />
    </svg>
);

// Star
export const StarIcon = (
    <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

// Person
export const PersonIcon = (
    <svg fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path d="M12 12c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

// Chair
export const ChairIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.40192 4.5C7 5.19615 7 6.13077 7 8V11.0269C7.43028 10.9999 7.91397 11 8.43477 11H15.5648C16.0858 11 16.5696 10.9999 17 11.0269V8C17 6.13077 17 5.19615 16.5981 4.5C16.3348 4.04394 15.9561 3.66523 15.5 3.40192C14.8038 3 13.8692 3 12 3C10.1308 3 9.19615 3 8.5 3.40192C8.04394 3.66523 7.66523 4.04394 7.40192 4.5Z" />
        <path d="M6.25 15.9914C5.74796 15.9711 5.44406 15.9032 5.236 15.6762C4.93926 15.3523 4.97792 14.9018 5.05525 14.0008C5.11107 13.3503 5.2373 12.9125 5.52274 12.5858C6.0345 12 6.85816 12 8.50549 12H15.4945C17.1418 12 17.9655 12 18.4773 12.5858C18.7627 12.9125 18.8889 13.3503 18.9448 14.0008C19.0221 14.9018 19.0607 15.3523 18.764 15.6762C18.5559 15.9032 18.252 15.9711 17.75 15.9914V20.9999C17.75 21.4142 17.4142 21.7499 17 21.7499C16.5858 21.7499 16.25 21.4142 16.25 20.9999V16H7.75V20.9999C7.75 21.4142 7.41421 21.7499 7 21.7499C6.58579 21.7499 6.25 21.4142 6.25 20.9999V15.9914Z" />
    </svg>
);

export default InfoCard;
