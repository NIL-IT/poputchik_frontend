import { useModal } from "../../state/ModalStore";

export default function CarModal() {
  const { carPhoto, toggleCarModal } = useModal();

  return (
    <div className='w-[350px] bg-white rounded-lg p-4 m-4 z-50'>
      <img
        src={carPhoto}
        alt='Фото машины'
        className='w-full h-[350px] object-cover rounded-lg'
      />
    </div>
  );
}
