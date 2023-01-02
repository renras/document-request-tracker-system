const on = (obj, ...args) => {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...args);
  }
};

export default on;
