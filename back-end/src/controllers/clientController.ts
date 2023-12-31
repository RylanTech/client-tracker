import { RequestHandler } from "express";
import { verifyUser } from "../services/authService";
import { client } from "../models/clients";
import { user } from "../models/user";
import { Op, Sequelize } from "sequelize";

export const getClients: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)

    if (usr) {

        const clientIds: number[] = JSON.parse(usr.clientIds || '[]');

        // Use the clientIds array to query the clients table.
        const clients = await client.findAll({
            where: {
                clientId: clientIds, // Assuming clientIds is an array of client IDs.
            },
            limit: 15,
        });
        res.status(200).json(clients)
    } else {
        res.status(401).send()
    }
}

export const getClient: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)

    try {
        if (usr) {

            const clientIds: number[] = JSON.parse(usr.clientIds || '[]');

            let id = clientIds.includes(parseInt(req.params.id))

            if (id) {
                const clint = await client.findByPk(req.params.id)
                res.status(200).send(clint)
            } else {
                res.status(404).send()
            }
        } else {
            res.status(401).send()
        }
    } catch {
        res.status(500).send()
    }
}

export const addClient: RequestHandler = async (req, res, next) => {
    try {
        // Verify the user (implement your verification logic here).
        const usr = await verifyUser(req);
        if (!usr) {
            return res.status(401).send();
        }

        // Create a new client using the request body.
        const newClientData = req.body;
        newClientData.userId = usr.userId;
        newClientData.clientValue = 0;

        const createdClient = await client.create(newClientData);

        // Check if the client was successfully created.
        if (!createdClient) {
            return res.status(400).send();
        }

        // Update the user's clientIds array.
        const updatedUser = await user.findByPk(usr.userId);

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Convert the clientIds string to an array of numbers.
        const updatedClientIds: number[] = JSON.parse(updatedUser.clientIds || '[]');

        // Add the new client's ID to the user's clientIds array.
        updatedClientIds.push(createdClient.clientId);

        // Update the user's clientIds in the database.
        await updatedUser.update({ clientIds: JSON.stringify(updatedClientIds) });

        return res.status(200).json(createdClient);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
}

export const searchClient: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)

    try {
        if (usr) {
            const { query } = req.params;

            let searchResults = await client.findAll({
                where: {
                    [Op.or]: [
                        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${query.toLowerCase()}%`),
                        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', `%${query.toLowerCase()}%`),
                    ]
                },
                limit: 15
            });
            res.json(searchResults);
        } else {
            res.status(401).send()
        }

    } catch {
        res.status(500).send()
    }
}

export const editClient: RequestHandler = async (req, res, next) => {
    try {
        let usr: user | null = await verifyUser(req);
        if (!usr) {
            return res.status(403).send();
        }

        let clientId = req.params.id;
        let editedClientData: client = req.body;

        // If location is an object, stringify it

        let MatchingClient = await client.findByPk(clientId);

        // Make sure the same user who created it is editing
        let userId = req.body.userId;

        let userFound = await user.findByPk(userId);
        if (!userFound || userFound.userId !== usr.userId) {
            return res.status(403).send("Not the same user");
        }


        if (
            MatchingClient &&
            MatchingClient.userId &&
            MatchingClient.email &&
            MatchingClient.name
        ) {
            if (MatchingClient.userId === editedClientData.userId) {
                await client.update(editedClientData, { where: { clientId: clientId } });
                return res.status(200).send("client edited");
            } else {
                return res.status(400).json();
            }
        }
    } catch (error: any) {
        res.status(500).send(error.message || "Some error occurred while editing the client.");
    }
};

export const removeClient: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)
    if (usr) {
        try {
            const reqRemove = req.params.id

            const clientIds: number[] = JSON.parse(usr.clientIds || '[]');

            let id = clientIds.includes(parseInt(req.params.id))

            if (!id) {
                res.status(400).send()
            }

            const updatedUser = await user.findByPk(usr.userId);

            if (updatedUser) {
                const updatedClientIds = clientIds.filter(id => id !== parseInt(reqRemove));
                // Assuming usr is a Sequelize model, update the clientIds property

                console.log(updatedClientIds)

                await updatedUser.update({ clientIds: JSON.stringify(updatedClientIds) });

                await client.destroy({ where: { clientId: reqRemove } })
            } else {
                res.status(500).send()
            }
        } catch {
            res.status(500).send()
        }

    } else {
        res.status(401).send()
    }
};