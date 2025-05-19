import { useNavigate } from "react-router-dom";
import CloseBtn from "../components/NavigationButton/components/CloseBtn/CloseBtn";

export default function Info() {
  const navigate = useNavigate();

  return (
    <div className='flex  flex-col min-h-screen w-full'>
      <CloseBtn
        className='absolute top-[100px] right-5 w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback z-10'
        onClick={() => navigate("/")}
      />

      <div className='pt-[144px] pb-10 h-[170px] bg-orange-500 text-white p-8 text-[32px] leading-8 font-semibold w-full'>
        <h1>Информация о приложении</h1>
      </div>

      <div className='flex-1 w-full p-4 flex flex-col text-left text-[16px] '>
        <div className='leading-relaxed text-black'>
          <h2 className='text-base font-bold mb-2'>Как пользоваться приложением:</h2>

          <p>
            После прохождения регистрации вы можете выбрать начальную точку поездки и конечную, в зависимости от
            расстояния приложение автоматически рассчитывает стоимость поездки.
          </p>
          <p className='mt-2'>Также вы можете выбрать уже существующую поездку.</p>
          <p className='mt-2'>Оплата происходит во время поездки, только по карте.</p>
          <p className='mt-2'>
            Вывод средств производится только для самозанятых, вам нужно будет указать свой ИНН и ФИО.
          </p>

          <h3 className='mt-5 mb-2 font-bold leading-4'>Прайс-лист:</h3>
          <p>Поездки рассчитываются в зависимости от расстояния.</p>
          <p>1 км — 15 рублей.</p>
          <p>Поездки от 20 км — от 500 рублей.</p>
        </div>

        <div className='mt-4 text-[14px] pt-3'>
          <p>- ИП Пермякова Ульяна Александровна от 31 января 2025</p>
          <p>- ИНН 041107327983</p>
          <p>- ОГРНИП 325040000001210</p>
        </div>
      </div>
    </div>
  );
}
