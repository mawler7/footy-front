import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FaEdit } from 'react-icons/fa';
import {
  Sidebar,
  Header,
  EditIcon,
  LeagueItem,
  LeagueContainerName,
  FlagLogo,
  TooltipWrapper,
  Tooltip,
} from '../../styles/league/LeaguesStyles';
import { useLeagues } from '../../hooks/leagues/useLeagues';
import LeagueWrapper from '../league/League';
import { ListContainer } from '../../styles/shared/SharedStyles';

const Leagues = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const [isDragEnabled, setIsDragEnabled] = useState(false);

  const { leagues, onDragEnd } = useLeagues(isLoggedIn);

  if (leagueId) {
    return <LeagueWrapper teamMode={false} leagues={leagues} />;
  }

  return (
    <Sidebar>
      <Header>
        <EditIcon onClick={() => setIsDragEnabled((prev) => !prev)} title="Edit leagues order">
          <FaEdit color={isDragEnabled ? 'yellow' : 'white'} />
        </EditIcon>
        My leagues

      </Header>
      {isDragEnabled ? (
        <LeagueListDrag leagues={leagues} onDragEnd={onDragEnd} />
      ) : (
        <LeagueList leagues={leagues} navigate={navigate} />
      )}
    </Sidebar>
  );
};

const LeagueList = React.memo(({ leagues, navigate }) => (
  <ListContainer>
    {leagues.map((league) => (
      <LeagueItem key={league.id} onClick={() => navigate(`/league/${league.id}`)}>
        <TooltipWrapper>
          <FlagLogo
            src={league.type === 'League' ? league.flag : league.logo}
            alt={league.name}
            title={league.leagueName}
            $leagueType={league.type}
          />
          <Tooltip>{league.leagueName}</Tooltip>
        </TooltipWrapper>
        <LeagueContainerName>{league.leagueName.replace('UEFA', '').trim()}</LeagueContainerName>
      </LeagueItem>
    ))}
  </ListContainer>
));

const LeagueListDrag = ({ leagues, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="leagues">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {leagues.map((league, index) => (
            <Draggable key={league.id} draggableId={String(league.id)} index={index}>
              {(provided, snapshot) => (
                <LeagueItem
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    opacity: snapshot.isDragging ? 0.6 : 1,
                    backgroundColor: snapshot.isDragging ? 'rgba(68, 76, 78, 0.8)' : undefined,
                  }}
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
                  <LeagueContainerName>{league.leagueName.replace('UEFA', '').trim()}</LeagueContainerName>
                </LeagueItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export default Leagues;
