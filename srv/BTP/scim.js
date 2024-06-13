const PORT = process.env.PORT || 4559;

const cfenv = require('cfenv');
const axios = require('axios');
const hostBTP = "https://c2a83dd6trial.authentication.us10.hana.ondemand.com"

async function getCredentials() {
    var appEnv = cfenv.getAppEnv();
    var vf_up = appEnv.getServices()["vechile_sidebyside-auth"];
    var credentials = vf_up !== undefined ? vf_up.credentials : {};
    var scid = credentials.SCI;
    var scscrt = credentials.SCS;
    var url = credentials.URL;
    //console.log("\x1b[32m", "App Env servizi:\n" + JSON.stringify(credentials));
    console.log('"\x1b[30m"', "-----------------------");

    return { "SCI": scid, "SCS": scscrt, "URL": url };
}

async function authBtp(btpUser, btpPassword, btpServiceTokenUrl) {

    var buff = Buffer.from(btpUser + ":" + btpPassword, 'utf8');
    var btpBasicAuth = 'Basic ' + buff.toString('base64');

    // get bearer token from btp
    var btpConfig = {
        'method': 'POST',
        'url': btpServiceTokenUrl,
        'headers': {
            'Authorization': btpBasicAuth
        }
    };

    var response = await getToken(btpConfig);
    const btpBearerToken = response.data.access_token;

    return btpBearerToken;
}

async function getUsers(token, suffixUrl) {
    var results = undefined;
    var startIndex = 1;
    
    do {
        var btpServiceUrl = hostBTP + "/Users" + suffixUrl + "&startIndex=" + startIndex
        var btpOptions = {
            method: "GET",
            url: btpServiceUrl,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
            }
        };

        var responseBTP = await axios(btpOptions);
        var totalResults = responseBTP.data.totalResults;
        startIndex += 500;
        if (results === undefined) {
            results = responseBTP.data;
        } else {
            var resources = results.resources.concat(responseBTP.data.resources);
            results.resources = resources;
        }
    } while (totalResults >= (startIndex))
      //console.log(" --> OK:" + JSON.stringify(responseBTP.data.totalResults));
         
    return results;

}

function getToken(conf) {
    return axios(conf);
}


module.exports = {
    getCredentials,
    authBtp,
    getUsers
}