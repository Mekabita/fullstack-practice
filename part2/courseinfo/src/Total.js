const Total = ({ parts }) => {
  let initialValue = 0;

  const total = parts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.exercises,
    initialValue
  );
  return <h3>total of {total} exercises</h3>;
};

export default Total;
