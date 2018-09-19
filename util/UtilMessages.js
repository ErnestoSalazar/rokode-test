'use strict';

const Messages = {

    /**
     *  returns a string containing the property name that is empty
     * @param {string} propName
     * @returns {string}
     */
    propIsEmptyValue: (propName) => {
        return propName + ' must have a value';
    }
};

const RequestErrorMessages = {
    sendError: (req, res, error, status = 500) => {
        res.status(error.status || status);
        const error_message = error.message;
        const err = req.app.get('env') === 'development' ? error.stack : {};
        res.json({error_message, description:err});
    }
};


module.exports = {
    Messages,
    RequestErrorMessages
};