import { useUserByUserId } from "../../api/user";
import { formatDate } from "../../utils/utils";
import "./ReviewCard.css";
export default function ReviewCard({ review }) {
  const user = useUserByUserId(review.id).data;
  return (
    <div className='review shadow-custom'>
      <div className='review-info'>
        <p className='review-name'>{}</p>
        <p className='review-date'>{formatDate(review.created_at)}</p>
      </div>
      <div className='review-rating flex gap-2'>
        {[0, 1, 2, 3, 4].map((star, i) => {
          return (
            <svg
              width='10'
              height='10'
              viewBox='0 0 27 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              key={i}>
              <path
                d='M13.4999 20.0993L19.5859 23.7824C20.7004 24.4574 22.0643 23.4595 21.771 22.1976L20.1578 15.2716L25.5398 10.6054C26.5224 9.75433 25.9945 8.14023 24.7039 8.03751L17.6208 7.43589L14.8491 0.891426C14.3505 -0.297142 12.6493 -0.297142 12.1507 0.891426L9.37906 7.42122L2.29589 8.02284C1.00537 8.12555 0.477431 9.73966 1.45998 10.5907L6.84202 15.257L5.22888 22.1829C4.93558 23.4449 6.29942 24.4427 7.41396 23.7677L13.4999 20.0993Z'
                fill={Math.floor(review.rating) <= i ? "#E8E8E8" : "#FBC02D"}
              />
            </svg>
          );
        })}
      </div>
      <div className='review-text'>{review.comment}</div>
    </div>
  );
}
