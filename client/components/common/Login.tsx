import { useRef, useState } from "react";
import { GET_USER } from "../../pages/api/graphql/Queries";
import { getUser, tryLogin } from "../../pages/api/login";
import { useLazyQuery, useMutation, useQuery, ApolloClient, InMemoryCache } from "@apollo/client";
import { useRouter } from "next/router";

export default function Login() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  // const client = new ApolloClient({
  //   uri: "http://"+process.env.SERVER_HOST+":"+process.env.SERVER_PORT+"/graphql",
  //   cache: new InMemoryCache(),
  //   })

  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState("");
  const router = useRouter()

  const login = async (e) => {
    e.preventDefault();

    
    const user = await tryLogin(inputEmail.current.value, inputPassword.current.value);

    if (user?.userType === 'Client')
      router.push('/client?email='+inputEmail.current.value);
    // 3. Send a request to our API with the user's email address.

    // if (true) {
    //   // 4. If there was an error, update the message in state.
    //   setMessage("ERROR");

    //   return;
    // }

    // 5. Clear the input value and show a success message.
    inputEmail.current.value = '';
    inputPassword.current.value = '';
    setMessage('Logged In');
  };

  return (
    <div>
      <div className="max-w-2xl m-auto">
        <form
          onSubmit={login}
        >
          {/* <label htmlFor="email-input">{'Email Address'}</label>
        <label htmlFor="first-name-input">{'First Name'}</label>
        <label htmlFor="last-name-input">{'Last Name'}</label> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-4 text-black">
            <input
              id="email-input"
              name="email"
              placeholder="Email"
              ref={inputEmail}
              required
              type="email"
              className="py-4 px-8 rounded-lg transition duration-400 hover:bg-ais-blue-gray sm:col-span-2"
            />
            <input
              id="password-input"
              name="password"
              placeholder="Password"
              ref={inputPassword}
              required
              type="password"
              className="py-4 px-8 rounded-lg transition duration-400 hover:bg-ais-blue-gray sm:col-span-2"
            />
          </div>
          <div className="flex flex-wrap gap-4 items-center mt-4 justify-center">
            <button
              type="submit"
              className="transition duration-400 ease-in-out bg-blue-800 hover:bg-blue-600 rounded-full text-white font-semibold"
            >
              <div className="py-3 px-6 text-xl">Login</div>
            </button>

            <div className="text-md py-4 text-red-600">
              {message ? message : null}
            </div>
          </div>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
}
