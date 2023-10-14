const boundariesData = [
  308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308,
            308, 308, 308, 308, 0, 0, 308, 308, 0, 0, 0, 0, 0, 308, 308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 0, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308, 0, 0, 0, 308, 308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308, 0, 0, 0, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 0, 0, 308, 0, 0, 0, 308, 0, 0, 0, 0, 0, 308, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 0, 0, 308, 0, 0, 0, 308, 0, 0, 0, 0, 0, 308, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 0, 308, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 308, 308, 308, 0, 0, 0, 0, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308,
            308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308, 308
];

const partLength = boundariesData.length / 20;
export const boundaries = Array.from({ length: 20 }, (v, i) => {
  return boundariesData.slice(i * partLength, (i + 1) * partLength);
});
