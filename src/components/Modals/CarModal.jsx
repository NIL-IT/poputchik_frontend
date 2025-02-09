import { useModal } from "../../state/ModalStore";

export default function CarModal() {
  const { carPhoto, toggleCarModal } = useModal();
  return (
    <div className='absolute top-0 w-full min-h-screen flex items-center justify-center'>
      <div
        className='absolute inset-0 backdrop-blur-sm bg-black/30 z-10'
        onClick={() => toggleCarModal(false)}></div>
      <div className='relative z-20 w-[350px] h-[350px] bg-white rounded-lg py-5 px-4'>
        <img
          src={carPhoto}
          alt='Фото машины'
          className='w-full h-full'
        />
      </div>
    </div>
  );
}
