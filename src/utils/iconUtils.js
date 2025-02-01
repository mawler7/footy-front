import goalIcon from '../icons/goal.jpg';
import missedIcon from '../icons/missed.jpg';
import ownGoalIcon from '../icons/owngoal.jpg';
import redCardIcon from '../icons/red.jpg';
import yellowCardIcon from '../icons/yellow.jpg';
import subsIcon from '../icons/subs.jpg';
import varIcon from '../icons/var.jpg';
import { EventIcon } from '../styles/match/LineupsStyles';

export const getEventIcon = (event) => {
    if (!event?.type) return null;

    const eventType = event.type.toLowerCase();

    if (eventType.includes('goal')) {
        return (
            <EventIcon
                src={event.detail?.toLowerCase().includes('own goal') ? ownGoalIcon : goalIcon}
                alt="goal"
            />
        );
    }

    if (eventType.includes('missed')) {
        return <EventIcon src={missedIcon} alt="missed" />;
    }

    if (eventType.includes('subst')) {
        return <EventIcon src={subsIcon} alt="substitution" />;
    }

    if (eventType.includes('card')) {
        const isYellowCard = event.detail?.toLowerCase().includes('yellow');
        return <EventIcon src={isYellowCard ? yellowCardIcon : redCardIcon} alt="card" />;
    }

    if (eventType.includes('var')) {
        return <EventIcon src={varIcon} alt="var" />;
    }

    return null;
};

export const logoSrc = "https://cdn-icons-png.flaticon.com/512/287/287221.png";
