import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
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
    if (persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((data) => {
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
      <Persons
        checkFilter={checkFilter}
        filterPersons={filterPersons}
        persons={persons}
      />
    </div>
  );
};

export default App;
