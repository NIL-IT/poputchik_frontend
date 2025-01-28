import Input from "../../UI/Input/Input";

export default function ChooseCar({
  selectedCar,
  setSelectedCar,
  setCarNumber,
  setCarModel,
  setCarMake,
  setCarColor,
  errors,
}) {
  return (
    <div className='flex flex-col gap-5'>
      <div className='relative flex justify-between'>
        <div
          className='relative w-[90px] h-[90px] rounded-[16px] flex justify-center items-center bg-white'
          onClick={() => setSelectedCar("sedan")}>
          <svg
            width='62'
            height='30'
            viewBox='0 0 62 30'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M61.0663 13.6974C60.9793 12.5986 60.8817 11.3552 60.6911 10.2821C60.5587 9.53168 60.2676 8.53236 59.2834 8.53236C59.1848 8.53236 59.0861 8.54253 58.9886 8.55308C58.9277 8.55914 58.8669 8.56775 58.7672 8.5697C58.7651 8.5697 58.7332 8.53725 58.6927 8.4139C58.4036 7.54732 57.1913 6.46942 55.6368 5.15108C55.2538 4.82755 54.7954 4.43795 54.6001 4.23699C54.6718 3.71779 54.6612 3.08012 54.3159 2.64067C54.1556 2.43561 53.8538 2.19067 53.3337 2.19067C53.2573 2.19067 53.1761 2.19555 52.9953 2.21237C52.62 2.21237 51.868 2.0509 50.8267 1.8255C48.1417 1.24863 43.1442 0.173663 35.6505 0.00456944C24.7394 -0.221606 16.1654 8.02215 15.8119 8.36933L15.5591 8.61525C15.111 8.84201 13.6959 9.38409 9.37054 10.2743C3.23554 11.5391 2.06523 13.5854 1.84416 14.3767C1.35441 14.7595 0.561257 15.6724 0.4356 16.7464C0.334589 17.6028 0.105866 17.9531 0.105866 17.9522L0 18.095V24.1402L0.0119496 24.2504C0.344484 25.8558 1.93359 26.7051 4.60732 26.7051C5.46003 26.7051 6.09971 26.614 6.07487 26.614C6.11203 26.6119 6.44176 26.606 7.0131 26.5937C6.95466 26.4246 6.90145 26.2536 6.85552 26.0784C6.81108 25.9095 6.77038 25.7395 6.73901 25.5653C6.66358 25.1551 6.6212 24.7331 6.6212 24.2999C6.6212 20.5849 9.50796 17.5624 13.0562 17.5624C16.6045 17.5624 19.4915 20.5849 19.4915 24.2999C19.4915 24.6359 19.4601 24.9618 19.4151 25.2848C19.3905 25.4599 19.3619 25.6339 19.3242 25.804C19.2855 25.9801 19.245 26.1543 19.1937 26.3253C27.2294 26.1451 37.4545 25.9072 45.3737 25.6988C45.3388 25.5287 45.3166 25.3565 45.2944 25.1823C45.2722 25.0103 45.2595 24.8383 45.2509 24.6643C45.2451 24.5427 45.2335 24.4235 45.2335 24.2999C45.2335 20.5849 48.1205 17.5624 51.6686 17.5624C55.1666 17.5624 58.0168 20.5018 58.0961 24.1461C58.0961 24.1967 58.1038 24.2481 58.1038 24.2999C58.1038 24.4305 58.0922 24.5579 58.0844 24.6875C58.0747 24.8717 58.0573 25.0549 58.0341 25.2351C59.5461 24.9739 60.6832 24.1398 61.3416 22.7906C62.4678 20.4837 61.8937 17.36 61.4894 16.6968C61.2712 16.3378 61.1629 14.9349 61.0663 13.6974Z'
              fill={selectedCar == "sedan" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M8.06187 26.5701C8.90058 28.5885 10.8192 30.0004 13.0555 30.0004C15.372 30.0004 17.3452 28.4831 18.1322 26.3494C18.1946 26.1793 18.2502 26.0051 18.2976 25.827C18.343 25.657 18.3807 25.4828 18.4117 25.3067C18.4668 24.9798 18.5015 24.6436 18.5015 24.2997C18.5015 21.1507 16.0642 18.5986 13.0564 18.5986C10.0487 18.5986 7.61133 21.1507 7.61133 24.2997C7.61133 24.7269 7.65969 25.1427 7.7452 25.5436C7.78142 25.7178 7.82493 25.8888 7.87758 26.0558C7.93135 26.2321 7.99278 26.402 8.06187 26.5701Z'
              fill={selectedCar == "sedan" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M46.386 25.6705C46.9738 28.1545 49.1125 29.9997 51.6668 29.9997C54.3371 29.9997 56.5542 27.9844 57.0181 25.3291C57.048 25.1571 57.0712 24.9839 57.0876 24.8068C57.1022 24.6389 57.1119 24.4708 57.1119 24.2988C57.1119 24.2946 57.1119 24.2905 57.1119 24.2855C57.1061 21.1436 54.6697 18.5977 51.6668 18.5977C48.66 18.5977 46.2217 21.1497 46.2217 24.2988C46.2217 24.4131 46.2323 24.5243 46.2381 24.6377C46.2478 24.8129 46.2643 24.9847 46.2893 25.155C46.3145 25.3293 46.3473 25.5014 46.386 25.6705Z'
              fill={selectedCar == "sedan" ? "#242E42" : "#7C828E"}
            />
          </svg>
          <span
            className={`w-[14px] h-[14px] absolute bottom-1 right-2 border border-[#D4D4D4] rounded-full flex justify-center items-center`}>
            <svg
              width='10'
              height='8'
              viewBox='0 0 10 8'
              fill='none'
              className={selectedCar == "sedan" ? "block" : "hidden"}
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M3.57078 5.8375L8.51453 0.89375C8.63119 0.777083 8.7673 0.71875 8.92286 0.71875C9.07841 0.71875 9.21453 0.777083 9.33119 0.89375C9.44786 1.01042 9.50619 1.14906 9.50619 1.30967C9.50619 1.47028 9.44786 1.60872 9.33119 1.725L3.97911 7.09167C3.86244 7.20833 3.72633 7.26667 3.57078 7.26667C3.41522 7.26667 3.27911 7.20833 3.16244 7.09167L0.654109 4.58333C0.537442 4.46667 0.481442 4.32822 0.486109 4.168C0.490776 4.00778 0.551637 3.86914 0.668692 3.75208C0.785748 3.63503 0.924387 3.57669 1.08461 3.57708C1.24483 3.57747 1.38328 3.63581 1.49994 3.75208L3.57078 5.8375Z'
                fill='#EF7828'
              />
            </svg>
          </span>
        </div>
        <div
          className='relative w-[90px] h-[90px] rounded-[16px] flex justify-center items-center bg-white'
          onClick={() => setSelectedCar("van")}>
          <svg
            width='62'
            height='36'
            viewBox='0 0 62 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M21.8453 0.0740337C20.259 0.289339 18.491 1.04291 17.0016 2.14335C16.275 2.69358 15.7301 3.35145 12.8965 7.04752L9.62695 11.3297L8.29492 12.2029C6.30898 13.4828 3.40273 15.5999 2.78516 16.2219C1.59844 17.3822 0.653906 19.0807 0.242188 20.8031C0.0363281 21.6524 0 22.2146 0 25.0614C0 28.2072 0.0121094 28.3508 0.266406 28.7933C0.653906 29.4871 1.28359 29.7383 2.56719 29.7383H3.60859L3.69336 28.9249C3.89922 27.047 4.72266 25.3365 6.07891 24.0088C7.04766 23.0519 8.07695 22.4299 9.38477 21.9993C10.2203 21.7241 10.5594 21.6883 11.8672 21.6883C13.2234 21.6763 13.4898 21.7122 14.398 22.0232C17.5707 23.0877 19.5687 25.6236 20.041 29.1641L20.1137 29.7383H31H41.8863L41.959 29.1641C42.1285 27.8364 42.3344 27.1068 42.843 26.114C43.7996 24.2121 45.5434 22.7169 47.602 22.0232C48.5102 21.7122 48.7766 21.6763 50.1328 21.6883C51.4406 21.6883 51.7797 21.7241 52.6152 21.9993C53.923 22.4299 54.9645 23.0638 55.9332 24.0207C57.2895 25.3604 58.1008 27.0589 58.3066 28.9369L58.3914 29.7383H59.4328C60.7164 29.7383 61.3461 29.4871 61.7336 28.7933C62 28.3388 62 28.2431 62 23.5542V18.7816L60.7891 11.1981C60.123 7.03556 59.5902 3.62657 59.6023 3.6146C60.0746 3.44715 60.6074 3.05242 60.7891 2.76535C61.3098 1.94001 60.9828 0.672102 60.1473 0.217569C59.784 0.0261879 58.5246 0.0142269 41.1719 0.00226593C30.9516 -0.00969696 22.257 0.0261879 21.8453 0.0740337ZM27.0039 3.87776C27.0039 3.99737 26.7859 5.63608 26.5074 7.50206C25.9383 11.4613 25.8414 11.7125 24.7152 12.2986L24.0734 12.6335H18.6969C15.7422 12.6335 13.3203 12.5976 13.3203 12.5498C13.3203 12.3823 18.5879 5.55235 19.0238 5.16959C19.5203 4.71505 20.707 4.0811 21.4941 3.82991C21.8211 3.73422 22.8141 3.67441 24.4973 3.67441C26.8465 3.66245 27.0039 3.67441 27.0039 3.87776Z'
              fill={selectedCar == "van" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M10.5958 23.5296C9.50592 23.7449 8.24655 24.4387 7.37467 25.2999C3.37858 29.2472 6.16374 35.9695 11.7946 35.9814C13.054 35.9814 13.8169 35.802 14.9188 35.2159C18.1399 33.5174 19.1934 29.2831 17.1469 26.2329C16.0208 24.5583 14.2286 23.5655 12.17 23.4579C11.6372 23.4339 10.9348 23.4579 10.5958 23.5296ZM12.5333 27.1181C13.1751 27.2736 13.9743 27.9195 14.2891 28.5534C14.7856 29.4864 14.5192 30.9457 13.7321 31.6753C12.9692 32.3811 11.5766 32.5964 10.6684 32.1299C9.96608 31.783 9.36061 31.0175 9.19108 30.2759C8.90045 28.9721 9.71178 27.5606 10.9833 27.1779C11.7098 26.9626 11.8672 26.9506 12.5333 27.1181Z'
              fill={selectedCar == "van" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M48.9825 23.518C45.943 24.128 43.8239 26.6519 43.8118 29.6781C43.8118 30.9101 43.9934 31.6637 44.5868 32.7522C46.0036 35.3717 49.3336 36.6516 52.1915 35.6708C54.4196 34.9172 55.909 33.1947 56.3934 30.8503C57.2774 26.6519 53.245 22.6807 48.9825 23.518ZM50.9684 27.1782C52.7969 27.7045 53.475 29.9652 52.2278 31.4005C51.6465 32.0704 51.029 32.3694 50.1934 32.3694C48.5708 32.3694 47.4809 31.2929 47.4688 29.702C47.4688 28.8528 47.7594 28.2547 48.4497 27.6686C49.2125 27.0107 49.9391 26.8672 50.9684 27.1782Z'
              fill={selectedCar == "van" ? "#242E42" : "#7C828E"}
            />
          </svg>
          <span
            className={`w-[14px] h-[14px] absolute bottom-1 right-2 border border-[#D4D4D4] rounded-full flex justify-center items-center`}>
            <svg
              width='10'
              height='8'
              viewBox='0 0 10 8'
              fill='none'
              className={selectedCar == "van" ? "block" : "hidden"}
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M3.57078 5.8375L8.51453 0.89375C8.63119 0.777083 8.7673 0.71875 8.92286 0.71875C9.07841 0.71875 9.21453 0.777083 9.33119 0.89375C9.44786 1.01042 9.50619 1.14906 9.50619 1.30967C9.50619 1.47028 9.44786 1.60872 9.33119 1.725L3.97911 7.09167C3.86244 7.20833 3.72633 7.26667 3.57078 7.26667C3.41522 7.26667 3.27911 7.20833 3.16244 7.09167L0.654109 4.58333C0.537442 4.46667 0.481442 4.32822 0.486109 4.168C0.490776 4.00778 0.551637 3.86914 0.668692 3.75208C0.785748 3.63503 0.924387 3.57669 1.08461 3.57708C1.24483 3.57747 1.38328 3.63581 1.49994 3.75208L3.57078 5.8375Z'
                fill='#EF7828'
              />
            </svg>
          </span>
        </div>
        <div
          className='relative w-[90px] h-[90px] rounded-[16px] flex justify-center items-center bg-white'
          onClick={() => setSelectedCar("truck")}>
          <svg
            width='62'
            height='38'
            viewBox='0 0 62 38'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M62 14.2101V28.4199H58.6858C55.4345 28.4199 55.3589 28.4071 55.1195 28.137C54.6911 27.6483 53.4057 26.8768 52.574 26.6196C51.5658 26.2981 49.852 26.2724 48.8817 26.5681C47.9492 26.8511 47.3821 27.1597 46.5756 27.8412L45.8699 28.4199H33.4573H21.0447V14.2101V0.000228882H41.5223H62V14.2101Z'
              fill={selectedCar == "truck" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M19.6584 19.5465V32.1489H17.8438H16.0418L15.9536 31.5574C15.8276 30.5801 15.0841 29.1784 14.2523 28.3168C13.6979 27.7381 13.2064 27.3909 12.3999 26.9922C11.3792 26.4907 11.2028 26.4393 10.0182 26.3878C9.04787 26.3493 8.55641 26.3878 7.98934 26.555C5.69584 27.2237 3.95681 29.0112 3.42754 31.223L3.21332 32.1489H1.60031H-0.000101089V27.1337V22.1184H7.87592C15.6259 22.1184 15.7519 22.1184 16.004 21.8613C16.256 21.6041 16.2686 21.4755 16.2308 16.0616C16.193 10.7506 16.1804 10.5191 15.9536 10.3391C15.7519 10.1976 14.8824 10.159 11.1397 10.159H6.56535L7.47267 8.55158L8.37998 6.94413H14.0129H19.6584V19.5465Z'
              fill={selectedCar == "truck" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M14.8699 16.1385V20.7036H7.74995C3.83084 20.7036 0.630027 20.665 0.630027 20.6265C0.630027 20.575 1.77678 18.5175 3.17556 16.0613L5.73369 11.5862L10.2955 11.5733H14.8699V16.1385Z'
              fill={selectedCar == "truck" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M51.591 27.7766C54.25 28.2524 56.178 31.0301 55.7118 33.7178C55.4219 35.4024 54.3508 36.8684 52.8638 37.6142C52.1707 37.9614 52.0069 38 50.7215 38C49.411 38 49.2849 37.9743 48.5162 37.5885C47.4703 37.0613 46.6008 36.1739 46.0841 35.1066C45.7061 34.335 45.6809 34.1807 45.6809 32.9205C45.6809 31.7245 45.7187 31.493 46.0211 30.8372C46.4748 29.847 46.9032 29.2812 47.6467 28.7282C48.7305 27.9181 50.2805 27.5452 51.591 27.7766ZM49.2219 30.6958C48.9321 30.9015 48.5666 31.3259 48.3902 31.6345C47.3065 33.6277 49.0959 36.0325 51.276 35.4924C53.2293 35.0166 53.9475 32.5733 52.574 31.0687C51.7171 30.1299 50.2427 29.9628 49.2219 30.6958Z'
              fill={selectedCar == "truck" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M51.4525 31.8923C52.3472 32.6124 51.7801 34.207 50.6586 34.207C50.0411 34.207 49.3984 33.5512 49.3984 32.9211C49.3984 31.8923 50.6586 31.2622 51.4525 31.8923Z'
              fill={selectedCar == "truck" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M10.7113 27.8281C11.7573 28.0595 12.6142 28.5739 13.3829 29.4355C15.7268 32.0074 14.8951 36.1482 11.7447 37.6528C11.102 37.9614 10.8752 38 9.6402 38C8.32963 38 8.20361 37.9743 7.42231 37.5885C5.38084 36.5597 4.18369 34.1035 4.64995 31.9046C5.09101 29.7956 6.71662 28.1881 8.82109 27.7766C9.62759 27.6223 9.82922 27.6223 10.7113 27.8281ZM8.63207 30.4643C6.81743 31.313 6.48979 33.602 7.98938 34.9523C9.01011 35.8653 10.3585 35.8139 11.417 34.8237C12.0723 34.2064 12.2739 33.6535 12.1983 32.6633C12.1227 31.6602 11.6943 31.0044 10.8247 30.5543C10.0434 30.1557 9.33776 30.1299 8.63207 30.4643Z'
              fill={selectedCar == "truck" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M10.4846 32.0082C11.4172 32.8569 10.6232 34.3872 9.36308 34.1429C8.44317 33.9757 8.11552 32.7154 8.80861 32.0082C9.31268 31.5066 9.93016 31.4938 10.4846 32.0082Z'
              fill={selectedCar == "truck" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M62 30.9916V32.1489H59.5679H57.1484L56.8837 31.2102C56.7451 30.7087 56.5813 30.1814 56.5183 30.0528C56.4301 29.8471 56.6065 29.8342 59.215 29.8342H62V30.9916Z'
              fill={selectedCar == "truck" ? "#242E42" : "#7C828E"}
            />
            <path
              d='M44.6602 30.5673C44.4964 30.9788 44.3578 31.416 44.3578 31.5317C44.3578 32.1876 45.1265 32.149 32.6256 32.149H21.0447V30.9916V29.8343H33.0037H44.9626L44.6602 30.5673Z'
              fill={selectedCar == "truck" ? "#242E42" : "#7C828E"}
            />
          </svg>
          <span
            className={`w-[14px] h-[14px] absolute bottom-1 right-2 border border-[#D4D4D4] rounded-full flex justify-center items-center`}>
            <svg
              width='10'
              height='8'
              viewBox='0 0 10 8'
              fill='none'
              className={selectedCar == "truck" ? "block" : "hidden"}
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M3.57078 5.8375L8.51453 0.89375C8.63119 0.777083 8.7673 0.71875 8.92286 0.71875C9.07841 0.71875 9.21453 0.777083 9.33119 0.89375C9.44786 1.01042 9.50619 1.14906 9.50619 1.30967C9.50619 1.47028 9.44786 1.60872 9.33119 1.725L3.97911 7.09167C3.86244 7.20833 3.72633 7.26667 3.57078 7.26667C3.41522 7.26667 3.27911 7.20833 3.16244 7.09167L0.654109 4.58333C0.537442 4.46667 0.481442 4.32822 0.486109 4.168C0.490776 4.00778 0.551637 3.86914 0.668692 3.75208C0.785748 3.63503 0.924387 3.57669 1.08461 3.57708C1.24483 3.57747 1.38328 3.63581 1.49994 3.75208L3.57078 5.8375Z'
                fill='#EF7828'
              />
            </svg>
          </span>
        </div>
      </div>
      <Input
        onChange={(e) => setCarNumber(e.target.value)}
        placeholder={"Номер"}
        required
      />
      {errors.carNumber && <p className='text-red-500 text-sm'>{errors.carNumber}</p>}
      <Input
        onChange={(e) => setCarMake(e.target.value)}
        placeholder={"Марка"}
        required
      />
      {errors.carMake && <p className='text-red-500 text-sm'>{errors.carMake}</p>}
      <Input
        onChange={(e) => setCarModel(e.target.value)}
        placeholder={"Модель"}
        required
      />
      {errors.carModel && <p className='text-red-500 text-sm'>{errors.carModel}</p>}
      <Input
        onChange={(e) => setCarColor(e.target.value)}
        placeholder={"Цвет"}
        required
      />
      {errors.carColor && <p className='text-red-500 text-sm'>{errors.carColor}</p>}
    </div>
  );
}
