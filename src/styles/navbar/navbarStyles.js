import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: ${({ theme }) => theme.shadow};
    width: 100%;
 
  background-color: ${({ theme }) => theme.colors.primary};
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};
    padding: ${({ theme }) => theme.spacing.xsmall};

`;

export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
    margin-right: ${({ theme }) => theme.spacing.small};
    margin-left: ${({ theme }) => theme.spacing.small};
`;

export const BrandName = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
`;

export const SettingsDropdownMenu = styled.div`
  position: absolute;
    min-width: 150px;
  top: 50px;
  right: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
    background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
 

`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  padding-top: ${({ theme }) => theme.spacing.small};

`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
  
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  
`;

export const Dropdown = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.accent};
  }
`;
