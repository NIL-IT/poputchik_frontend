import { useUserStore } from "../state/UserStore";
import Input from "../UI/Input/Input";

export default function UserInfo() {
  const { currentUser } = useUserStore();
  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='edit flex flex-col justify-center items-center mb-8'>
        <fieldset className={`change-file mb-2`}>
          <input
            id='change-file'
            className='visually-hidden'
            type='file'
            accept='image/*'
            disabled
          />
          <label
            style={{
              backgroundImage: `url(${currentUser.profile_photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            htmlFor='change-file'
            className='img-upload__label  img-upload__control'>
            Загрузить
          </label>
        </fieldset>
        <div className='profile-ratings gap-5 '>
          <p className='profile-stars'>4</p>
          <p className='profile-comments'>4.4</p>
        </div>
        <h1 className='font-bold text-[24px] leading-6 pt-6'>{currentUser.name}</h1>
      </div>
      <fieldset className='w-full flex flex-col justify-center items-center gap-5 mb-5'>
        <Input
          readOnly
          value={currentUser.phone_number}
        />
        <Input
          readOnly
          value={currentUser.email}
        />
        <Input
          readOnly
          value={currentUser.city}
        />
      </fieldset>
    </div>
  );
}
