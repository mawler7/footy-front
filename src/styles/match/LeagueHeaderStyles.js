import styled from 'styled-components';

export const LeagueHeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.medium};
    
  }
  cursor: pointer;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.spacing.small};

  }
`;

export const LeagueLogo = styled.img`
  height: 40px;
  width:40px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.xsmall};
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }

  ${({ theme }) => theme.media.tablet} {
    height: 25px;
    width: 25px;
  }
`;

export const LeagueInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
    ${({ theme }) => theme.media.tablet} {

`;

export const LeagueName = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  ${({ theme }) => theme.media.tablet} {
    text-align: center;
        font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
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
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
`;
