import React from 'react';

// This errors out because of duplicate custom element definitions
// Requested a fix from DDS Team: DDS-1911
// import '@daikin-oss/design-system-web-components/components/card/index.js';
// import '@daikin-oss/design-system-web-components/components/icon/index.js';

import '../index.css';

const Light = ({ label, language = 'en' }) => {
    const [state, setState] = React.useState('on');
    const [showToggle, setShowToggle] = React.useState(false);
    const COLORS = {
        yellow: `text-[#ffc936]`,
        gray: `text-[#a0a0a0]`
    };

    return (
        <>
            <daikin-card
                outline
                className="relative max-h-[274px] cursor-pointer"
                onClick={() => setShowToggle(!showToggle)}
            >
                <div className="flex h-[240px] w-[240px] flex-col items-center justify-center">
                    <div
                        className={`mb-2 flex h-40 w-auto items-center ${COLORS[state === 'on' ? 'yellow' : 'gray']} `}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-36"
                        >
                            <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                            <path
                                fillRule="evenodd"
                                d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {showToggle ? (
                            <div className="bg-opacity-50 absolute inset-0 flex h-full w-full grow flex-col items-center justify-center rounded-lg border border-gray-300 bg-white text-black opacity-100 transition-opacity duration-300">
                                {/* Top Half - "On" */}
                                <div
                                    className="flex w-full flex-1 items-center justify-center border-b border-gray-300 text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setState('on');
                                        setShowToggle(false);
                                    }}
                                >
                                    {language === 'ja' ? 'オン' : 'On'}
                                </div>

                                {/* Bottom Half - "Off" */}
                                <div
                                    className="flex w-full flex-1 items-center justify-center text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setState('off');
                                        setShowToggle(false);
                                    }}
                                >
                                    {language === 'ja' ? 'オフ' : 'Off'}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex flex-col items-center text-gray-700">
                        <div className="font-bold">
                            {state === 'on'
                                ? language === 'ja'
                                    ? 'オン'
                                    : 'On'
                                : language === 'ja'
                                  ? 'オフ'
                                  : 'Off'}
                        </div>

                        <div>{label}</div>
                    </div>
                </div>
            </daikin-card>
        </>
    );
};

export default Light;
