const off = (obj, ...args) => {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...args);
  }
};

export default off;
