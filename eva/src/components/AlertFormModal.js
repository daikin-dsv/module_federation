import React, { useState, useEffect } from 'react';

import { alertFormModalText } from './text.json';

const AlertFormModal = ({ open, alertSetting, submit, cancel }) => {
    const [name, setName] = useState(alertSetting.alert || '');
    const [building, setBuilding] = useState(alertSetting.building || '');
    const [data, setData] = useState(alertSetting.data || '');
    const [type, setType] = useState(alertSetting.type || 'cumulative');
    const [min, setMin] = useState(alertSetting.min || '');
    const [max, setMax] = useState(alertSetting.max || '');
    const [span, setSpan] = useState(alertSetting.span || '');
    const [threshold, setThreshold] = useState(alertSetting.threshold || '');
    const [aggregate, setAggregate] = useState(alertSetting.aggregate || '');

    useEffect(() => {
        setName(alertSetting.alert || '');
        setBuilding(alertSetting.building || '');
        setData(alertSetting.data || '');
        setType(alertSetting.type || 'cumulative');
        setMin(alertSetting.min || '');
        setMax(alertSetting.max || '');
        setSpan(alertSetting.span || '');
        setThreshold(alertSetting.threshold || '');
        setAggregate(alertSetting.aggregate || '');
    }, [alertSetting]);

    const handleCancel = () => cancel();

    const handleSave = () => {
        const cumulativeData = { min, max, span };
        const instantaneousData = { threshold, aggregate };

        submit({
            alert: name,
            building,
            data,
            type,
            ...(type === 'cumulative' && { ...cumulativeData }),
            ...(type === 'instantaneous' && { ...instantaneousData })
        });
    };

    const isDataFieldDisabled = () => !building.length;
    // console.log({ isDataFieldDisabled: isDataFieldDisabled() });

    const isFormValid = () => {
        const isCumulativeDataValid = type === 'cumulative'
            ? !!min && !!max && !!span
            : true;
        const isInstantaneousDataValid = type === 'instantaneous'
            ? !!threshold && !!aggregate
            : true;
        const isFormValid = !!name
            && !!building
            && !!data
            && !!type
            && isCumulativeDataValid
            && isInstantaneousDataValid;

        return isFormValid;
    };

    const renderCumulativeInputGroup = () => {
        return (
            <>
                <daikin-input-group
                    label={alertFormModalText.min}
                    required="*"
                >
                    <daikin-text-field
                        id="min"
                        value={min}
                        onInput={(e) => setMin(e.target.value)}
                    ></daikin-text-field>
                </daikin-input-group>
                <daikin-input-group
                    label={alertFormModalText.max}
                    required="*"
                >
                    <daikin-text-field
                        id="max"
                        value={max}
                        onInput={(e) => setMax(e.target.value)}
                    ></daikin-text-field>
                </daikin-input-group>
                <daikin-input-group
                    label={alertFormModalText.span}
                    required="*"
                >
                    <daikin-text-field
                        id="span"
                        value={span}
                        onInput={(e) => setSpan(e.target.value)}
                    ></daikin-text-field>
                </daikin-input-group>
            </>
        )
    };

    const renderInstantaneousInputGroup = () => {
        return (
            <>
                <daikin-input-group
                    label={alertFormModalText.threshold}
                    required="*"
                >
                    <daikin-text-field
                        id="threshold"
                        value={threshold}
                        onInput={(e) => setThreshold(e.target.value)}
                    ></daikin-text-field>
                </daikin-input-group>
                <daikin-input-group
                    label={alertFormModalText.aggregate}
                    required="*"
                >
                    <daikin-select id="aggregate" value={aggregate} onInput={(e) => setAggregate(e.target.value)}>
                        <select name="select">
                            <option value="daily">{alertFormModalText.daily}</option>
                        </select>
                    </daikin-select>
                </daikin-input-group>
            </>
        )
    };

    return (
        <daikin-modal
            id="confirmation-window"
            open={open}
            persistent="true"
            modal-aria-label="Alert Form Modal"
            modal-role="alertdialog"
        >
            <daikin-modal-header>
                <div className="flex items-center">
                    {alertFormModalText.header}
                </div>
                <div slot="description">
                    <div className="flex gap-2">
                        <daikin-input-group
                            label={alertFormModalText.name}
                            required="*"
                        >
                            <daikin-text-field
                                id="name"
                                value={name}
                                onInput={(e) => setName(e.target.value)}
                            ></daikin-text-field>
                        </daikin-input-group>
                        <daikin-input-group
                            label={alertFormModalText.building}
                            required="*"
                        >
                            <daikin-text-field
                                id="building"
                                value={building}
                                onInput={(e) => setBuilding(e.target.value)}
                            ></daikin-text-field>
                        </daikin-input-group>
                        <daikin-input-group
                            label={alertFormModalText.data}
                            required="*"
                        >
                            <daikin-text-field
                                id="data"
                                value={data}
                                disabled={isDataFieldDisabled()}
                                placeholder={isDataFieldDisabled() ? alertFormModalText.specifyBuilding : ''}
                                onInput={(e) => setData(e.target.value)}
                            ></daikin-text-field>
                        </daikin-input-group>
                    </div>
                    <daikin-input-group
                        label={alertFormModalText.type}
                        required="*"
                    >
                        <daikin-radio-group
                            label="Type"
                            value={type}
                            onInput={(e) => setType(e.target.value)}
                        >
                            <daikin-radio
                                name="type"
                                id="type"
                                value="cumulative"
                                label={alertFormModalText.cumulative}
                            ></daikin-radio>
                            <daikin-radio
                                name="type"
                                id="type"
                                value="instantaneous"
                                label={alertFormModalText.instantaneous}
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
                <daikin-button onClick={handleCancel} variant="outline">
                    {alertFormModalText.cancel}
                </daikin-button>
                <daikin-button onClick={handleSave} disabled={!isFormValid()}>
                    {alertFormModalText.save}
                </daikin-button>
            </daikin-modal-footer>
        </daikin-modal>
    );
};

export default AlertFormModal;
