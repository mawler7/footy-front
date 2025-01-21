import styled from 'styled-components';

export const MatchItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
  }
width: 435px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }

   ${({ theme }) => theme.media.mobile} {
  padding: ${({ theme }) => theme.spacing.xsmall};


    }
    
`;

export const StarContainer = styled.div`
  width: 4%;
  max-width:16px;
  display: flex;
  align-items: center;
  margin-left: 3px;
  margin-right: 15px;
    justify-content: flex-start;
  svg {
  font-size: ${({ theme }) => theme.fontSizes.large};
    cursor: pointer;
    color: ${({ theme }) =>
    theme.mode === 'light' ? '#000000' : theme.colors.text};
    transition: color 0.3s ease;
  }

 ${({ theme }) => theme.media.mobile} {
        width: 16px; 
   font-size: ${({ theme }) => theme.spacing.xsmall};

    }
      
  }
`;




export const MatchScore = styled.span`
  width: 100%;
  max-width: 50px;
  font-weight: bold;
  font-size: 12px;
  margin: 5px 0;
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => theme.media.mobile} {
  margin: 4px 5px;

    }
`;

export const PredictionText = styled.div`
  display: flex;
  flex-direction: column;
    text-align: left;
  justify-content: space-between;
  font-size: 10px;
  line-height: 1.2;
&.valid {
    color: green;
    font-weight: bold;
}

&.invalid {
    color: red;
    font-weight: normal;
}
  }
`;

export const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:50%;
  max-width:150px;
  gap: ${({ theme }) => theme.spacing.small};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.spacing.xsmall};
  }
`;

export const PredictionContainer = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Środkowanie w pionie */
  width: 36%; 
   width:150px;
  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.spacing.xsmall};
    width: 5%;
  }
`;



export const StatusContainer = styled.div`
  width: 7%;
      max-width: 40px;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  ${({ theme }) => theme.media.mobile} {
    width: 30px;
  }
`;


export const PredictionRow = styled.div`
  padding: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};

  &.correct {
    color: green;
    font-weight: bold;
  }
`;



export const MatchOddsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  border-radius: ${({ theme }) => theme.borderRadius};
width:6%;
max-width:40px;
  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

export const MatchOddsRow = styled.div`
  display: flex;
  padding: 3px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background-color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

export const MatchOddCell = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
    ${({ theme }) => theme.media.mobile} {
      font-size: 10px;
margin-left: 1px;
    }
`;

export const ScoresContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 10%;
  max-width:30px;
`;

export const FixturesTeamLogo = styled.img`
  height: max(22px);
  width: max(22px);
  object-fit: contain;
  margin-right: ${({ theme }) => theme.spacing.small};
    ${({ theme }) => theme.media.mobile} {
width: 20px;
  height: 20px;

    }
`;

export const Status = styled.span`
width: 15%;
max-width:20px;
    
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => theme.media.mobile} {
width: 2%;
    }
`;



export const TeamWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
`;