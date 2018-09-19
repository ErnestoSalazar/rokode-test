'use strict';
const {Messages} = require('../util/UtilMessages');
const Encryption = require('../util/Encryption');
module.exports = (sequelize, DataTypes) => {
  const AccessTicket = sequelize.define('AccessTicket', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
            msg: Messages.propIsEmptyValue('name')
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: Messages.propIsEmptyValue('password')
        }
      }
    },
    ticketCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      isUUID: {
          msg: 'the system reached the tickets limit'
      }
    }
  });
  AccessTicket.associate = function(models) {
    // associations can be defined here
  };


    /**
     * creates and return an accessTicket object
     * @param {string} name
     * @param {string} password
     * @returns {Promise<*>}
     */
  AccessTicket.saveTicket = async (name, password) => {
    let error = null;
    password = Encryption.encrypt(password);
    const generatedTicketCode = await getTicket();
    const accessTicket = await sequelize.models.AccessTicket.create({
        name: name,
        password: password,
        ticketCode: generatedTicketCode
    }).catch((err) => {
      error = new Error(err.message);
      error.status = (err.errors[0].validatorName === 'isUUID') ? 500 : 400;
      return error;
    });

    if (error instanceof Error)
      return error;
    else
      return accessTicket;
  };

    /**
     * finds a ticket by a given id
     * @param {number} id
     * @returns {Promise<any>}
     */
  AccessTicket.findAccessTicketById = async (id) => {
    const accessTicket = await sequelize.models.AccessTicket.findOne({
        where: {
          id
        }
    });
    if (accessTicket === null) {
      const error = new Error('no access ticket was found');
      error.status = 404;
      return error;
    }
    return accessTicket;
  };


  /*private methods*/


    /**
     * returns a ticket code if the combination is available
     * @returns {Promise<*>}
     */
  const getTicket = async () => {
    const count = getTotalRecords();
    if (count >= 36400) { // this is the number of possible combinations that a ticket code can have with the XX-YY format
      return null;
    }
    let text = generateTicket();
    let findedTicketCode = await findUsedTicket(text);
    while(findedTicketCode) {
        text = generateTicket();
        findedTicketCode = await findUsedTicket(text);
    }
    return text;
  };

    /**
     * returns a ticket code
     * @returns {string}
     */
  const generateTicket = () => {
    let text = "";
    const possibleText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const possibleNumbers = "23456789";

    for (let i = 0; i < 2; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    text += '-';
    for (let i = 0; i < 2; i++) {
      text += possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length));
    }

    return text;
  };

    /**
     * returns an AccessTicket record by a given ticket code
     * @param {string} code
     * @returns {Promise<boolean>}
     */
  const findUsedTicket = async (code) => {
    const usedTicket = await sequelize.models.AccessTicket.findOne({
        where: {
            ticketCode: code
        }
    });

    return usedTicket !== null;
  };

    /**
     * returns the count of stored records
     * @returns {Promise<*>}
     */
  const getTotalRecords = async () => {
    return await sequelize.models.AccessTicket.count();
  };


  return AccessTicket;
};