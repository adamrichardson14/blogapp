export const validateTwitter = (value) => {
  let error;
  if (value.length === 0) {
    return true;
  }
  if (
    RegExp(
      /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/g
    ).test(value) === false
  ) {
    error = 'This does not look like a valid Twitter URL';
  }
  return error || true;
};

export const validateURL = (value) => {
  let error;
  if (value.length === 0) {
    return true;
  }
  if (
    RegExp(
      /^(?:(?:https|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    ).test(value) === false
  ) {
    error =
      'This is not a valid URL. You can only link to an https website. It should like this: https://yourwebsite.com';
  }
  return error || true;
};

export const validateBlogSlug = (value) => {
  let error;
  if (value.length > 25) {
    error = 'You can not have more than 25 characters';
    return error || true;
  }
  if (RegExp(/^[a-z-]{5,30}$/g).test(value) === false) {
    error =
      'This can only be lowercase letters. It must be 5 characters long. You can add a dash but we do not recommend it. It must be shorter than 30 characters.';
  }
  return error || true;
};

export const validateTitle = (value) => {
  let error;
  if (value.length > 100) {
    error = 'Your title can not be that long';
    return error || true;
  }

  if (value.length < 5) {
    error = 'Your title can not be that short';
    return error || true;
  }
};

export const validateImageUrl = (value) => {
  let error;

  if (value.length < 20) {
    error = 'You must hit upload once you have chosen your image';
  }
  return error || true;
};

export const validateExcerpt = (value) => {
  let error;

  if (value.length < 20) {
    error = 'Your excerpt must be longer than 20 characters';
    return error || true;
  }

  if (value.length > 250) {
    error = 'Your excerpt must be shorter than 250 characters';
  }
  return error || true;
};
