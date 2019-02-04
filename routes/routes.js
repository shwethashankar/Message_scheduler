'use strict'
var techjiniController = require('../controllers/techjini_controller')
module.exports = function(app) {

        /**
 * @openapi
 * /techjini/print-message :
 *   post:
 *     tags: 
 *      - Techjini
 *     description: Prints a message at scheduled time
 *     requestBody : 
 *       description: Message to be printed
 *       required: true
 *       content:
 *         application/json:
 *           schema : 
 *             type : object 
 *             properties :
 *                message :
 *                   type : string
 *                time :
 *                   type : string
 *               
 *             example :
 *                type : "hello!!!"
 *                time : "11.30"
 *                
 *     responses:
 *       202:
 *         description: Sucessfully scheduled message
 *        
 *       400: 
 *         description: Missing data/ Failed scheduling message
 *  
 */
      app.post('/techjini/print-message', techjiniController.printMessage);

  }
