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
} from '../../styles/league/LeagueContainerStyles';
import { useLeagues } from '../../hooks/leagues/useLeagues';
import LeagueWrapper from '../league/League';

const LeaguesContainer = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const [isDragEnabled, setIsDragEnabled] = useState(false);

  const { leagues, onDragEnd } = useLeagues(isLoggedIn);

  if (leagueId) {
    return <LeagueWrapper teamMode={false} leagues={leagues} />;
  }

  return (
    <>
      <Sidebar>
        <Header>
          Leagues
          <EditIcon onClick={() => setIsDragEnabled((prev) => !prev)} title="Edit leagues order">
            <FaEdit color={isDragEnabled ? 'yellow' : 'white'} />
          </EditIcon>
        </Header>
        {isDragEnabled ? (
          <LeagueListDrag leagues={leagues} onDragEnd={onDragEnd} />
        ) : (
          <LeagueList leagues={leagues} navigate={navigate} />
        )}
      </Sidebar>
    </>
  );
};

const LeagueList = React.memo(({ leagues, navigate }) => (
  <div>
    {leagues.map((league) => (
      <LeagueItem key={league.id} onClick={() => navigate(`/league/${league.id}`)}>
        <FlagLogo src={league.type === 'League' ? league.flag : league.logo} alt={league.name} />
        <LeagueContainerName>{league.leagueName.replace("UEFA", "").trim()}</LeagueContainerName>

      </LeagueItem>
    ))}
  </div>
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
                    backgroundColor: snapshot.isDragging
                      ? 'rgba(68, 76, 78, 0.8)'
                      : undefined,
                  }}
                >
                  <FlagLogo
                    src={league.type === 'League' ? league.flag : league.logo}
                    alt={league.name}
                  />
                  <LeagueContainerName>{league.leagueName.replace("UEFA", "").trim()}</LeagueContainerName>
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

export default LeaguesContainer;
