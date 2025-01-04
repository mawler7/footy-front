import styled from 'styled-components';

export const LeagueHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.medium};
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;


  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.spacing.small};
  }
`;

export const LeagueLogo = styled.img`
  height: 65px;
  width: 65px;
  object-fit: contain;
  border-radius: 8px;  
  box-shadow: ${({ theme }) => theme.shadows.light};

  padding: ${({ theme }) => theme.spacing.small};
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }

  ${({ theme }) => theme.media.tablet} {
    height: 56px;
    width: 56px;
  }
`;

export const LeagueInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xsmall};

  border-radius: 10px;  
`;

export const LeagueName = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;


  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    text-align: center;
  }
`;

export const Season = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    text-align: center;
  }
`;

export const Placeholder = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;

  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.backgroundOverlay};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.light};
`;
