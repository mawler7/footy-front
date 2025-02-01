import styled from "styled-components";

export const AdminAction = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.small};
`;

export const ActionItem = styled.div`
    display: flex;
    flex-direction: column; 
    gap: ${({ theme }) => theme.spacing.xsmall};
    align-items: flex-start; 
`;

export const AdminContainer = styled.div`
    padding: ${({ theme }) => theme.spacing.xsmall};
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows.default};
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
`;

export const AdminTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

export const AdminGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    width: 100%;
`;

export const LimitInfo = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StatusMessage = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.info};
`;

export const AdminList = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%; 
`;

export const AdminSection = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows.light};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.small};
    width: 100%;
`;

export const SectionTitle = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
    margin-bottom: ${({ theme }) => theme.spacing.xsmall}; 
`;

export const AdminFormGroup = styled.div`
   display: flex;
   flex-direction: column;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
width:105px;
text-align:center;
padding: ${({ theme }) => theme.spacing.xsmall};
font-size: ${({ theme }) => theme.fontSizes.xsmall};
border-radius: ${({ theme }) => theme.borderRadius};
border: 1px solid ${({ theme }) => theme.colors.divider};
background-color: ${({ theme }) => theme.colors.primary};
color: ${({ theme }) => theme.colors.text};
&:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
}
`;

export const Select = styled.select`
width:120px;
padding: ${({ theme }) => theme.spacing.xsmall};
font-size: ${({ theme }) => theme.fontSizes.xsmall};
border-radius: ${({ theme }) => theme.borderRadius};
border: 1px solid ${({ theme }) => theme.colors.divider};
background-color: ${({ theme }) => theme.colors.primary};
color: ${({ theme }) => theme.colors.text};
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xsmall} ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  color: #fff;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.accentHover});
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
  justify-content: flex-start;
  align-items: center;
`;