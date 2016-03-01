import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql'

import nodeType from './nodeType';
import axios from 'axios';
import cheerio from 'cheerio'

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            page: {
                type:nodeType,
                args: {
                    url:{
                        type: new GraphQLNonNull(GraphQLString),
                        description: "Page url"
                    }
                },
                resolve(root, args){
                  return axios.get(args.url)
                      .then( response => cheerio.load(response.data))
                }
            }
        }
    })
});
export default Schema;