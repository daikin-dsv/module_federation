import React, { useState, useRef, useEffect } from 'react';

import { getCurrentUser } from 'Layout/auth';
import AlertFormModal, { alertSettingInitialState } from '../components/AlertFormModal';

import { useTableData } from '../hooks/useTableData';
import { alertSettingsText } from '../text.json';

const AlertSettings = () => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [openAlertFormModal, setOpenAlertFormModal] = useState(false);
    const [alertSettingToUpdate, changeAlertSettingToUpdate] = useState({ ...alertSettingInitialState });
    const confirmRef = useRef(null);

    const { locale } = getCurrentUser() || {};

    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        currentItems: currentAlertSettings,
        totalPages,
        startIndex,
        endIndex,
        tableRef,
        sortItems,
        handlePageChange,
        addItem,
        removeItem
    } = useTableData(mockAlertSettings, 'building', 10, 'updatedAt', 'desc');

    const openConfirm = (setting) => {
        setPendingDelete(setting);
        setConfirmOpen(true);
    };

    const closeConfirm = () => {
        setConfirmOpen(false);
        setPendingDelete(null);
    };

    useEffect(() => {
        const el = confirmRef.current;
        if (!el) return;

        const onCancel = () => {
            closeConfirm();
        };

        const onConfirm = () => {
            removeItem(pendingDelete.id);
            closeConfirm();
        };

        el.addEventListener('cancel', onCancel);
        el.addEventListener('confirm', onConfirm);
        el.addEventListener('create', onCreateAlertFormSubmit);
        return () => {
            el.removeEventListener('cancel', onCancel);
            el.removeEventListener('confirm', onConfirm);
            el.removeEventListener('create', onCreateAlertFormSubmit);
        };
    }, [removeItem, pendingDelete]);

    const handleRequestDelete = (setting) => {
        openConfirm(setting);
    };

    const handleEdit = (settingId) => {
        // TODO: Implement edit functionality
        const alertSetting = currentAlertSettings.find((setting) => setting.id === settingId);
        changeAlertSettingToUpdate({ ...alertSetting });
        setOpenAlertFormModal(true);
    };

    const handleCreateAlert = () => {
        // TODO: Implement create alert functionality
        setOpenAlertFormModal(true);
    };

    const onCreateAlertFormSubmit = (data) => {
        const id = mockAlertSettings.length + 1;
        const updatedAt = new Date().toLocaleString('sv-SE').replace(/-/g, '/');
        addItem({ ...data, id, updatedAt });
        setOpenAlertFormModal(false);
        changeAlertSettingToUpdate({ ...alertSettingInitialState });
    };

    const onCancelAlertFormModal = () => {
        setOpenAlertFormModal(false);
        changeAlertSettingToUpdate({ ...alertSettingInitialState });
    };

    return (
        <div className="font-daikin-serif rounded-lg bg-white p-6">
            <div className="mb-6">
                <h1 className="text-dds-color-common-neutral-default text-xl">
                    {alertSettingsText[locale || 'en'].alertSettings}
                </h1>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <div className="mr-2 max-w-md">
                    <daikin-text-field
                        placeholder={alertSettingsText[locale || 'en'].searchPlaceholder}
                        value={searchTerm}
                        // There is a bug where clicking on the "x" doesn't trigger input change
                        // Requested fix: DDS-2468
                        onInput={(e) => setSearchTerm(e.target.value)}
                        type="search"
                    ></daikin-text-field>
                </div>
                <div>
                    <daikin-button
                        data-testid="create-alert"
                        size="medium"
                        onClick={handleCreateAlert}
                    >
                        {alertSettingsText[locale || 'en'].createAlert}
                    </daikin-button>
                </div>
            </div>

            <div className="mb-6">
                <daikin-table
                    ref={tableRef}
                    sortable
                    className="w-full text-sm"
                    headers={[
                        { key: 'alert' },
                        { key: 'building' },
                        { key: 'data' },
                        { key: 'updatedAt' },
                        { key: 'actions' }
                    ]}
                    rows={currentAlertSettings.map((setting) => ({
                        id: setting.id,
                        alert: setting.alert,
                        building: setting.building,
                        data: setting.data,
                        updatedAt: setting.updatedAt
                    }))}
                >
                    {/* header cell overrides */}
                    <daikin-table-header-cell
                        key="alert"
                        slot="header:alert"
                        sortable
                        onClick={() => sortItems('alert')}
                        className="min-w-[200px]"
                    >
                        {alertSettingsText[locale || 'en'].alert}
                    </daikin-table-header-cell>

                    <daikin-table-header-cell
                        key="building"
                        slot="header:building"
                        sortable
                        onClick={() => sortItems('building')}
                        className="min-w-[200px]"
                    >
                        {alertSettingsText[locale || 'en'].building}
                    </daikin-table-header-cell>

                    <daikin-table-header-cell
                        key="data"
                        slot="header:data"
                        className="min-w-[300px]"
                    >
                        {alertSettingsText[locale || 'en'].data}
                    </daikin-table-header-cell>

                    <daikin-table-header-cell
                        key="updatedAt"
                        slot="header:updatedAt"
                        sortable
                        onClick={() => sortItems('updatedAt')}
                        className="min-w-[200px]"
                    >
                        {alertSettingsText[locale || 'en'].updatedAt}
                    </daikin-table-header-cell>

                    {/* data rows overrides */}
                    {currentAlertSettings.map((setting) => (
                        <React.Fragment key={setting.id}>
                            <daikin-table-cell
                                slot={`cell:${setting.id}:alert`}
                                className="min-w-[200px]"
                            >
                                {setting.alert}
                            </daikin-table-cell>

                            <daikin-table-cell
                                slot={`cell:${setting.id}:building`}
                                className="min-w-[200px]"
                            >
                                {setting.building}
                            </daikin-table-cell>

                            <daikin-table-cell
                                slot={`cell:${setting.id}:data`}
                                className="min-w-[300px]"
                            >
                                {setting.data}
                            </daikin-table-cell>

                            <daikin-table-cell
                                slot={`cell:${setting.id}:updatedAt`}
                                className="min-w-[200px]"
                            >
                                {setting.updatedAt}
                            </daikin-table-cell>

                            <daikin-table-cell
                                slot={`cell:${setting.id}:actions`}
                                className="min-w-[110px]"
                            >
                                <div className="flex gap-2">
                                    <daikin-icon-button
                                        data-testid="alert-setting-delete"
                                        variant="ghost"
                                        color="default"
                                        onClick={() => handleRequestDelete(setting)}
                                        title={alertSettingsText[locale || 'en'].delete}
                                        buttonAriaLabel={
                                            alertSettingsText[locale || 'en'].delete
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </daikin-icon-button>
                                    <daikin-icon-button
                                        data-testid="alert-setting-edit"
                                        variant="ghost"
                                        color="default"
                                        onClick={() => handleEdit(setting.id)}
                                        title={alertSettingsText[locale || 'en'].edit}
                                        buttonAriaLabel={
                                            alertSettingsText[locale || 'en'].edit
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                        </svg>
                                    </daikin-icon-button>
                                </div>
                            </daikin-table-cell>
                        </React.Fragment>
                    ))}
                </daikin-table>
                <widget-confirmation-window
                    ref={confirmRef}
                    open={confirmOpen}
                    danger={true}
                    text={{
                        header: alertSettingsText[locale || 'en'].confirmDeleteHeader,
                        description: (
                            alertSettingsText[locale || 'en'].confirmDeleteDescription ||
                            ''
                        )
                            .replace('{alert}', pendingDelete?.alert || '')
                            .replace('{building}', pendingDelete?.building || ''),
                        cancel: alertSettingsText[locale || 'en'].cancel,
                        confirm: alertSettingsText[locale || 'en'].confirm
                    }}
                ></widget-confirmation-window>
            </div>

            <table-pagination
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={currentAlertSettings.length}
                currentPage={currentPage}
                totalPages={totalPages}
                locale={locale}
                text={JSON.stringify({ alertSettingsText })}
                textKey="alertSettingsText"
                onPageChange={(e) => handlePageChange(e.detail.page)}
            ></table-pagination>
            <AlertFormModal
                open={openAlertFormModal}
                setOpen={setOpenAlertFormModal}
                submit={onCreateAlertFormSubmit}
                cancel={onCancelAlertFormModal}
                buildings={[...new Set(mockAlertSettings.map((setting) => setting.building))]}
                alertSetting={alertSettingToUpdate}
            />
        </div>
    );
};

export default AlertSettings;

// Mock data based on the image
const mockAlertSettings = [
    {
        id: 1,
        alert: 'Primary Energy Consumption Alert',
        building: 'Tokyo University Building A',
        data: 'Primary energy consumption for entire building',
        updatedAt: '2025/06/19 16:35:02'
    },
    {
        id: 2,
        alert: 'CO2 Alert',
        building: 'Daikin Osaka Building B',
        data: 'Indoor air CO2 concentration in Meeting Room 2',
        updatedAt: '2025/06/19 16:30:54'
    },
    {
        id: 3,
        alert: 'CO2 Alert',
        building: 'Tokyo University Building A',
        data: 'Indoor air CO2 concentration in Room A',
        updatedAt: '2025/06/19 16:27:48'
    },
    {
        id: 4,
        alert: 'Primary Energy Consumption Alert',
        building: 'Tokyo University Building A',
        data: 'Primary energy consumption for entire building',
        updatedAt: '2025/06/19 11:15:22'
    },
    {
        id: 5,
        alert: 'Primary Energy Consumption Alert',
        building: 'Tokyo University Building A',
        data: 'Primary energy consumption for entire building',
        updatedAt: '2025/06/19 09:48:09'
    },
    {
        id: 6,
        alert: 'Primary Energy Consumption Alert',
        building: 'Tokyo University Building A',
        data: 'Primary energy consumption for entire building',
        updatedAt: '2025/06/19 08:21:14'
    },
    {
        id: 7,
        alert: 'Primary Energy Consumption Alert',
        building: 'Daikin Osaka Building B',
        data: 'Primary energy consumption for entire building',
        updatedAt: '2025/06/19 06:32:12'
    },
    {
        id: 8,
        alert: 'CO2 Alert',
        building: 'Daikin Osaka Building B',
        data: 'Table Cell',
        updatedAt: '2025/06/19 04:12:07'
    },
    {
        id: 9,
        alert: 'Primary Energy Consumption Alert',
        building: 'Tokyo University Building A',
        data: 'Primary energy consumption for entire building',
        updatedAt: '2025/06/19 03:11:46'
    },
    {
        id: 10,
        alert: 'CO2 Alert',
        building: 'Daikin Osaka Building B',
        data: 'Table Cell',
        updatedAt: '2025/06/19 02:02:49'
    }
];
