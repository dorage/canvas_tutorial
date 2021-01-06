const a = [2, 10, 124, 15125, 125124, 2424];
console.log(
    a.reduce(
        (acc, curr, index, { length }) =>
            index == length - 1 ? (acc + curr) / length : acc + curr,
        0,
    ),
);
