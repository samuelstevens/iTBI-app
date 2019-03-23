const timeout = (ms, promise) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Timed out.'));
  }, ms);
  promise.then(resolve, reject);
});

const mediumTimeout = 3000;

export default timeout;
export { mediumTimeout };
