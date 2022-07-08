export const keyDownHelper = (e: React.KeyboardEvent, callback: () => void | void) => {
  if (e.code != 'Enter') {
    return;
  }
  callback();
};
