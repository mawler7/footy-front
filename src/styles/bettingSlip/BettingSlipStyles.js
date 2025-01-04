import styled from "styled-components";

const theme = {
  colors: {
    primary: "rgba(28, 30, 36, 0.8)",
    secondary: "#34495e",
    accent: "#1abc9c",
    accentHover: "#3b9dbd",
    danger: "#e74c3c",
    text: "#ecf0f1",
    mutedText: "#bdc3c7",
    background: "rgba(28, 30, 36, 0.85)",
  },
  spacing: {
    small: "5px",
    medium: "10px",
    large: "15px",
  },
  borderRadius: "8px",
  shadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
};

export const EditableRow = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const BubbleContainer = styled.div`
  position: fixed;
  top: 60px;
  width: 215px;

  border-radius: ${theme.borderRadius};
 

  
  z-index: 1000;

  @media (max-width: 768px) {
    top: 50px;
    width: 90%; /* Dostosowanie do mniejszych ekranów */
    left: 5%;
  }
`;

export const BubbleContainerWrapper = styled.div`
 
  top: 60px;
  width: 220px;
 

 

  color: ${theme.colors.text};
  z-index: 1000;

  @media (max-width: 768px) {
    top: 50px;
    width: 90%; /* Dostosowanie do mniejszych ekranów */
    left: 5%;
  }
`;



export const CloseButton = styled.button`
  background: none;

  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;


export const SavedSlipsToggleButton = styled.button`
    background: transparent;
      border-radius: 5px;
    border: none;
  
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: color 0.3s, transform 0.2s;

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
`;

export const BubbleContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 5px;

`;

export const ActionButton = styled.button`


  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;


export const EditableInput = styled.input`
       font-size: 0.7rem;

  width: 100%;
  border: none;
  border-radius: ${theme.borderRadius};
  text-align: left;
padding: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${theme.colors.secondary};
  transition: border-color 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
  }

  &::placeholder {
    color: ${theme.colors.mutedText};
  }
`;


export const OddsInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.divider};
       font-size: 0.7rem;

  padding: ${({ theme }) => theme.spacing.xsmall};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }
`;

export const BubbleRowWrapper = styled.div`
    display: flex;
    justify-content: space-between; /* Ustawienie pól na lewo i prawo */
    align-items: center;
    gap: 10px;

    border-radius: 5px;
  
`;
export const SavedSlipItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;

    margin-bottom: 5px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

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
`;

export const DeleteButton = styled.button`
    background: none;
    color: #e74c3c;
    border: none;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.3s, transform 0.2s;
    border-radius: 5px;
  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgba(255, 255, 255, 0.08)' : 'linear-gradient(135deg, #3b9dbd, #3a87ad)')};
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
`;





export const BubbleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;

  border-bottom: 1px solid ${theme.colors.secondary};

`;




export const MatchDate = styled.div`
    color: #bdc3c7;
    font-size: 10px;
    text-align: left;
 
`;

export const TeamNames = styled.div`
    font-weight: bold;
      font-size: 0.7rem;
    color: white;
    margin-top: 10px;
`;


export const StakeInput = styled.input`
    width: 80px;
 padding: ${({ theme }) => theme.spacing.xsmall};
      font-size: 0.8rem;
    border-radius: 5px;
    text-align: right;
    border: 1px solid white;

    -moz-appearance: textfield; /* Firefox */
    -webkit-appearance: none; /* Chrome, Safari */
    appearance: none; /* Ogólne */
`;

export const BonusInput = styled.input`
    width: 80px;
 padding: ${({ theme }) => theme.spacing.xsmall};
    font-size: 0.8rem;
    border-radius: 5px;
    text-align: right;
    border: 1px solid white;
 
    -moz-appearance: textfield; /* Firefox */
    -webkit-appearance: none; /* Chrome, Safari */
    appearance: none; /* Ogólne */
`;

export const BubbleButtonGroup = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 10px;
`;

export const TotalOdds = styled.div`
    color: white;
    font-size: 13px;
    text-align: center;
 
`;

export const PotentialWinnings = styled.div`
    color: white;
    font-size: 14px;
    text-align: center;
    margin-top: 5px;
`;


export const DeleteBetButton = styled.button`
    background: none;
    color: red;
    cursor: pointer;
    border: none;
    font-size: 13px;
    position: absolute;
    top: 2px;
    right: 2px;

`;


export const SavedSlipsContainer = styled.div`

    border-radius: 5px;
    padding: 5px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 10px;
`;

export const BubbleItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    margin-bottom: 10px;

    font-size: 12px;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

`;

export const Label = styled.label`

 
 
    font-size: 10px;

`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;

  border: none;

  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;


  &:hover {
    background-color: #444444;
  }
`;