import { useState } from "react";
import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
import FeedbackSummary from "./FeedbackSummary";
import { createReviewByDriver } from "../../api/driver";
import { useUserStore } from "../../state/UserStore";
import Button from "../Button/Button";

export default function FeedBack() {
  const [grade, setGrade] = useState(-1);
  const [error, setError] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const { setFeedbackTarget, feedbackTarget } = useTrip();
  const { toggleFeedback } = useModal();
  const [step, setStep] = useState(0);
  const { currentUser } = useUserStore();

  function renderReview() {
    switch (grade) {
      case 1:
        return "Ужасно";
      case 2:
        return "Плохо";
      case 3:
        return "Нормально";
      case 4:
        return "Хорошо";
      case 5:
        return "Отлично";
      default:
        return "";
    }
  }

  function closeFeedback() {
    toggleFeedback(false);
    setFeedbackTarget("");
  }

  async function postFeedback() {
    if (grade > 0 && feedbackText.length > 0) {
      const now = new Date();
      const isoString = now.toISOString();
      const feedback = {
        driver_id: feedbackTarget,
        rating: grade,
        comment: feedbackText,
        created_at: isoString,
        user_id: currentUser.id,
      };

      try {
        await createReviewByDriver(feedback).then(() => setStep(1));
      } catch (error) {
        setError(error.message || "Неизвестная ошибка");
      }
    } else {
      setError("Заполните форму");
    }
  }

  if (step === 1) {
    return (
      <FeedbackSummary
        isGood={grade >= 3}
        closeFeedback={closeFeedback}
      />
    );
  }

  return (
    <div className='w-full bg-white rounded-t-[24px]'>
      <div className='container-custom pt-8 px-5 pb-20'>
        <div className='relative w-full'>
          <button
            className='absolute top-0 right-0'
            onClick={closeFeedback}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.952 10L19.596 2.356C20.1347 1.81733 20.1347 0.942667 19.596 0.404C19.0573 -0.134667 18.1827 -0.134667 17.644 0.404L10 8.048L2.356 0.404C1.81733 -0.134667 0.942667 -0.134667 0.404 0.404C-0.134667 0.942667 -0.134667 1.81733 0.404 2.356L8.048 10L0.404 17.644C-0.134667 18.1827 -0.134667 19.0573 0.404 19.596C0.942667 20.1347 1.81733 20.1347 2.356 19.596L10 11.952L17.644 19.596C18.1827 20.1347 19.0573 20.1347 19.596 19.596C20.1347 19.0573 20.1347 18.1827 19.596 17.644L11.952 10Z'
                fill='#5A5A5A'
              />
            </svg>
          </button>

          <div className='flex items-center justify-center gap-4 py-8'>
            {[0, 1, 2, 3, 4].map((star, i) => (
              <svg
                key={i}
                width='27'
                height='24'
                viewBox='0 0 27 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                onClick={() => setGrade(i + 1)}>
                <path
                  d='M13.4999 20.0993L19.5859 23.7824C20.7004 24.4574 22.0643 23.4595 21.771 22.1976L20.1578 15.2716L25.5398 10.6054C26.5224 9.75433 25.9945 8.14023 24.7039 8.03751L17.6208 7.43589L14.8491 0.891426C14.3505 -0.297142 12.6493 -0.297142 12.1507 0.891426L9.37906 7.42122L2.29589 8.02284C1.00537 8.12555 0.477431 9.73966 1.45998 10.5907L6.84202 15.257L5.22888 22.1829C4.93558 23.4449 6.29942 24.4427 7.41396 23.7677L13.4999 20.0993Z'
                  fill={grade <= i ? "#E8E8E8" : "#FBC02D"}
                />
              </svg>
            ))}
          </div>
          <div className='text-center mb-8'>{renderReview()}</div>
          <textarea
            className='border border-[#B8B8B8] text-[14px] leading-[19px] min-h-[180px] w-full bg-inherit px-2 pt-5 rounded-lg mb-4'
            placeholder='Напишите отзыв'
            onChange={(e) => setFeedbackText(e.target.value)}
            value={feedbackText}
          />
          {error && <span className='block text-center font-bold text-red-600 mt-4'>{error}</span>}
        </div>
      </div>
      <div className='fixed bottom-0 left-0 right-0 p-4 bg-white '>
        <Button
          onClick={postFeedback}
          size='large'>
          Отправить
        </Button>
      </div>
    </div>
  );
}
