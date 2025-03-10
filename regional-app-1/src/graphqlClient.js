import { gql, GraphQLClient } from 'graphql-request';
import Cookie from 'js-cookie';

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

const authorization = Cookie.get('authorization');
const client = new GraphQLClient(graphQlUrl, { headers: { authorization } });

export const getEquipments = (variables) => ({
    queryKey: ['equipments'],
    queryFn: async () => await client.request(equipmentsQuery, variables)
});
