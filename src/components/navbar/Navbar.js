import React, { useState, useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSun, faMoon, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import debounce from 'lodash/debounce';

const timezones = [...Array.from({ length: 27 }, (_, i) => `GMT${i - 12 > 0 ? '+' : ''}${i - 12}:00`)];

const Navbar = () => {
  const { logout, userPreferences, savePreferences } = useContext(AuthContext);
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

  const handleDarkModeToggle = () => {
    savePreferences({ ...userPreferences, darkMode: !userPreferences.darkMode });
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
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="2x" />
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
                <ToggleButton onClick={handleDarkModeToggle}>
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

// Styled-components
export const NavbarContainer = styled.nav`
  position: fixed;  
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;  
  background-color: #1e1e1e;
  z-index: 100;  
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: white;
`;

export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export const BrandName = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: bold;
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;

  div {
    width: 100%;
    height: 3px;
    background-color: white;
    transition: transform 0.3s ease;
  }
      &:hover {
    background: ${({ $isActive }) => ($isActive ? 'linear-gradient(135deg, #3b9dbd, #3a87ad)' : 'rgba(255, 255, 255, 0.08)')};
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(58, 135, 173, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(58, 135, 173, 0.4);
  }

  &:active {
    transform: scale(0.97);
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    div:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    div:nth-child(2) {
      opacity: 0;
    }
    div:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}
`;

export const SettingsDropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 5px;
          background-color: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 200px;
`;

export const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  padding: 8px 12px;

  svg {
    margin-right: 8px;
  }
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 10px;
  border-top: 1px solid #444;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  background: #444;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  padding: 8px 12px;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  span {
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const SortButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: ${({ $isActive }) => ($isActive ? "#555" : "#333")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

export const Dropdown = styled.select`
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border: 1px solid #777;
  }
`;

export const LogoutButton = styled(SettingsButton)`
  background-color: #e74c3c;
  color: white;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #c0392b;
  }
`;