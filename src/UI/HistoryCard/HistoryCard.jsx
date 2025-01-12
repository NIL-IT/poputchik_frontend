import "./HistoryCard.css";
export default function HistoryCard({ drive }) {
  console.log(drive);
  if (!drive) {
    return null; // Или можно отобразить сообщение об ошибке
  }
  return (
    <div className='history'>
      <div className='history-wrapper'>
        <div className='history-path'>
          <span className='history-from'>{drive.from}</span>
          <span className='history-to'>{drive.to}</span>
        </div>
        <div className='history-info'>
          <div className='history-date'>{drive.date}</div>
          <div className='history-driver'>
            <div className='history-rating'>{drive.driver.rating}</div>
            <img
              className='history-img'
              src={drive.driver.avatar}
            />
          </div>
        </div>
      </div>
      <div className='history-footer'>
        <div className='history-price'>{drive.price}руб</div>
        <div className='history-status'>{drive.status}</div>
      </div>
    </div>
  );
}
