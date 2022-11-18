/**
 * Restricts user to enter except alpha charactors
 *
 * @param {object} event entered key object
 * @returns boolean
 * @memberof PersonalInformationComponent
 */
export const textValidator = (event: any) => {
  let key = event.keyCode;
  return (
    (key >= 65 && key <= 90) ||
    key == 8 ||
    key == 9 ||
    key == 37 ||
    key == 39 ||
    key === 32
  );
};

/**
 *
 * Restricts user to enter except numbers
 * @param {object} event entered key object
 * @returns boolean
 * @memberof PersonalInformationComponent
 */
export const numericValidator = (event: any) => {
  let key = event.which ? event.which : event.keyCode;
  if (
    event.keyCode == 8 ||
    event.keyCode == 46 ||
    event.keyCode == 37 ||
    event.keyCode == 39
  ) {
    return true;
  } else if (key < 48 || (key > 57 && key < 96) || key > 105) {
    return false;
  } else return true;
};

export const emailValidatorRegex =
  /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const stringValidatorRegex = /^\S$|^\S[\s\S](?!.* {2})[\s\S]*\S$/;
