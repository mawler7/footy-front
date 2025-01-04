import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSun, faMoon, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import debounce from 'lodash/debounce';
import {
  HamburgerButton,
  LogoutButton,
  SettingsButton,
  SortButton,
  ToggleButton,
} from '../../styles/buttons/buttons';
import {
  NavbarContainer,
  Brand,
  Logo,
  BrandName,
  SettingsDropdownMenu,
  SettingsContainer,
  Option,
  Label,
  ButtonGroup,
  Dropdown,
} from '../../styles/navbar/navbarStyles';

const timezones = [...Array.from({ length: 27 }, (_, i) => `GMT${i - 12 > 0 ? '+' : ''}${i - 12}:00`)];

const Navbar = () => {
  const { logout, userPreferences, savePreferences, toggleTheme } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    closeMenu();
  };

  const debouncedSavePreferences = useRef(debounce(savePreferences, 300)).current;

  const handleSortChange = (sortType) => {
    debouncedSavePreferences({ ...userPreferences, sortType });
  };

  const handleTimezoneChange = (event) => {
    savePreferences({ ...userPreferences, timezone: event.target.value });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setShowSettings(false);
  };

  const handleClickOutside = (event) => {
    if (
      !menuRef.current?.contains(event.target) &&
      !buttonRef.current?.contains(event.target)
    ) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <NavbarContainer>
      <Brand to="/">
        <Logo src="https://cdn-icons-png.flaticon.com/512/287/287221.png" alt="Football Logo" />
        <BrandName>FootyStars</BrandName>
      </Brand>

      <HamburgerButton
        ref={buttonRef}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <FontAwesomeIcon
          icon={isMenuOpen ? faTimes : faBars}
          size="2x"
          color={userPreferences.darkMode ? '#ffffff' : '#000000'}
        />

      </HamburgerButton>

      {isMenuOpen && (
        <SettingsDropdownMenu ref={menuRef}>
          <SettingsButton onClick={() => setShowSettings((prev) => !prev)}>
            <FontAwesomeIcon icon={faCog} /> Settings
          </SettingsButton>
          {!showSettings && <LogoutButton onClick={handleLogout}>Log out</LogoutButton>}
          {showSettings && (
            <SettingsContainer>
              <Option>
                <ToggleButton onClick={toggleTheme}>
                  <FontAwesomeIcon icon={userPreferences.darkMode ? faMoon : faSun} />
                  {userPreferences.darkMode ? 'Dark Mode' : 'Light Mode'}
                </ToggleButton>
              </Option>
              <Option>
                <Label>Sort by:</Label>
                <ButtonGroup>
                  <SortButton
                    $isActive={userPreferences.sortType === 'LEAGUE_NAME'}
                    onClick={() => handleSortChange('LEAGUE_NAME')}
                  >
                    League
                  </SortButton>
                  <SortButton
                    $isActive={userPreferences.sortType === 'TIME'}
                    onClick={() => handleSortChange('TIME')}
                  >
                    Time
                  </SortButton>
                </ButtonGroup>
              </Option>
              <Option>
                <Label>Time Zone:</Label>
                <Dropdown value={userPreferences.timezone} onChange={handleTimezoneChange}>
                  {timezones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </Dropdown>
              </Option>
            </SettingsContainer>
          )}
        </SettingsDropdownMenu>
      )}
    </NavbarContainer>
  );
};
export default Navbar;
