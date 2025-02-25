import { useState } from 'react'

const Filter = ({ nameFilter, handleNameFilter }) => {
  return (
    <div>
      filter shown with <input
        value={nameFilter}
        onChange={handleNameFilter} />
    </div>
  )
}

const PersonForm = (props) => {
  const { addNewPerson, newName, handleNewName, newNumber, handleNewNumber } = props
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNewName} />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, nameFilter }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      {filteredPersons.map((person) =>
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>

      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />

      <h3>Add a new</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} />

    </div>

  )
}

export default App