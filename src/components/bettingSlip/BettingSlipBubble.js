import React, { useState, useEffect, useContext } from "react";
import { FaChevronDown, FaChevronUp, FaTrashAlt, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { AuthContext } from '../context/AuthContext';

const BettingSlipBubble = ({ bettingSlip = [], setBettingSlip, showBubble, setShowBubble }) => {
    const [stake, setStake] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [savedSlips, setSavedSlips] = useState([]);
    const [isSavedSlipsOpen, setIsSavedSlipsOpen] = useState(false);
    const [editedValues, setEditedValues] = useState([]);
    const { userPreferences = {}, savePreferences } = useContext(AuthContext);

    const [timezone, setTimezone] = useState(userPreferences.timezone || 'GMT+1');
    const [sortType, setSortType] = useState(userPreferences.sortType || 'LEAGUE_NAME');
    const [darkMode, setDarkMode] = useState(userPreferences.darkMode || false);

    useEffect(() => {
        const savedSlipsFromStorage = localStorage.getItem("savedBettingSlips");
        if (savedSlipsFromStorage) {
            setSavedSlips(JSON.parse(savedSlipsFromStorage));
        }
    }, []);

    useEffect(() => {
        const needsUpdate = bettingSlip.some((bet, index) => {
            const existingValue = editedValues[index];
            return (
                !existingValue ||
                existingValue.value !== (bet.betName || "N/A") ||
                existingValue.betName !== (bet.oddValue || "Unknown Bet") ||
                existingValue.odd !== (bet.odd || 1)
            );
        });

        if (needsUpdate) {
            const initialEditedValues = bettingSlip.map((bet) => ({
                betName: bet.oddValue || "Unknown Bet",
                value: bet.betName || "N/A",
                odd: bet.odd || 1,
            }));
            setEditedValues(initialEditedValues);
        }
    }, [bettingSlip, editedValues]);

    const calculateTotalOdds = () => {
        if (!bettingSlip.length) return "1.00";

        const totalOdds = bettingSlip.reduce((acc, bet) => {
            const odd = parseFloat(bet.odd || 1);
            return acc * odd;
        }, 1);

        return totalOdds.toFixed(2);
    };

    const calculatePotentialWinnings = () => {
        if (stake <= 0) return "0.00";
        const totalOdds = parseFloat(calculateTotalOdds());
        const potentialWinnings = stake * totalOdds * 0.88 * (1 + bonus / 100);
        return potentialWinnings.toFixed(2);
    };

    const handleRemoveBet = (index) => {
        const updatedSlip = bettingSlip.filter((_, i) => i !== index);
        setBettingSlip(updatedSlip);
    };

    const saveBettingSlip = () => {
        if (!bettingSlip.length) {
            alert("Cannot save an empty betting slip.");
            return;
        }

        const slipName = `${new Date().toISOString().split("T")[0]} - Odds: ${calculateTotalOdds()}, Stake: ${stake}€, Winnings: ${calculatePotentialWinnings()}€`;
        const newSlip = {
            id: new Date().getTime(),
            name: slipName,
            bettingSlip,
            stake,
            totalOdds: calculateTotalOdds(),
            potentialWinnings: calculatePotentialWinnings(),
        };

        const updatedSlips = [...savedSlips, newSlip];
        setSavedSlips(updatedSlips);
        localStorage.setItem("savedBettingSlips", JSON.stringify(updatedSlips));

        setBettingSlip([]);
        setStake(0);
        setBonus(0);

        alert("Betting slip saved and cleared!");
    };

    const loadSavedSlip = (slip) => {
        const updatedSlip = [...bettingSlip];
        slip.bettingSlip.forEach((bet) => {
            if (!updatedSlip.some((existingBet) => existingBet.betName === bet.betName && existingBet.value === bet.value)) {
                updatedSlip.push(bet);
            }
        });
        setBettingSlip(updatedSlip);
    };

    return (
        <>
            {showBubble && (
                <BubbleContainer>
                    <BubbleHeader>
                        <SavedSlipsToggleButton onClick={() => setIsSavedSlipsOpen(!isSavedSlipsOpen)}>
                            {isSavedSlipsOpen ? <FaChevronUp /> : <FaChevronDown />}
                            <span style={{ marginLeft: "8px" }}>My Bets</span>
                        </SavedSlipsToggleButton>
                        <CloseButton onClick={() => setShowBubble(false)}>X</CloseButton>
                    </BubbleHeader>

                    {isSavedSlipsOpen && savedSlips.length > 0 && (
                        <SavedSlipsContainer>
                            {savedSlips.map((slip) => (
                                <SavedSlipItem key={slip.id} onClick={() => loadSavedSlip(slip)}>
                                    <span>{slip.name}</span>
                                    <DeleteButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const filteredSlips = savedSlips.filter((s) => s.id !== slip.id);
                                            setSavedSlips(filteredSlips);
                                            localStorage.setItem("savedBettingSlips", JSON.stringify(filteredSlips));
                                        }}
                                    >
                                        <FaTrashAlt />
                                    </DeleteButton>
                                </SavedSlipItem>
                            ))}
                        </SavedSlipsContainer>
                    )}

                    <BubbleContent>
                        {bettingSlip.map((bet, index) => (
                            <BubbleItem key={index}>
                                <DeleteBetButton onClick={() => handleRemoveBet(index)}>
                                    <FaTimes size={10} />
                                </DeleteBetButton>
                                <TeamNames>{bet.matchInfo || "Unknown Team"}</TeamNames> {/* Zmieniono na matchInfo */}
                                <EditableRow>
                                    <EditableInput
                                        type="text"
                                        value={bet.betName || ""}
                                        onChange={(e) => {
                                            const updatedSlip = [...bettingSlip];
                                            updatedSlip[index] = { ...updatedSlip[index], betName: e.target.value };
                                            setBettingSlip(updatedSlip);


                                            setEditedValues((prevState) => {
                                                const updated = [...prevState];
                                                updated[index] = { ...updated[index], betName: e.target.value };
                                                return updated;
                                            });
                                        }}
                                    />
                                    <EditableInput
                                        type="text"
                                        value={bet.value || ""}
                                        onChange={(e) => {
                                            const updatedSlip = [...bettingSlip];
                                            updatedSlip[index] = { ...updatedSlip[index], value: e.target.value };
                                            setBettingSlip(updatedSlip);

                                            setEditedValues((prevState) => {
                                                const updated = [...prevState];
                                                updated[index] = { ...updated[index], value: e.target.value };
                                                return updated;
                                            });
                                        }}
                                    />
                                </EditableRow>
                                <OddsInput
                                    type="number"
                                    step="0.01"
                                    value={bet.odd || 1}
                                    onChange={(e) => {
                                        const updatedSlip = [...bettingSlip];
                                        updatedSlip[index] = { ...updatedSlip[index], odd: parseFloat(e.target.value) || 1 };
                                        setBettingSlip(updatedSlip);

                                        setEditedValues((prevState) => {
                                            const updated = [...prevState];
                                            updated[index] = { ...updated[index], odd: parseFloat(e.target.value) || 1 };
                                            return updated;
                                        });
                                    }}
                                />
                            </BubbleItem>
                        ))}

                        <BubbleRowWrapper>
                            <BubbleItem>
                                <Label>Bonus:</Label>
                                <BonusInput
                                    type="number"
                                    value={bonus}
                                    onChange={(e) => setBonus(Math.max(0, parseFloat(e.target.value) || 0))}
                                />
                            </BubbleItem>
                            <BubbleItem>
                                <Label>Stake:</Label>
                                <StakeInput
                                    type="number"
                                    value={stake}
                                    onChange={(e) => setStake(Math.max(0, parseFloat(e.target.value) || 0))}
                                />
                            </BubbleItem>
                        </BubbleRowWrapper>

                        <TotalOdds>Total Odds: {calculateTotalOdds()}</TotalOdds>
                        <PotentialWinnings>
                            Potential Winnings: {calculatePotentialWinnings()}€
                        </PotentialWinnings>

                        <BubbleButtonGroup>
                            <ActionButton onClick={() => setBettingSlip([])}>Clear</ActionButton>
                            <ActionButton onClick={saveBettingSlip} disabled={!bettingSlip.length}>
                                Save
                            </ActionButton>
                        </BubbleButtonGroup>
                    </BubbleContent>
                </BubbleContainer>
            )}

            <FloatingButton onClick={() => setShowBubble(!showBubble)}>
                {showBubble ? "Close" : "Bet"}
            </FloatingButton>
        </>
    );
};

export default BettingSlipBubble;



const EditableRow = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const BubbleContainer = styled.div`
    position: fixed;
    top: 65px;
    
    max-width: 250px;
    min-width: 220px;
    background-color: rgba(28, 30, 36, 0.85);
    border-radius: 15px;
    padding: 5px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    color: #ecf0f1;
    z-index: 1000; /* Dodaj wysoki z-index */
`;

const CloseButton = styled.button`
    background: none;
    color: #bdc3c7;
 
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s, transform 0.2s;
    border-radius: 5px;
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

const SavedSlipsToggleButton = styled.button`
    background: transparent;
      border-radius: 5px;
    border: none;
    color: #bdc3c7;
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

const BubbleContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 5px;
    
`;

const ActionButton = styled.button`
  background: ${({ $isActive }) => ($isActive ? 'linear-gradient(135deg, #3a87ad, #3b9dbd)' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#a0a4a8')};
  border: none;
  border-radius: 5px;
  width: 80px;
  height: 24px;
  padding: 6px 12px;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 3px 6px rgba(58, 135, 173, 0.3)' : 'none')};

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

const EditableInput = styled.input`
    font-size: 12px;
    color: #bdc3c7;
    width: 100%;
    border: none;
    background: transparent;
    text-align: left;
    padding: 5px;
    border-bottom: 1px solid #34495e;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #1abc9c;
    }
`;

const OddsInput = styled.input`
    width: 55px;
    padding: 5px;
    font-size: 12px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #34495e;
    color: #ecf0f1;
  background-color: rgba(28, 30, 36, 0.85);
    transition: border-color 0.3s;

    &:focus {
        border-color: #1abc9c;
    }
`;

const BubbleRowWrapper = styled.div`
    display: flex;
    justify-content: space-between; /* Ustawienie pól na lewo i prawo */
    align-items: center;
    gap: 10px;
    background-color: transparent; /* Transparentne tło */
    border-radius: 5px;
  
`;
const SavedSlipItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: #ecf0f1;
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

const DeleteButton = styled.button`
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





const BubbleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 14px;
`;



const MatchDate = styled.div`
    color: #bdc3c7;
    font-size: 10px;
    text-align: left;
    margin-bottom: 5px;
`;

const TeamNames = styled.div`
    font-weight: bold;
    font-size: 10px;
    color: white;
    margin-top: 10px;
`;


const StakeInput = styled.input`
    width: 90px;
    padding: 3px;
    font-size: 12px;
    border-radius: 5px;
    text-align: right;
    border: 1px solid white;
    color: black;
    -moz-appearance: textfield; /* Firefox */
    -webkit-appearance: none; /* Chrome, Safari */
    appearance: none; /* Ogólne */
`;

const BonusInput = styled.input`
  width: 90px;
    padding: 3px;
    font-size: 12px;
    border-radius: 5px;
    text-align: right;
    border: 1px solid white;
    color: black;
    -moz-appearance: textfield; /* Firefox */
    -webkit-appearance: none; /* Chrome, Safari */
    appearance: none; /* Ogólne */
`;

const BubbleButtonGroup = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 10px;
`;

const TotalOdds = styled.div`
    color: white;
    font-size: 11px;
    text-align: center;
 
`;

const PotentialWinnings = styled.div`
    color: white;
    font-size: 11px;
    text-align: center;
    margin-top: 5px;
`;


const DeleteBetButton = styled.button`
    background: none;
    color: red;
    cursor: pointer;
    border: none;
    font-size: 11px;
    position: absolute;
    top: 2px;
    right: 2px;

`;


const SavedSlipsContainer = styled.div`
    background-color: #1e1e1e;
    border-radius: 5px;
    padding: 5px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 10px;
`;

const BubbleItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    margin-bottom: 10px;
    color: white;
    font-size: 12px;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    background-color: rgba(28, 30, 36, 0.85);
`;

const Label = styled.label`
    margin-top: 10px;
    margin-left: 10px;
 
    font-size: 10px;
    color: #bdc3c7;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #444444;
  }
`;