import { useState } from "react";
import "./App.css";
import constacts from "./contacts.json";

function App() {
  const firstContacts = constacts.slice(0, 5);
  const [contact, setContact] = useState(firstContacts);
  const remainingContacts = constacts.slice(5, constacts.length);

  const getRandomContact = () => {
    const randomContact =
      remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
    if (contact.includes(randomContact) === false) {
      setContact((contact) => [...contact, randomContact]);
    }
  };
  const sortByPopularity = () => {
    const popularitySort = [...contact];
    popularitySort.sort((a, b) => b.popularity - a.popularity);
    setContact(popularitySort);
  };

  const sortByName = () => {
    const nameSort = [...contact];
    nameSort.sort((a, b) => a.name.localeCompare(b.name));
    // nameSort.sort((a, b) => {
    //   if (a.name < b.name) return -1;
    //   if (a.name > b.name) return 1;
    //   if (a.name === b.name) return 0;
    // });
    setContact(nameSort);
  };

  const deleteItem = (elem) => {
    const id = elem.target.getAttribute("id");
    setContact(contact.filter((contact) => contact.id !== id));
  };

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={getRandomContact}>Add a random contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      <table id="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        {contact.map((contact) => {
          return (
            <tbody key={contact.id}>
              <tr>
                <td>
                  <img src={contact.pictureUrl} />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar && "🏆"}</td>
                <td>{contact.wonEmmy && "🌟"}</td>
                <td>
                  <button id={contact.id} onClick={deleteItem}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default App;
