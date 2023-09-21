import { RequestHandler } from "express";
import { verifyUser } from "../services/authService";
import { client } from "../models/clients";
import { gig } from "../models/gigs";

// export const getGigs: RequestHandler = async (req, res, next) => {
//     let usr = await verifyUser(req)
//     if (usr) {
//         try {
//             let gigs = await gig.findAll({
//                 where: { userId: usr.userId },
//                 limit: 20,
//                 include: [
//                     {
//                         model: client, // Include the client model
//                         as: 'Client', // Use the alias you have defined for the client model
//                     },
//                 ],
//             });

//             // Now, each gig object in the result will have a 'Client' attribute
//             res.status(200).send(gigs);
//         } catch (error) {
//             console.log(error)
//             res.status(500).send();
//         }
//     } else {
//         res.status(401).send();
//     }
// }

export const getGigs: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)
    if (usr) {
        try {
            let gigs: any = await gig.findAll({
                where: { userId: usr.userId },
                limit: 20,
            });

            // Iterate through the gigs and add a 'Client' attribute to each one
            for (let i = 0; i < gigs.length; i++) {
                const clientId = gigs[i].clientId;

                // Fetch the client information based on the clientId
                const clientInfo = await client.findByPk(clientId);

                // Add the 'Client' attribute to the gig
                gigs[i].dataValues.client = clientInfo;
            }

            res.status(200).send(gigs);
        } catch {
            res.status(400).send();
        }
    } else {
        res.status(401).send();
    }
}


export const getGig: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)
    if (usr) {
        try {
            let gigs = await gig.findAll({where: {userId: usr.userId}})
            let requestedGig: any = gigs.find((userGig) => userGig.gigId === parseInt(req.params.id, 10));

            if (!requestedGig) {
              return res.status(404).json({ error: 'Gig not found for the user.' });
            }
            let clint = await client.findByPk(requestedGig.clientId)
            requestedGig.client = clint
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
        } catch (error) {
            console.error(error);
            res.status(500).send();
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