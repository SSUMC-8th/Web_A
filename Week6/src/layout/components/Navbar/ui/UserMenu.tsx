import LogoutButton from '../../../../components/LogoutButton/LogoutButton';
import { useAuth } from '../../../../context/AuthContext';

function UserMenu() {
    const { myInfo } = useAuth();

    return (
        <div>
            <span className="text-base font-bold text-blue-700">
                {myInfo?.data.name}
            </span>
            <span className="pr-8">님 반갑습니다.</span>
            <LogoutButton />
        </div>
    );
}

export default UserMenu;
