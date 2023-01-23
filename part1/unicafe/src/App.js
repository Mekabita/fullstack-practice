import { useState } from "react";
import Button from "./Button";
import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine
          text="all"
          value={props.good + props.bad + props.neutral}
        />
        <StatisticLine
          text="average"
          value={
            (props.good - props.bad) / (props.good + props.neutral + props.bad)
          }
        />
        <StatisticLine
          text="positive"
          value={
            (props.good / (props.good + props.neutral + props.bad)) * 100 + "%"
          }
        />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodClick}></Button>
      <Button text="neutral" handleClick={handleNeutralClick}></Button>
      <Button text="bad" handleClick={handleBadClick}></Button>
      <br />
      <h1>statistics</h1>
      {good + neutral + bad > 0 ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <p>No Feedback given</p>
      )}
    </div>
  );
};

export default App;
