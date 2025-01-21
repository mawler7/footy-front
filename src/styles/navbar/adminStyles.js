import styled from "styled-components";

export const AdminAction = styled.div`
    display: flex;
    flex-direction: column; /* Input i przycisk w jednej kolumnie */
    gap: ${({ theme }) => theme.spacing.small};
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap; /* Zwijanie, jeśli zabraknie miejsca */
    gap: ${({ theme }) => theme.spacing.medium}; /* Odstępy między elementami */
    justify-content: flex-start; /* Wyrównanie do lewej */
    align-items: flex-start; /* Wyrównanie elementów do góry */
`;

export const ActionItem = styled.div`
    display: flex;
    flex-direction: column; /* Inputy i przycisk w jednej kolumnie */
    gap: ${({ theme }) => theme.spacing.xsmall}; /* Odstęp między inputami i przyciskiem */
    align-items: flex-start; /* Wyrównanie do lewej */
`;

export const ActionButton = styled.button`
    width: 80px;
    padding: ${({ theme }) => theme.spacing.xsmall} ${({ theme }) => theme.spacing.small};
    font-size: ${({ theme }) => theme.fontSizes.small};
    background-color: ${({ theme }) => theme.colors.divider};
    color: ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: none;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.colors.accentHover};
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
    }
    &:active {
        transform: scale(0.98);
    }
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
    margin-bottom: ${({ theme }) => theme.spacing.xsmall}; /* Zmniejszony odstęp */
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
width:110px;
    padding: ${({ theme }) => theme.spacing.xsmall};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px solid ${({ theme }) => theme.colors.divider};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
`;

