const Persons = (props) => {
  return (
    <li>
    {props.person.name} {props.person.number} 
    <button onClick={props.onDelete}>Delete</button>
    </li>
  );
};

export default Persons;
