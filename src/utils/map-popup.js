export const getImageFromPathElseMessage = (value) => {
  try {
    console.log(value);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];
    const isImagePath = imageExtensions.some((extension) => value.includes(extension));

    // If the string is an image path, return an HTML img element with the src set to the path
    if (isImagePath) {
      return `<img src="${value}" alt="Image from path">`;
    }

    // If the string is not an image path, return an HTML p element with a message
    return `<p>${value}</p>`;
  } catch (error) {
    return `<p>${value}</p>`;
  }
};

/* eslint-disable no-restricted-syntax */
export const buildPopup = (sliced) => {
  let description = '';
  for (const [key, value] of Object.entries(sliced)) {
    description += `<span class="block font-bold">${key}</span>${getImageFromPathElseMessage(value)}`;
  }
  return description;
};
