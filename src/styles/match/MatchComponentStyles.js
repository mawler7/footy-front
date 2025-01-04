import styled from 'styled-components';

export const MatchItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.small};

  cursor: pointer;

  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
    box-shadow: ${({ theme }) => theme.shadows.default};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const StarContainer = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  margin-left: 3px;
  margin-right: 5px;

  svg {
    font-size: 24px;
    cursor: pointer;
    color: ${({ theme }) =>
    theme.mode === 'light' ? '#000000' : theme.colors.text};
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 18px;
    }
  }
`;

export const StatusContainer = styled.div`
  width: max(150px);
  align-items: center;
  text-align: center;
 color: ${({ theme }) =>
    theme.mode === 'light' ? '#000000' : theme.colors.text};
  font-weight: bold;
`;

export const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 200px;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const MatchScore = styled.span`
  width: 100%;
  max-width: 50px;
  font-weight: bold;
  font-size: 12px;
  margin: 4px 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const MatchOddsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-left: auto;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
    box-shadow: ${({ theme }) => theme.shadows.default};
  }
`;

export const MatchOddsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

export const MatchOddCell = styled.div`
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
`;

export const ScoresContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30px;
`;


// Nowe style
export const FixturesTeamLogo = styled.img`
  height: max(22px);
  width: max(22px);
  object-fit: contain;
  margin-right: ${({ theme }) => theme.spacing.small};
`;

export const Status = styled.span`
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
`;

export const PredictionContainer = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 11px;
  line-height: 1.2;
`;

export const PredictionText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  line-height: 1.4;
`;

export const TeamWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
`;