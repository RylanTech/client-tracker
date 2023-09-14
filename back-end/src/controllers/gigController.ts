import { RequestHandler } from "express";
import { verifyUser } from "../services/authService";
import { client } from "../models/clients";
import { gig } from "../models/gigs";

export const getGigs: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)
    if (usr) {
        try {
            let gigs = await gig.findAll({where: {userId: usr.userId}})
            res.status(200).send(gigs)
        } catch {
            res.status(400).send()
        }
    } else {
        res.status(401).send()
    }
    
}

export const getGig: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)
    if (usr) {
        try {
            let gigs = await gig.findAll({where: {userId: usr.userId}})
            const requestedGig = gigs.find((userGig) => userGig.gigId === parseInt(req.params.id, 10));

            if (!requestedGig) {
              return res.status(404).json({ error: 'Gig not found for the user.' });
            }
            res.status(200).send(requestedGig)
        } catch {
            res.status(400).send()
        }
    } else {
        res.status(401).send()
    }   
}

export const addGig: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)
    if (usr) {
        try {
            let gg: gig = req.body
            gg.userId = usr.userId
            if (gg) {
                let created = await gig.create(gg)
                if (created) {
                    res.status(200).send(created)
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