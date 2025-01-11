import Avatar from "../Avatar/Avatar";
import Burger from "../Burger/Burger";
import Search from "../Search/Search";

export default function Header({ currentUser }) {
  return (
    <div className='px-5 py-8 flex justify-between items-center'>
      <Burger />
      <Search />
      <Avatar img={currentUser.avatar} />
    </div>
  );
}
