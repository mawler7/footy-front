export const getHorizontalPosition = (
    lineIndex,
    totalLines,
    pitchWidth,
    isAway,
    isVertical,
    scaleFactor = 1
) => {
    const baseX = ((lineIndex + 1) / (totalLines + 1)) * (pitchWidth / 2);

    const adjustedX = isAway
        ? pitchWidth - baseX - (pitchWidth * 0.05)
        : baseX + (pitchWidth * 0.05);

    return Math.max(
        pitchWidth * 0.1,
        Math.min(adjustedX, pitchWidth * 0.9)
    ) * scaleFactor;
};




export const getVerticalPosition = (
    playerIndex,
    totalPlayers,
    pitchHeight,
    isVertical,
    isAway,
    scaleFactor = 1
) => {
    const baseY = ((playerIndex + 1) / (totalPlayers + 1)) * pitchHeight;

    const adjustedY = isAway
        ? pitchHeight - baseY
        : baseY;

    return adjustedY * scaleFactor;
};
