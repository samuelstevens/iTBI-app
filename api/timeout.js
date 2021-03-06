const timeout = (ms, promise) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Timed out.'));
  }, ms);
  promise.then(resolve, reject);
});

const mediumTimeout = 6000;

export default timeout;
export { mediumTimeout };
