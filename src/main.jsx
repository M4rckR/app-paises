
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import './styles.css';


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/', 
  cache: new InMemoryCache(), 
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

