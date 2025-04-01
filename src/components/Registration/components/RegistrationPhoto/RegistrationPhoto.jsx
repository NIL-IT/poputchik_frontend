const PhotoUploadField = ({ id, onChange, photo, visiblePhoto, error, label }) => (
  <fieldset className='relative w-[200px]'>
    <input
      id={id}
      type='file'
      accept='image/*'
      onChange={onChange}
      className='visually-hidden'
    />
    <label
      htmlFor={id}
      className='img-upload__label img-upload__control docs'
      style={{
        backgroundImage: visiblePhoto ? `url(${visiblePhoto})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      Загрузить
    </label>
    <span className='block mt-2'>{label}</span>
    {error && <p className='text-red-500 text-sm mt-1 text-center'>{error}</p>}
  </fieldset>
);

export default function RegistrationPhoto({
  handlePassportChange,
  passportPhoto,
  visiblePassportPhoto,
  formError,
  handleLicenseChange,
  driverLicensePhoto,
  visibleLicensePhoto,
  handleCarChange,
  carPhoto,
  visibleCarPhoto,
}) {
  return (
    <div className='flex flex-col gap-10 items-center justify-center'>
      <PhotoUploadField
        id='upload-passport'
        onChange={handlePassportChange}
        photo={passportPhoto}
        visiblePhoto={visiblePassportPhoto}
        error={formError.passport}
        label='Фото паспорта'
      />
      <PhotoUploadField
        id='upload-license'
        onChange={handleLicenseChange}
        photo={driverLicensePhoto}
        visiblePhoto={visibleLicensePhoto}
        error={formError.license}
        label='Водительское удостоверение'
      />
      <PhotoUploadField
        id='upload-carPhoto'
        onChange={handleCarChange}
        photo={carPhoto}
        visiblePhoto={visibleCarPhoto}
        error={formError.carPhoto}
        label='Фото машины'
      />
    </div>
  );
}
