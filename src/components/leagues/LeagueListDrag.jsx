import React, { memo } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
    LeagueItem,
    TooltipWrapper,
    FlagLogo,
    Tooltip,
    LeagueContainerName,
} from '../../styles/league/LeaguesStyles';

const LeagueListDrag = ({ leagues, onDragEnd }) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="leagues">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {leagues.map((league, index) => (
                        <Draggable key={league.id} draggableId={String(league.id)} index={index}>
                            {(provided, snapshot) => {
                                const draggableStyle = {
                                    ...provided.draggableProps.style,
                                    opacity: snapshot.isDragging ? 0.6 : 1,
                                    backgroundColor: snapshot.isDragging ? 'rgba(68, 76, 78, 0.8)' : undefined,
                                };

                                return (
                                    <LeagueItem
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={draggableStyle}
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
                                );
                            }}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>
);

export default memo(LeagueListDrag);
