// import { useState } from "react";

// const useBalance = () => {
//     const [balance, setBalance] = useState(0);

//     const calculateBalance = (savedSlips = []) => {
//         console.log("Saved slips:", savedSlips);

//         const winnings = savedSlips.reduce((total, slip) => {
//             const potentialWinnings = parseFloat(slip?.potentialWinnings || 0);
//             console.log("Slip winnings:", potentialWinnings);
//             return slip?.isWon ? total + potentialWinnings : total;
//         }, 0);

//         const stakes = savedSlips.reduce((total, slip) => {
//             const stake = parseFloat(slip?.stake || 0);
//             const isFreeBet = slip?.isFreeBet || false;
//             console.log("Slip stake:", stake, "Free bet:", isFreeBet);
//             return isFreeBet ? total : total + stake;
//         }, 0);

//         const calculatedBalance = parseFloat((winnings - stakes).toFixed(2));
//         console.log("Calculated balance:", calculatedBalance);

//         setBalance(calculatedBalance);
//     };

//     return { balance, calculateBalance };
// };

// export default useBalance;


import { useState } from "react";

const useBalance = () => {
    const [balance, setBalance] = useState(0);

    const calculateBalance = (savedSlips = []) => {
        const winnings = savedSlips.reduce((total, slip) => {
            return slip?.isWon ? total + parseFloat(slip.potentialWinnings || 0) : total;
        }, 0);

        const stakes = savedSlips.reduce((total, slip) => {
            return slip?.isFreeBet ? total : total + parseFloat(slip.stake || 0);
        }, 0);

        setBalance((winnings - stakes).toFixed(2));
    };

    return { balance, calculateBalance };
};

export default useBalance;
