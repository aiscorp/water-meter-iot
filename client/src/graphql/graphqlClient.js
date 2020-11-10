import ApolloClient from 'apollo-boost'

const graphqlClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_API_GITHUB_KEY}`
  }
})

export default graphqlClient
