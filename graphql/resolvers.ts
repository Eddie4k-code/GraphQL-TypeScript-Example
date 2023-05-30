// Contains all queries and mutations defined in the Schema. Resolvers contain the actual implementation of how to fetch or manipulate data.

import { CreateReadStreamOptions } from "fs/promises";
import { GraphQLError } from "graphql";
import { randomUUID } from "node:crypto";
import { User, UserArray } from "../model/User"


//Types
type CreateUserInput = {
    name: string,
    email: string
}

export const resolvers = {
    //Retrieves all users
    users: async (): Promise<User[]> => {
        return UserArray
    },

    //Retrieve a specific user.
    user: async ({ id }: { id: string }): Promise<User> => {

        try {

            let foundUser: User | undefined = await UserArray.find((user) => id === user.id);

            if (!foundUser) {
                throw new Error('User does not exist');
            }

            return foundUser;

        } catch (err:any) {

            console.log(err);
            throw new GraphQLError(err.message);
            
        }
        
    },

    //Mutation to create a user.
    createUser: async ({ name, email } : CreateUserInput) : Promise<User> => {
        let newUser: User = {
            id: randomUUID(),
            name: name,
            email: email
        }

        UserArray.push(newUser);

        return newUser;

    }


}