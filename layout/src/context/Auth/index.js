import React, { useState, useEffect } from 'react';

import { AuthContext, useUserContext } from './context';
import { init } from './keycloak';

async function getGraphQLQuery(graphQlUrl, token, query, variables = {}) {
    const results = await fetch(graphQlUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'apollographql-client-name': 'playwright web-app'
        },
        credentials: 'include',
        body: JSON.stringify({
            query,
            variables
        })
    })
    const responseData = await results.json();
    console.log(responseData.data);
}

function Auth(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function initialize() {
            const sso = await init();
            setIsAuthenticated(sso.authenticated);
            setUser(sso.tokenParsed);
            const query = `
                query {
                    equipments {
                        name
                        id
                    }
                }
            `;

            const pokemonQuery = `
                query pokemons($limit: Int, $offset: Int) {
                    pokemons(limit: $limit, offset: $offset) {
                        count
                        next
                        previous
                        status
                        message
                        results {
                        url
                        name
                        image
                        }
                    }
                }
            `;
            const pokemonVariables = {
                limit: 2,
                offset: 1
            };
            const graphQlUrl = 'https://apollo.daikinlab.com/api';
            const pokemonGraphQlUrl = 'https://graphql-pokeapi.graphcdn.app/';
            getGraphQLQuery(graphQlUrl, sso.token, query)
            getGraphQLQuery(pokemonGraphQlUrl, null, pokemonQuery, pokemonVariables)
        }

        initialize();
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {isAuthenticated && props.children}
            {!isAuthenticated && 'Loading...'}
        </AuthContext.Provider>
    );
}

export default Auth;
export { useUserContext };
