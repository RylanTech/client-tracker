import { RequestHandler } from "express";
import { verifyUser } from "../services/authService";
import { client } from "../models/clients";

export const getClients: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)

    if (usr) {
        const userIdsString = usr.clientIds.split("")
        const userIds = userIdsString.forEach((string) => {
            return parseInt(string)
        })
        console.log(userIds)
    } else {
        res.status(401).send()
    }
}

export const addClient: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)
    if (usr) {
        try {
            let clnt: client = req.body
            clnt.userId = usr.userId
            if (clnt) {
                let removed = await client.create(clnt)
                if (removed) {
                    res.status(200).send(removed)
                } else {
                    res.status(400).send()
                }
            } else {
                res.status(400).send()
            }
        } catch {
            res.status(500).send()
        }
    } else {
        res.status(401).send()
    }

};

export const removeClient: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)
    if (usr) {
        try {
            const reqRemove = req.params.id

            if (usr.userId !== parseInt(reqRemove)) {
                res.status(400).send()
            }
            let removed = await client.destroy({ where: { clientId: reqRemove } })
            if (removed) {
                res.status(200).send(removed)
            } else {
                res.status(400).send()
            }
        } catch {
            res.status(500).send()
        }

    } else {
        res.status(401).send()
    }
};