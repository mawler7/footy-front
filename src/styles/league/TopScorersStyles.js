import styled from 'styled-components';

export const TopScorersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px; 
  margin-bottom: 10px;  
`;

export const FilterSelect = styled.select`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  font-weight: 500;
  border: 2px solid ${({ theme }) => theme.colors.accent};  
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 4px 8px; 
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover}; 
    color: ${({ theme }) => theme.colors.textInverted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

export const PlayerCard = styled.div`
  display: grid;
  grid-template-columns: 150px 250px ;
  align-items: center;  
  justify-content: center;  
  column-gap: 16px;  
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

export const PlayerDetails = styled.div`
  font-size: 0.85rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ClubLogo = styled.img`
  width: 18px;
  height: 18px;
  margin: 0 auto;
`;

export const PlayerStatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
  column-gap: 12px;  
  row-gap: 8px; 
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  text-align: center;
  gap: 8px;  
`;
export const StatsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
`;

export const StatsRow = styled.div`
  font-size: 0.7rem; 
  line-height: 1.2;
`;

export const SmallText = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
