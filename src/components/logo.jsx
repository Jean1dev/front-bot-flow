import Gravatar from 'react-gravatar';
import { useUserAuth } from 'src/hooks/use-user-auth';

const Logo = (props) => {
    const { user } = useUserAuth();
    return (
        <Gravatar email={user?.email} size={31} {...props}/>
    );
};

export default Logo;