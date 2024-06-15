import { Outlet } from 'react-router-dom';
// Importing the 'App.css' file for styling
import './App.css';

// Import necessary components and functions from Apollo Client and other libraries
import { ApolloClient, InMemoryCache, ApolloLink, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import AppNavbar from './components/AppNavbar';


// Set `RestLink` with your endpoint
const restLink = new RestLink({ uri: "https://swapi.dev/api/" });

// Creating an authentication link to set the authorization header with a token
const link = new ApolloLink((operation, forward) => {
  // This is where you can do something with the request, like adding headers
  return forward(operation);
});

// Use restLink in your ApolloClient setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([restLink, link]), // Assuming 'link' is your existing ApolloLink instance
});

// Main App component
function App() {
  return (
    // Wrapping the entire application with ApolloProvider to enable Apollo Client functionality
    <ApolloProvider client={client}>
      {/* Including the 'AppNavbar' component instead of 'Navbar' */}
      <AppNavbar />
      {/* Rendering the content based on the current route using 'Outlet' from React Router */}
      <Outlet />
    </ApolloProvider>
  );
}

// Exporting the 'App' component as the default export
export default App;
