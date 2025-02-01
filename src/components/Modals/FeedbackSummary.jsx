import Button from "../../UI/Button/Button";
import goodReviewImg from "../../assets/icons/reviewCheck.png";
import badReviewImg from "../../assets/icons/badReview.png";

export default function FeedbackSummary({ isGood, closeFeedback }) {
  return (
    <div className='absolute top-0 w-full min-h-screen flex items-center justify-center'>
      <div className='absolute inset-0 backdrop-blur-sm bg-black/30 z-10'></div>

      <div className='relative z-20 w-[350px] h-[350px] bg-white rounded-lg py-5 px-4'>
        <div className='flex flex-col justify-between items-center h-full relative'>
          <button
            className='absolute top-0 right-1'
            onClick={closeFeedback}>
            <svg
              width='14'
              height='14'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.952 10L19.596 2.356C20.1347 1.81733 20.1347 0.942667 19.596 0.404C19.0573 -0.134667 18.1827 -0.134667 17.644 0.404L10 8.048L2.356 0.404C1.81733 -0.134667 0.942667 -0.134667 0.404 0.404C-0.134667 0.942667 -0.134667 1.81733 0.404 2.356L8.048 10L0.404 17.644C-0.134667 18.1827 -0.134667 19.0573 0.404 19.596C0.942667 20.1347 1.81733 20.1347 2.356 19.596L10 11.952L17.644 19.596C18.1827 20.1347 19.0573 20.1347 19.596 19.596C20.1347 19.0573 20.1347 18.1827 19.596 17.644L11.952 10Z'
                fill='#5A5A5A'
              />
            </svg>
          </button>
          <img
            src={isGood ? goodReviewImg : badReviewImg}
            alt='Отзыв'
            width={124}
            height={124}
          />
          <h4 className='text-[20px] leading-5 text-[#2A2A2A] pt-10'>{isGood ? "Спасибо" : "Нам очень жаль"}</h4>
          <p className='text-[14px] leading-4 text-[#898989] pt-4 text-center'>
            {isGood
              ? "Спасибо вам за ваш ценный отзыв"
              : "Мы продолжим совершенствовать наш сервис и порадуем вас в следующей поездке."}
          </p>
          <Button
            classNames='mt-8 w-full'
            onClick={closeFeedback}>
            Главная страница
          </Button>
        </div>
      </div>
    </div>
  );
}
