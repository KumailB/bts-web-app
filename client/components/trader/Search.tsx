import { useEffect, useRef, useState } from "react";
import { useAsync } from "react-async-hook";
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
  const [search, setSearch] = useState(false);
  const [div, setDiv] = useState(<></>);

 
  let asyncHero = useAsync(getSearchResults, [
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
  ]);

  const noFound = (
    <div className="text-center w-full text-3xl pt-4 italic font-light">
      No clients found.
    </div>
  );

  const loading = (
    <div className="text-center w-full text-3xl pt-4 italic font-light">
      Loading...
    </div>
  );

  const error = (
    <div className="text-center w-full text-3xl pt-4 italic font-light">
      There was an error. Please try again later.
    </div>
  );

  useEffect(() => {
    if(search){
      if(asyncHero.loading){
        setDiv(loading)
      }
      else if(asyncHero.error){
        setDiv(error)
      }
      else if(asyncHero.result?.length){
        setDiv(asyncHero.result.map(client => { return(<SearchItem key={client.id} client={client}></SearchItem>)}));
      }
      else if(asyncHero.result){
        setDiv(noFound);
      }
      setSearch(false);
    }
  }, [asyncHero, search]);

  // const searchClients = async (e: any) => {
  //   e.preventDefault();
  //   setDiv(
  //     <div className="text-center w-full text-3xl pt-4 italic font-light">
  //       Loading...
  //     </div>
  //   );
  //   asyncHero = useAsync(getSearchResults, [
  //     firstName,
  //     lastName,
  //     address,
  //     city,
  //     state,
  //     zip,
  //   ]);
  //   if (results) {
  //   } else {
  //     setDiv(
  //       <div className="text-center w-full text-3xl pt-4 italic font-light">
  //         No clients found.
  //       </div>
  //     );
  //   }
  // };

  return (
    <div>
      <div className="py-8 text-5xl font-light ">Search Clients</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(true);
        }}
      >
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
      <div>
        
      </div>
    </div>
  );
}
