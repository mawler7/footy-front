import React, { memo } from 'react';
import {
    LeagueItem,
    FlagLogo,
    TooltipWrapper,
    Tooltip,
    LeagueContainerName,
} from '../../styles/league/LeaguesStyles';
import { ListContainer } from '../../styles/shared/SharedStyles';

const LeagueList = memo(({ leagues, navigate }) => (
    <ListContainer>
        {leagues.map((league) => (
            <LeagueItem
                key={league.id}
                onClick={() => navigate(`/league/${league.id}`)}
                style={{ cursor: 'pointer' }}
            >
                <TooltipWrapper>
                    <FlagLogo
                        src={league.type === 'League' ? league.flag : league.logo}
                        alt={league.name}
                        title={league.leagueName}
                        $leagueType={league.type}
                    />
                    <Tooltip>{league.leagueName}</Tooltip>
                </TooltipWrapper>
                <LeagueContainerName>
                    {league.leagueName.replace('UEFA', '').trim()}
                </LeagueContainerName>
            </LeagueItem>
        ))}
    </ListContainer>
));

export default LeagueList;
