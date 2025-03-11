import { gql, GraphQLClient } from 'graphql-request';

const graphQlUrl = 'https://apollo.daikinlab.com/api';

const equipmentsQuery = gql`
    query equipments($name: String) {
        equipments(input: { name: $name }) {
            name
            id
            customAttribute
        }
    }
`;

let client;

export const initializeGraphQlClient = (token) =>
    client = new GraphQLClient(graphQlUrl, { headers: { authorization: `Bearer ${token}` } });

export const getEquipments = (variables) => ({
    queryKey: ['equipments'],
    queryFn: async () => await client.request(equipmentsQuery, variables)
});
