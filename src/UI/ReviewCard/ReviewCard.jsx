import "./ReviewCard.css";
export default function ReviewCard({ review }) {
  return (
    <div className='review shadow-custom'>
      <div className='review-info'>
        <p className='review-name'>Евгений Иванов</p>
        <p className='review-date'>10.10.2025</p>
      </div>
      <div className='review-rating'>123</div>
      <div className='review-text'>{review}</div>
    </div>
  );
}
