import React from 'react';
import { Brand, Logo, BrandName, ButtonGroupContainer, } from '../../styles/navbar/navbarStyles';
import DBButton from './db/DBButton';
import AdminButton from './admin/AdminButton';
import BetButton from './bet/BetButton';
import HamburgerMenu from './settings/HamburgerMenu';
import { logoSrc } from '../../utils/iconUtils';
import { NavbarContainer } from '../../styles/content/AppContentStyles';

const Navbar = React.memo(() => {
  return (
    <NavbarContainer>
      <Brand to="/">
        <Logo src={logoSrc} alt="Logo" />
        <BrandName>FootyStars</BrandName>
      </Brand>
      <ButtonGroupContainer>
        <DBButton />
        <AdminButton />
        <BetButton />
        <HamburgerMenu />
      </ButtonGroupContainer>
    </NavbarContainer>
  );
});

export default Navbar;
