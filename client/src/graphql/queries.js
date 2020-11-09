import gql from 'graphql-tag'


export const GET_REPO_INFO = gql`
    query {
        repository(name: "water-meter-iot", owner: "aiscorp") {
            description
            createdAt
            pushedAt
            languages(first: 10) {
                edges {
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
                    }
                }
            }
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
