import UserInfo from "../components/UserInfo";
import BackButton from "../UI/BackButton";
import Button from "../UI/Button/Button";

export default function UserPage({ currentUser }) {
  return (
    <div className='relative'>
      <BackButton />
      <div className='pt-8 pb-10 px-5 border-b border-[#919191]'>
        <UserInfo currentUser={currentUser} />
        <div className='flex gap-5'>
          <Button size={"medium"}>Редактировать</Button>
          <Button
            size={"medium"}
            classNames={"black"}>
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}
