import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { LogoutButton, SortButton, ToggleButton } from '../../../styles/buttons/buttons';
import { SettingsContainer, Option, Label, ButtonGroup, Dropdown, } from '../../../styles/navbar/navbarStyles';
import { UserContext } from '../../context/UserContext';
import { TIMEZONES } from '../../../utils/helpers';
import useDebouncedSave from '../../../hooks/navbar/useDebouncedSave';

const SettingsMenu = () => {
    const { preferences, updatePreferences, toggleTheme, logout } = useContext(UserContext);
    const debouncedSave = useDebouncedSave(updatePreferences);

    const handleSortChange = (sortType) => {
        debouncedSave({ sortType });
    };

    const handleTimezoneChange = (event) => {
        updatePreferences({ timezone: event.target.value });
    };

    return (
        <SettingsContainer>
            <Option>
                <ToggleButton onClick={toggleTheme}>
                    <FontAwesomeIcon icon={preferences.darkMode ? faMoon : faSun} />
                    {preferences.darkMode ? 'Dark Mode' : 'Light Mode'}
                </ToggleButton>
            </Option>

            <Option>
                <Label>Sort by:</Label>
                <ButtonGroup>
                    <SortButton
                        $isActive={preferences.sortType === 'LEAGUE_NAME'}
                        onClick={() => handleSortChange('LEAGUE_NAME')}
                    >
                        League
                    </SortButton>
                    <SortButton
                        $isActive={preferences.sortType === 'TIME'}
                        onClick={() => handleSortChange('TIME')}
                    >
                        Time
                    </SortButton>
                </ButtonGroup>
            </Option>

            <Option>
                <Label>Time Zone:</Label>
                <Dropdown value={preferences.timezone} onChange={handleTimezoneChange}>
                    {TIMEZONES.map((zone) => (
                        <option key={zone} value={zone}>
                            {zone}
                        </option>
                    ))}
                </Dropdown>
            </Option>

            <LogoutButton onClick={logout}>Log out</LogoutButton>
        </SettingsContainer>
    );
};

export default SettingsMenu;