import React from 'react';
import {
  Brand,
  Logo,
  BrandName,
  ButtonGroupContainer,
} from '../../styles/navbar/navbarStyles';
import BetButton from './BetButton';
import HamburgerMenu from './HamburgerMenu';
import AdminButton from './AdminButton';
import { logoSrc } from '../../utils/iconUtils';
import DBButton from './DBButton';
import { NavbarContainer } from '../../styles/content/AppContentStyles';

const Navbar = ({
  toggleBettingSlip,
  showBubble,
  isAdminView,
  isDbView,
  toggleAdminView,
}) => {
  return (
    <NavbarContainer>
      <Brand to="/">
        <Logo src={logoSrc} alt="Logo" />
        <BrandName>FootyStars</BrandName>
      </Brand>

      <ButtonGroupContainer>
        <DBButton isDBView={isDbView} toggleAdminView={toggleAdminView} />
        <AdminButton isAdminView={isAdminView} toggleAdminView={toggleAdminView} />
        <BetButton toggleBettingSlip={toggleBettingSlip} showBubble={showBubble} />
        <HamburgerMenu />
      </ButtonGroupContainer>
    </NavbarContainer>
  );
};

export default Navbar;
