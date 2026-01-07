const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadInput = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const setFormPhoto = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

export { setFormPhoto, uploadInput };

