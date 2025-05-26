import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { useGetUsers } from '@/features/users/hooks/useGetUsers';

function UserMenu() {
  const { data: myInfo } = useGetUsers();

  return (
    <div>
      <span className="mr-2 text-base font-bold text-blue-700">
        {myInfo?.data.name}
      </span>
      <span className="pr-8">님 반갑습니다.</span>
      <LogoutButton />
    </div>
  );
}

export default UserMenu;
