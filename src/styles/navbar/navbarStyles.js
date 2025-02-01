import styled from 'styled-components';
import { FlexContainer, DropdownBase, BrandLogo, BrandText } from '../shared/SharedStyles';
import { Link } from 'react-router-dom';

export const ButtonGroupContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  ${({ theme }) => theme.media.mobile} {
    flex-wrap: wrap; 
    justify-content: center;
  }
`;

export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

export const Logo = styled(BrandLogo)`
  margin-left: ${({ theme }) => theme.spacing.small};
`;

export const BrandName = styled(BrandText)``;

export const SettingsDropdownMenu = styled(FlexContainer)`
  position: absolute;
  top: 50px;
  right: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.default};
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: column;
  z-index: 999999; 
`;

export const SettingsContainer = styled(FlexContainer)`
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing.small};
`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text};
`;

export const Label = styled.label`
  width: 150px;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  text-align: right;
`;

export const ButtonGroup = styled(FlexContainer)`
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const Dropdown = styled(DropdownBase)``;
