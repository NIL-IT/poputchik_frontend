export default function CloseBtn({ onClick, ...props }) {
  return (
    <button
      className='absolute top-[50px]  right-5 w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback'
      onClick={onClick}
      {...props}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M11.952 10L19.596 2.356C20.1347 1.81733 20.1347 0.942667 19.596 0.404C19.0573 -0.134667 18.1827 -0.134667 17.644 0.404L10 8.048L2.356 0.404C1.81733 -0.134667 0.942667 -0.134667 0.404 0.404C-0.134667 0.942667 -0.134667 1.81733 0.404 2.356L8.048 10L0.404 17.644C-0.134667 18.1827 -0.134667 19.0573 0.404 19.596C0.942667 20.1347 1.81733 20.1347 2.356 19.596L10 11.952L17.644 19.596C18.1827 20.1347 19.0573 20.1347 19.596 19.596C20.1347 19.0573 20.1347 18.1827 19.596 17.644L11.952 10Z'
          fill='#2C2C2C'
        />
      </svg>
    </button>
  );
}
