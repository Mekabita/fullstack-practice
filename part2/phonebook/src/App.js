import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filterPersons, setFilterPersons] = useState(persons);
  const [checkFilter, setCheckFilter] = useState(false);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckFilter(false);
    const personData = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        personService
          .update(existingPerson.id, personData)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
          });
        console.log(persons);
      }
    } else {
      personService.create(personData).then((data) => {
        setPersons([...persons, data]);
      });
    }
  };

  const handleSearch = (e) => {
    setCheckFilter(true);
    const filterData = persons.filter((person) =>
      person.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );
    setFilterPersons(filterData);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`))
      personService.deleteData(person.id).then((status) => {
        if (status === 200) {
          const data = persons.filter((p) => p.id !== person.id);
          setPersons(data);
        }
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <br />

      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <ul>
        {checkFilter
          ? filterPersons.map((person) => (
              <Persons
                key={person.id}
                person={person}
                onDelete={() => handleDelete()}
              />
            ))
          : persons.map((person) => (
              <Persons
                key={person.id}
                person={person}
                onDelete={() => handleDelete(person)}
              />
            ))}
      </ul>
    </div>
  );
};

export default App;
