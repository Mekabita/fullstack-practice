const Persons = (props) => {
  return (
    <>
      {props.checkFilter
        ? props.filterPersons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))
        : props.persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))}
    </>
  );
};

export default Persons;
