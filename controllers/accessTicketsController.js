'use strict';

const   models = require('../models'),
        Errors = require('../util/UtilMessages').RequestErrorMessages;

/**
 * creates a new AccessTicket record
 *
 * {
 *      "name": string,
 *      "password": string
 * }
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|void>}
 */
const postAccessTicket = async (req, res, next) => {

    if(!req.body.password) {
        const error = new Error('password field must have a value');
        error.status = 400;
        return Errors.sendError(req, res, error);
    }

    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(req.body.password)) {
        const error = new Error('password needs tu be at least 8 characters long and contain one uppercase english letter, one digit, and one special character');
        error.status = 400;
        return Errors.sendError(req, res, error);
    }

    const accessTicket = await models.AccessTicket.saveTicket(req.body.name, req.body.password);

    if (accessTicket instanceof Error) {
        return Errors.sendError(req, res, accessTicket);
    }

    res.json(accessTicket)
};



module.exports = {
    postAccessTicket
};