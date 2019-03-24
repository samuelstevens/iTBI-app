const messages = [
  'Todoy might be hard, but tomorrow might be easier.',
  'Life is 10% what happens to you and 90% how you react to it.',
  'The past cannot be changed. The future is yet in your power.',
  'It does not matter how slowly you go as long as you do not stop.',
  'Start where you are. Use what you have. Do what you can.',
];

const getMessage = () => messages[Math.floor(Math.random() * messages.length)];

export default getMessage;
