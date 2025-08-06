import React, { useState, useEffect, useRef } from 'react';

import { alertsText } from '../text.json';

const Alerts = ({ lang }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('alertedAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [alerts, setAlerts] = useState(mockAlerts);
    const [filteredAlerts, setFilteredAlerts] = useState(mockAlerts);
    const itemsPerPage = 10;

    // Listen to <daikin-table>'s custom events
    const tableRef = useRef(null);

    // Filter alerts based on search term
    useEffect(() => {
        const filtered = alerts.filter((alert) =>
            alert.building.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAlerts(filtered);
        setCurrentPage(1);
    }, [searchTerm, alerts]);

    // Listen for the custom "change-sort" event emitted by <daikin-table>
    useEffect(() => {
        const tableEl = tableRef.current;
        if (!tableEl) return;

        const handleSortChange = (e) => {
            const column = e.target.sort;
            const direction = e.target.order;
            if (column) setSortColumn(column);
            if (direction) setSortDirection(direction);
        };

        tableEl.addEventListener('change-sort', handleSortChange);
        return () => {
            tableEl.removeEventListener('change-sort', handleSortChange);
        };
    }, []);

    // Sort alerts
    const sortAlerts = (column) => {
        const direction =
            sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(direction);
    };
    // Get sorted and paginated alerts
    const getSortedAlerts = () => {
        const sorted = [...filteredAlerts].sort((a, b) => {
            let aValue = a[sortColumn];
            let bValue = b[sortColumn];

            if (sortColumn === 'alertedAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return sorted;
    };

    const sortedAlerts = getSortedAlerts();
    const totalPages = Math.ceil(sortedAlerts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAlerts = sortedAlerts.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleMarkAsRead = (alertId) => {
        setAlerts((prev) =>
            prev.map((alert) =>
                alert.id === alertId ? { ...alert, isRead: !alert.isRead } : alert
            )
        );
    };

    return (
        <div className="font-daikin-serif rounded-lg bg-white p-6">
            <div className="mb-6">
                <h1 className="text-dds-color-common-neutral-default text-xl">
                    {alertsText[lang || 'en'].alerts}
                </h1>
            </div>

            <div className="mb-6">
                <div className="max-w-md">
                    <daikin-text-field
                        placeholder={alertsText[lang || 'en'].searchPlaceholder}
                        value={searchTerm}
                        // There is a bug where clicking on the "x" doesn't trigger input change
                        // Requested fix: DDS-2468
                        onInput={(e) => setSearchTerm(e.target.value)}
                        type="search"
                    ></daikin-text-field>
                </div>
            </div>

            <div className="mb-6">
                <daikin-table
                    ref={tableRef}
                    sortable
                    className="w-full text-sm"
                    // For some reason, we need headers and rows regardless of if the headers/rows are declared as children
                    // May be a bug on DDS side
                    headers={[
                        { key: 'alertedAt' },
                        { key: 'alert', label: alertsText[lang || 'en'].alert },
                        { key: 'building', label: alertsText[lang || 'en'].building },
                        { key: 'data', label: alertsText[lang || 'en'].data },
                        { key: 'type', label: alertsText[lang || 'en'].type },
                        { key: 'actions' }
                    ]}
                    rows={currentAlerts.map((alert) => ({
                        id: alert.id,
                        alertedAt: alert.alertedAt,
                        alert: alert.alert,
                        building: alert.building,
                        data: alert.data,
                        type: alert.type,
                        isRead: alert.isRead
                    }))}
                >
                    {/* header cell overrides */}
                    <daikin-table-header-cell
                        alignment="center"
                        key="alertedAt"
                        slot="header:alertedAt"
                        sortable
                        onClick={() => sortAlerts('alertedAt')}
                        className="w-[200px]"
                    >
                        {alertsText[lang || 'en'].alertedAt}
                    </daikin-table-header-cell>

                    {/* data rows overrides */}
                    {currentAlerts.map((alert) => (
                        <React.Fragment key={alert.id}>
                            <daikin-table-cell
                                slot={`cell:${alert.id}:alertedAt`}
                                alignment="right"
                                className="w-[200px]"
                            >
                                <span>
                                    {!alert.isRead && (
                                        <span className="bg-dds-color-blue-50 mr-2 inline-block h-2 w-2 rounded-full align-middle"></span>
                                    )}
                                    {alert.alertedAt}
                                </span>
                            </daikin-table-cell>

                            <daikin-table-cell
                                slot={`cell:${alert.id}:actions`}
                                className="min-w-[110px]"
                            >
                                <daikin-icon-button
                                    variant="ghost"
                                    color="default"
                                    onClick={() => handleMarkAsRead(alert.id)}
                                    title={
                                        alert.isRead
                                            ? alertsText[lang || 'en'].markAsUnread
                                            : alertsText[lang || 'en'].markAsRead
                                    }
                                    buttonAriaLabel={
                                        alert.isRead
                                            ? alertsText[lang || 'en'].read
                                            : alertsText[lang || 'en'].unread
                                    }
                                >
                                    {alert.isRead ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M19.5 22.5a3 3 0 0 0 3-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 1 1-.712 1.321l-5.683-3.06a1.5 1.5 0 0 0-1.422 0l-5.683 3.06a.75.75 0 0 1-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 0 0 3 3h15Z" />
                                            <path d="M1.5 9.589v-.745a3 3 0 0 1 1.578-2.642l7.5-4.038a3 3 0 0 1 2.844 0l7.5 4.038A3 3 0 0 1 22.5 8.844v.745l-8.426 4.926-.652-.351a3 3 0 0 0-2.844 0l-.652.351L1.5 9.589Z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                        </svg>
                                    )}
                                </daikin-icon-button>
                            </daikin-table-cell>
                        </React.Fragment>
                    ))}
                </daikin-table>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5">
                <div
                    className="text-dds-color-common-neutral-default grow-[1000] text-sm"
                    dangerouslySetInnerHTML={{
                        __html: alertsText[lang || 'en'].showingResults
                            .replace('{start}', startIndex + 1)
                            .replace('{end}', Math.min(endIndex, sortedAlerts.length))
                            .replace('{total}', sortedAlerts.length)
                    }}
                />
                <div className="flex grow items-center justify-center gap-1">
                    <daikin-pagination
                        total={totalPages}
                        current={currentPage}
                        onChange={(e) => {
                            handlePageChange(e.target.current);
                        }}
                    ></daikin-pagination>
                </div>
            </div>
        </div>
    );
};

export default Alerts;

// Mock data based on the mockup
const mockAlerts = [
    {
        id: 1,
        alertedAt: '2025/06/19 16:35:02',
        alert: 'Primary Energy Consumption Alert',
        building: 'Tokyo University Building A',
        data: 'Primary energy consumption for entire building',
        type: 'Cumulative',
        isRead: true
    },
    {
        id: 2,
        alertedAt: '2025/06/19 16:30:54',
        alert: 'CO2 Alert',
        building: 'Daikin Osaka Building B',
        data: 'Indoor air CO2 concentration in Meeting Room 2',
        type: 'Instantaneous',
        isRead: false
    },
    {
        id: 3,
        alertedAt: '2025/06/19 16:25:30',
        alert: 'CO2 Alert',
        building: 'Tokyo University Building A',
        data: 'Indoor air CO2 concentration in Room A',
        type: 'Instantaneous',
        isRead: false
    },
    {
        id: 4,
        alertedAt: '2025/06/19 16:20:15',
        alert: 'Temperature Alert',
        building: 'Daikin Osaka Building B',
        data: 'Indoor temperature in Conference Room 1',
        type: 'Instantaneous',
        isRead: false
    },
    {
        id: 5,
        alertedAt: '2025/06/19 16:15:42',
        alert: 'Energy Consumption Alert',
        building: 'Tokyo University Building A',
        data: 'Secondary energy consumption for Floor 3',
        type: 'Cumulative',
        isRead: false
    },
    {
        id: 6,
        alertedAt: '2025/06/19 16:10:28',
        alert: 'Humidity Alert',
        building: 'Daikin Osaka Building B',
        data: 'Indoor humidity in Office Area 2',
        type: 'Instantaneous',
        isRead: false
    },
    {
        id: 7,
        alertedAt: '2025/06/19 16:05:15',
        alert: 'Power Alert',
        building: 'Tokyo University Building A',
        data: 'Power consumption for HVAC system',
        type: 'Cumulative',
        isRead: false
    },
    {
        id: 8,
        alertedAt: '2025/06/19 16:00:33',
        alert: 'Air Quality Alert',
        building: 'Daikin Osaka Building B',
        data: 'PM2.5 concentration in Lobby',
        type: 'Instantaneous',
        isRead: false
    },
    {
        id: 9,
        alertedAt: '2025/06/19 15:55:20',
        alert: 'Water Usage Alert',
        building: 'Tokyo University Building A',
        data: 'Water consumption for cooling towers',
        type: 'Cumulative',
        isRead: false
    },
    {
        id: 10,
        alertedAt: '2025/06/19 15:50:45',
        alert: 'Ventilation Alert',
        building: 'Daikin Osaka Building B',
        data: 'Air flow rate in Meeting Room 3',
        type: 'Instantaneous',
        isRead: false
    }
];
