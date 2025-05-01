import React, { useState } from 'react';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ArrowTopRightOnSquareIcon, UserCircleIcon } from '@heroicons/react/24/solid';

import { useUserContext } from '../context/Auth/context';
import { accountManagement, logout } from '../context/Auth/keycloak';
import '../webcomponents';
import { userText } from '../text.json';

const User = ({ language = 'en' }) => {
    const user = useUserContext();
    const [menu, setMenu] = useState('main');

    return (
        <Popover>
            <PopoverButton className="focus:outline-none">
                <daikin-icon-button color="neutral" variant="ghost">
                    <UserCircleIcon />
                </daikin-icon-button>
            </PopoverButton>
            <PopoverPanel anchor="bottom end" className="shadow">
                {menu === 'main' && (
                    <daikin-card className="flex w-80 flex-col">
                        <div className="flex flex-col">
                            <span>
                                {language === 'ja' ? userText.ja.signedIn : userText.en.signedIn}
                            </span>
                            <span className="flex flex-wrap font-(--dds-font-weight-bold) break-all">
                                {user?.preferred_username}
                            </span>
                        </div>
                        <div className="-mx-4 border-y-1 border-(--dds-color-divider) py-2">
                            <daikin-list>
                                <daikin-list-item onClick={() => setMenu('profile')}>
                                    {language === 'ja' ? userText.ja.profile : userText.en.profile}
                                    <daikin-icon
                                        color="current"
                                        icon="chevron-right"
                                        slot="right-icon"
                                    ></daikin-icon>
                                </daikin-list-item>
                            </daikin-list>
                        </div>
                        <daikin-card-footer>
                            <daikin-button
                                className="w-full"
                                onClick={logout}
                                variant="outline"
                            >
                                {language === 'ja' ? userText.ja.signOut : userText.en.signOut}
                            </daikin-button>
                        </daikin-card-footer>
                    </daikin-card>
                )}
                {menu === 'profile' && (
                    <daikin-card className="flex w-80 flex-col">
                        <daikin-icon-button
                            color="neutral"
                            onClick={() => setMenu('main')}
                            variant="ghost"
                        >
                            <daikin-icon
                                color="current"
                                icon="chevron-left"
                            ></daikin-icon>
                        </daikin-icon-button>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <span className="font-(--dds-font-weight-bold)">
                                    {language === 'ja' ? userText.ja.name : userText.en.name}
                                </span>
                                <span className="flex flex-wrap break-all">
                                    {user?.given_name} {user?.family_name}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-(--dds-font-weight-bold)">
                                    {language === 'ja' ? userText.ja.email : userText.en.signedIn}
                                </span>
                                <span className="flex flex-wrap break-all">
                                    {user?.email}
                                </span>
                            </div>
                        </div>
                        <daikin-card-footer>
                            <daikin-button
                                className="w-full"
                                onClick={accountManagement}
                                variant="outline"
                            >
                                {language === 'ja' ? userText.ja.manageAccount : userText.en.manageAccount}
                                <ArrowTopRightOnSquareIcon
                                    slot="right-icon"
                                    className="h-6 w-6"
                                />
                            </daikin-button>
                        </daikin-card-footer>
                    </daikin-card>
                )}
            </PopoverPanel>
        </Popover>
    );
};

export default User;
