export const waitXSeconds = (seconds) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, seconds * 1000);
})