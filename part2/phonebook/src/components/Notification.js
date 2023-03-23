const Notification = ({ message, msgType }) => {
  if (message === null) {
    return null;
  } else {
    return msgType ? (
      <div className="success">{message}</div>
    ) : (
      <div className="error">{message}</div>
    );
  }
};

export default Notification;
