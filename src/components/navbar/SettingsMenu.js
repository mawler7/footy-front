import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import {
    LogoutButton,
    SortButton,
    ToggleButton,
} from '../../styles/buttons/buttons';
import {
    SettingsContainer,
    Option,
    Label,
    ButtonGroup,
    Dropdown,
} from '../../styles/navbar/navbarStyles';
import { useTheme } from '../context/ThemeContext';
import { PreferencesContext } from '../context/PreferencesContext';
import { AuthContext } from '../context/AuthContext';
import { TIMEZONES } from '../../utils/timezones';
import useDebouncedSave from '../../hooks/navbar/useDebouncedSave';

const SettingsMenu = () => {
    const { darkMode, toggleTheme } = useTheme();
    const { preferences, updatePreferences } = useContext(PreferencesContext);
    const { logout } = useContext(AuthContext);
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
                    <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
                    {darkMode ? 'Dark Mode' : 'Light Mode'}
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
