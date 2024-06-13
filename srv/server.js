"use strict";

const cds = require("@sap/cds");
const xsenv = require('@sap/xsenv');
const JWTStrategy = require('@sap/xssec').JWTStrategy;
const passport = require('passport');
const jwt_decode = require('jwt-decode');
const scim = require("./BTP/scim");
const proxy = require("@sap/cds-odata-v2-adapter-proxy");
const cors = require('cors');

cds.on("bootstrap", app => {
    // app.use(fileupload({ createParentPath: true }));
    app.use(proxy());
    app.use(cors());
    if (!(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')) {
        // const xsuaaCredentials = xsenv.getServices({
        //     uaa: {
        //         tag: 'xsuaa'
        //     }
        // }).uaa;

        // passport.use(new JWTStrategy(xsuaaCredentials));

        // app.use(passport.initialize());
        // app.use(passport.authenticate('JWT', {
        //     session: false
        // }));
    }

    app.use('/sap/getUser', async (req, res) => {
        var ruolo = 0;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            res.send({});
        } else {
            if (req.query.email === undefined) {
                res.send({
                    userName: req.authInfo.getUserName(),
                    firstName: req.authInfo.getGivenName(),
                    lastName: req.authInfo.getFamilyName(),
                    token: req.authInfo.getTokenInfo().getTokenValue(),
                    role: jwt_decode(req.authInfo.getTokenInfo().getTokenValue())
                });
            }else {
                var creds = await scim.getCredentials();
                var btpToken = await scim.authBtp(creds.SCI, creds.SCS, creds.URL);
                var result = await scim.getUsers(btpToken, "?count=500");
                var arrUsers = [];

                _.each(result.resources, function (item) {
                    var emails = item.emails;
                    for (var i = 0; i < emails.length; i++) {
                        if (emails[i].value.toLowerCase() === req.query.email.toLowerCase()) {
                            arrUsers.push(item);
                        }
                    }
                });
                var singleUser = _.findWhere(arrUsers, { origin: 'sap.custom' });
                var groups = singleUser !== undefined ? singleUser.groups : [];
                var groupName = singleUser !== undefined ? singleUser.name : { familyName: 'Family Name not present', givenName: 'Name not present' };
                var arrRoles = [];
                var roles = _.each(groups, function (elem) { arrRoles.push(elem.value) });
                console.log(singleUser)
                res.send({
                    value: [{
                        id: singleUser !== undefined ? singleUser.id : "ID not present",
                        userName: singleUser !== undefined ? singleUser.userName : "UserName not present",
                        firstName: groupName.givenName !== undefined ? groupName.givenName : "Name not present",
                        lastName: groupName.familyName !== undefined ? groupName.familyName : "Family Name not present",
                        mail: req.query.email,
                        role: arrRoles
                    }]
                });

            }
        }
    })
})