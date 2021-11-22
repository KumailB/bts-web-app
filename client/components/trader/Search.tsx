import { useRef, useState } from "react";
import { getSearchResults } from "../../pages/api/trader";
import SearchItem from "./SearchItem";

export default function Search() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [div, setDiv] = useState(<></>);

  const resultItems = searchResults.map( (client)=> {
    console.log("Nis")
    return (
      <SearchItem key={client.id} client={client}></SearchItem>
    );
  });

  const noResults = (
    <div className="text-center w-full text-3xl pt-4 italic font-light">
      No pending transactions.
    </div>
  );

  const searchClients = async (e: any) => {
    e.preventDefault();
    const results = await getSearchResults(
      firstName,
      lastName,
      address,
      city,
      state,
      zip
    );
    console.log(results);
    if (results) {
      results.forEach((result) => {
        console.log("Here")
      })
      //setSearchResults(results);
      const resultItems = results.map( (client)=> {
        console.log("Nis")
        return (
          <SearchItem key={client.id} client={client}></SearchItem>
        );
      });
      setDiv(resultItems);
    }
    else{
    
      const noResults = (
        <div className="text-center w-full text-3xl pt-4 italic font-light">
          No clients found.
        </div>
      );
      setDiv(noResults);
    }

  };

  return (
    <div>
      <div className="py-8 text-5xl font-light ">Search Clients</div>
      <form onSubmit={searchClients}>
        <div className="flex flex-wrap gap-x-4 xl:gap-x-6 gap-y-6 mb-12">
          <div className="flex items-center gap-6">
            <input
              id="first-name-input"
              name="first-name"
              placeholder="First Name"
              value={firstName}
              type="fname"
              onChange={(e) => setFirstName(e.target.value)}
              className="py-4 px-8 w-64 rounded-lg transition duration-400 bg-gray-200 hover:bg-gray-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <input
              id="last-name-input"
              name="last-name"
              placeholder="Last Name"
              value={lastName}
              type="lname"
              onChange={(e) => setLastName(e.target.value)}
              className="py-4 px-8 w-64 rounded-lg transition duration-400 bg-gray-200 hover:bg-gray-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <input
              id="steer-input"
              name="street-address"
              placeholder="Street Address"
              value={address}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              className="py-4 px-8 w-96 rounded-lg transition duration-400 bg-gray-200 hover:bg-gray-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <input
              id="city-input"
              name="city"
              placeholder="City"
              value={city}
              type="text"
              onChange={(e) => setCity(e.target.value)}
              className="py-4 px-8 w-60 rounded-lg transition duration-400 bg-gray-200 hover:bg-gray-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <input
              id="state-input"
              name="state"
              placeholder="State"
              value={state}
              type="text"
              onChange={(e) => setState(e.target.value)}
              className="py-4 px-8 w-44 rounded-lg transition duration-400 bg-gray-200 hover:bg-gray-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <input
              id="zip-input"
              name="zip"
              placeholder="Zip"
              value={zip}
              type="lname"
              onChange={(e) => setZip(e.target.value)}
              className="py-4 px-8 w-36 rounded-lg transition duration-400 bg-gray-200 hover:bg-gray-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <button type="submit">
              <img src="/search.svg" className="h-8" />
            </button>
          </div>
        </div>
      </form>
      {div}
    </div>
  );
}
