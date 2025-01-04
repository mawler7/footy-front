import goalIcon from '../icons/goal.jpg';
import missedIcon from '../icons/missed.jpg';
import ownGoalIcon from '../icons/owngoal.jpg';
import redCardIcon from '../icons/red.jpg';
import yellowCardIcon from '../icons/yellow.jpg';
import subsIcon from '../icons/subs.jpg';
import varIcon from '../icons/var.jpg';

const iconMap = {
    goal: goalIcon,
    ownGoal: ownGoalIcon,
    substitution: subsIcon,
    subst: subsIcon,
    yellowCard: yellowCardIcon,
    redCard: redCardIcon,
    var: varIcon,
    missed: missedIcon,
};

const imgStyle = {
    width: '20px',
    height: '20px',
    border: '1px solid white',
    borderRadius: '50%',
};

export const getEventIcon = (event) => {

    const getIconType = () => {
        if (event?.type?.toLowerCase().includes('goal')) {
            return event?.detail?.toLowerCase().includes('own goal') ? 'ownGoal' : 'goal';
        }
        if (event?.type?.toLowerCase().includes('missed')) {
            return 'missed';
        }
        if (event?.type?.toLowerCase().includes('subst') || event?.detail?.toLowerCase().includes('substitution')) {
            return 'subst';
        }
        if (event?.type?.toLowerCase().includes('card')) {
            return event?.detail?.toLowerCase().includes('yellow') ? 'yellowCard' : 'redCard';
        }
        if (event?.type?.toLowerCase().includes('var')) {
            return 'var';
        }
        return null;
    };

    const iconType = getIconType(event);

    if (!iconType) return null;

    return <img src={iconMap[iconType]} alt={iconType} style={imgStyle} />;
};




