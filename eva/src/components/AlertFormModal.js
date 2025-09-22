import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { alertFormModalText } from '../text.json';

export const alertSettingInitialState = {
    id: '',
    alert: '',
    building: '',
    data: '',
    type: 'cumulative',
    min: '',
    max: '',
    span: '',
    threshold: '',
    aggregate: 'Daily'
};

const AlertFormModal = ({ open, alertSetting, submit, cancel, buildings }) => {
    const [name, setName] = useState(alertSetting.alert || '');
    const [selectedBuilding, setSelectedBuilding] = useState(alertSetting.building ? { label: alertSetting.building } : null);
    const [selectedData, setSelectedData] = useState(alertSetting.data ? { label: alertSetting.data } : null);
    const [type, setType] = useState(alertSetting.type || 'cumulative');
    const [min, setMin] = useState(alertSetting.min || '');
    const [max, setMax] = useState(alertSetting.max || '');
    const [span, setSpan] = useState(alertSetting.span || '');
    const [threshold, setThreshold] = useState(alertSetting.threshold || '');
    const [aggregate, setAggregate] = useState(alertSetting.aggregate || 'Daily');

    const { locale: lang } = getCurrentUser() || {};

    const buildingList = buildings.map((building) => ({ label: building }));

    useEffect(() => {
        setName(alertSetting.alert || '');
        setSelectedBuilding(alertSetting.building ? { label: alertSetting.building } : null);
        setSelectedData(alertSetting.data ? { label: alertSetting.data } : null);
        setType(alertSetting.type || 'cumulative');
        setMin(alertSetting.min || '');
        setMax(alertSetting.max || '');
        setSpan(alertSetting.span || '');
        setThreshold(alertSetting.threshold || '');
        setAggregate(alertSetting.aggregate || 'Daily');
    }, [alertSetting]);

    const handleCancel = () => cancel();

    const handleSave = () => {
        const cumulativeData = { threshold, aggregate };
        const instantaneousData = { min, max, span };

        submit({
            alert: name,
            building: selectedBuilding.label,
            data: selectedData.label,
            type,
            ...(type === 'cumulative' && { ...cumulativeData }),
            ...(type === 'instantaneous' && { ...instantaneousData })
        });
    };

    const isDataFieldDisabled = () => !selectedBuilding;

    const isFormValid = () => {
        const isCumulativeDataValid = type === 'cumulative'
            ? !!threshold && !!aggregate
            : true;
        const isInstantaneousDataValid = type === 'instantaneous'
            ? !!min && !!max && !!span
            : true;
        const isFormValid = !!name
            && !!selectedBuilding
            && !!selectedData
            && !!type
            && isCumulativeDataValid
            && isInstantaneousDataValid;

        return isFormValid;
    };

    const renderCumulativeInputGroup = () => {
        return (
            <>
                <daikin-input-group
                    label={alertFormModalText[lang].threshold}
                    required="*"
                >
                    <daikin-text-field
                        id="threshold"
                        value={threshold}
                        onInput={(e) => setThreshold(e.target.value)}
                        data-testid="threshold-input"
                    />
                </daikin-input-group>
                <daikin-input-group
                    label={alertFormModalText[lang].aggregate}
                    required="*"
                >
                    <daikin-select id="aggregate" value={aggregate} onInput={(e) => setAggregate(e.target.value)}>
                        <select name="select" data-testid="aggregate-select">
                            <option value="Daily">{alertFormModalText[lang].daily}</option>
                            <option value="Monthly">{alertFormModalText[lang].monthly}</option>
                            <option value="Yearly">{alertFormModalText[lang].yearly}</option>
                        </select>
                    </daikin-select>
                </daikin-input-group>
            </>
        );
    };

    const renderInstantaneousInputGroup = () => {
        return (
            <>
                <daikin-input-group
                    label={alertFormModalText[lang].min}
                    required="*"
                >
                    <daikin-text-field
                        id="min"
                        value={min}
                        onInput={(e) => setMin(e.target.value)}
                        data-testid="min-input"
                    />
                </daikin-input-group>
                <daikin-input-group
                    label={alertFormModalText[lang].max}
                    required="*"
                >
                    <daikin-text-field
                        id="max"
                        value={max}
                        onInput={(e) => setMax(e.target.value)}
                        data-testid="max-input"
                    />
                </daikin-input-group>
                <daikin-input-group
                    label={alertFormModalText[lang].span}
                    required="*"
                >
                    <daikin-text-field
                        id="span"
                        value={span}
                        onInput={(e) => setSpan(e.target.value)}
                        data-testid="span-input"
                    />
                </daikin-input-group>
            </>
        );
    };

    return (
        <daikin-modal
            id="alert-settings-form"
            open={open}
            persistent="true"
            modal-aria-label="Alert Form Modal"
            modal-role="alertdialog"
        >
            <daikin-modal-header>
                <div className="flex items-center">
                    {alertFormModalText[lang].header}
                </div>
                <div slot="description">
                    <div className="flex gap-2 my-4">
                        <daikin-input-group
                            label={alertFormModalText[lang].name}
                            required="*"
                        >
                            <daikin-text-field
                                id="name"
                                value={name}
                                onInput={(e) => setName(e.target.value)}
                                data-testid="name-input"
                            />
                        </daikin-input-group>
                        <daikin-input-group
                            label={alertFormModalText[lang].building}
                            required="*"
                        >
                            <Autocomplete
                                disablePortal
                                id="building"
                                options={buildingList}
                                value={selectedBuilding}
                                renderInput={(params) => <TextField {...params} sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: 48,
                                        minHeight: 48,
                                    }
                                }} />}
                                onChange={(e, newValue, reason) => {
                                    e.stopPropagation();
                                    if (reason === 'selectOption') {
                                        setSelectedBuilding(newValue);
                                    } else if (reason === 'clear') {
                                        setSelectedBuilding(null);
                                    }
                                }}
                                sx={{
                                    '& fieldset': { borderColor: 'var(--color-border)' }
                                }}
                                data-testid="building-input"
                            />
                        </daikin-input-group>
                        <daikin-input-group
                            label={alertFormModalText[lang].data}
                            required="*"
                        >
                            <Autocomplete
                                disablePortal
                                id="data"
                                options={dataList}
                                groupBy={(option) => option.group}
                                value={selectedData}
                                renderInput={(params) => <TextField
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: 48,
                                            minHeight: 48,
                                        }
                                    }}
                                    placeholder={isDataFieldDisabled() ? alertFormModalText[lang].specifyBuilding : ""}
                                    {...params}
                                />}
                                onChange={(e, newValue, reason) => {
                                    e.stopPropagation();
                                    if (reason === 'selectOption') {
                                        setSelectedData(newValue);
                                    } else if (reason === 'clear') {
                                        setSelectedData(null);
                                    }
                                }}
                                sx={{
                                    '& fieldset': { borderColor: 'var(--color-border)' }
                                }}
                                disabled={isDataFieldDisabled()}
                                data-testid="data-input"
                            />
                        </daikin-input-group>
                    </div>
                    <daikin-input-group
                        label={alertFormModalText[lang].type}
                        required="*"
                        className="my-4"
                    >
                        <daikin-radio-group
                            label={alertFormModalText[lang].type}
                            value={type}
                            onInput={(e) => setType(e.target.value)}
                        >
                            <daikin-radio
                                name="type"
                                id="type"
                                value="cumulative"
                                label={alertFormModalText[lang].cumulative}
                                data-testid="cumulative-radio"
                            ></daikin-radio>
                            <daikin-radio
                                name="type"
                                id="type"
                                value="instantaneous"
                                label={alertFormModalText[lang].instantaneous}
                                data-testid="instantaneous-radio"
                            ></daikin-radio>
                        </daikin-radio-group>
                    </daikin-input-group>
                    <div className="flex gap-2">
                        {type === 'cumulative'
                            ? renderCumulativeInputGroup()
                            : renderInstantaneousInputGroup()}
                    </div>
                </div>
            </daikin-modal-header>
            <daikin-modal-footer>
                <div className="flex w-full justify-between mt-4">
                    <daikin-button onClick={handleCancel} variant="outline" data-testid="cancel-button">
                        {alertFormModalText[lang].cancel}
                    </daikin-button>
                    <daikin-button onClick={handleSave} disabled={!isFormValid()} data-testid="save-button">
                        {alertFormModalText[lang].save}
                    </daikin-button>
                </div>
            </daikin-modal-footer>
        </daikin-modal>
    );
};

export default AlertFormModal;

const dataList = [
    {
        label: 'CO2 sensor status'
    },
    {
        label: 'Lobby CO2 maintenance',
    },
    {
        label: 'CO2 detection calculation',
        group: 'Custom Data'
    },
    {
        label: 'Zone 12 CO2 level',
        group: 'Equipment 1'
    },
    {
        label: 'Zone 15 CO2 level',
        group: 'Equipment 2'
    }
];
