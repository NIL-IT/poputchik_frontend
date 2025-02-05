import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/UserStore";
import Avatar from "../Avatar/Avatar";
import Burger from "../Burger/Burger";
import Search from "../Search/Search";

export default function Header() {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  function goToChat() {
    navigate("/chat/1/4");
    console.log("first");
  }
  return (
    <div className='px-5 py-8 flex justify-between items-center absolute w-full z-10'>
      <div className='flex w-full justify-between'>
        <Burger onClick={goToChat} />
        <Search />
        <Avatar img={currentUser.profile_photo} />
      </div>
    </div>
  );
}
