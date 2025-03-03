import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, nameFilter, handleDelete }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      {filteredPersons.map(person => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameFilter = (event) => setNameFilter(event.target.value)
  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const addNewPerson = (event) => {
    event.preventDefault()

    const personObject = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== returnedPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error)
            alert(`${newName} was already removed from the server`)
            setPersons(persons.filter(person => person.id !== person.id))
          })
      }

      return
    }

    personService
      .create(personObject)

      // add the new person object to the state
      // update the state of the App component when we created it
      .then(returnedPerson => {
        // The new person returned by the backend server is added 
        // to the list of notes in our application's state
        setPersons(persons.concat(returnedPerson))
        // then resetting the note creation form
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          console.log(`Deleted ${name} with id ${id}`)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(error)
          alert(`${name} was already deleted from the server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        handleDelete={handleDelete}
      />

    </div>

  )
}

export default App