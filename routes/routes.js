'use strict'
var messageController = require('../controllers/messageController')
module.exports = function(app) {

        /**
 * @openapi
 * /api/messages :
 *   post:
 *     tags: 
 *      - Scheduler
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
 *                time : "02/06/2019 11.30"
 *                
 *     responses:
 *       202:
 *         description: Sucessfully scheduled message
 *        
 *       400: 
 *         description: Missing data/ Failed scheduling message
 *  
 */
      app.post('/api/messages', messageController.printMessage);

  }
