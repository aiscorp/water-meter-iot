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
// $file = 'master:' + fileString
// README.md, nodemcu/readme.md, server/readme.md, client/README.md
export const GET_REPO_README = gql`
    query repository($file: String!) {
        repository(name: "water-meter-iot", owner: "aiscorp") {
            object(expression: $file) {
                ... on Blob {
                    text
                }
            }
        }
    }
`

