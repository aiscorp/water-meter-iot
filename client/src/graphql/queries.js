import gql from 'graphql-tag'


export const GET_REPO_INFO = gql`
    query {
        repository(name: "water-meter-iot", owner: "aiscorp") {
            name
            owner {
                login
                url
                avatarUrl
            }
            description
            createdAt
            pushedAt
            languages(first: 10) {
                edges {                    
                    node {
                        color
                        name
                    }
                    size
                }
                totalSize
                totalCount
            }
            collaborators(first: 10) {
                edges {
                    node {
                        name
                        login
                        avatarUrl
                        url
                    }
                }
            }
        }
    }
`

export const GET_REPO_FIRST_COMMITS = gql`
    query {
        repository(name: "water-meter-iot", owner: "aiscorp") {
            ref(qualifiedName: "master") {
                target {
                    ... on Commit {
                        history(first: 10) {
                            totalCount
                            edges {
                                node {
                                    messageHeadline
                                    oid
                                    commitUrl
                                    committedDate
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const GET_REPO_README = gql`
    query {
        repository(name: "water-meter-iot", owner: "aiscorp") {
            object(expression: "master:README.md") {
                ... on Blob {
                    text
                }
            }
        }
    }
`

export const GET_REPO_DEVICE_README = gql`
    query {
        repository(name: "water-meter-iot", owner: "aiscorp") {
            object(expression: "master:nodemcu/readme.md") {
                ... on Blob {
                    text
                }
            }
        }
    }
`

export const GET_REPO_SERVER_README = gql`
    query {
        repository(name: "water-meter-iot", owner: "aiscorp") {
            object(expression: "master:server/readme.md") {
                ... on Blob {
                    text
                }
            }
        }
    }
`

export const GET_REPO_FRONTEND_README = gql`
    query {
        repository(name: "water-meter-iot", owner: "aiscorp") {
            object(expression: "master:client/README.md") {
                ... on Blob {
                    text
                }
            }
        }
    }
`
