var http = require('http');





// Example code for node-snmp-native.
// ----

// This file contains examples of how to use the library.

// Basic setup
// -----

// The snmp object is the main entry point to the library.
var snmp = require('snmp-native');

var util = require('util');

var host = '192.168.1.28';
var community = 'public';

// A session is required to communicate with an agent.
var session = new snmp.Session({ host: host, community: community });

// All OIDs are represented as integer arrays.
// There is no interpretation of string or MIB names.
// This here is the OID for sysDescr.0.

var oidS = '.1.3.6.1.2.1.1.1.0';
var oidL = '.1.3.6.1.4.1.8072.1.3.2.4.1.2.10.120.101.110.45.115.116.97.116.115.50';
//var oidL = '.1.3.6.1.4.1.8072.1.3.2.4.1.2.9.120.101.110.45.115.116.97.116.115';


/*var oidStr = '.1.3.6.1.4.1.8072.1.3.2.4.1.2.9.120.101.110.45.115.116.97.116.115';
oid = oidStr
    .split('.')
    .filter(function (s) { return s.length > 0; })
    .map(function (s) { return parseInt(s, 10); });
*/
// Getting a single value
// -----

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});

    var session2 = new snmp.Session({ host: host, community: community });
    session2.getSubtree({ oid: oidL }, function (err, varbinds) {
        if (err) {
            // If there is an error, such as an SNMP timeout, we'll end up here.
            console.log(err);
        } else {
            // This is the list of varbinds.
            varbinds.forEach(function (vb) {
                res.write(vb.value + '\n');
                console.log(vb.oid + "  = " + vb.value);
            });
        }

        session2.close();
    });


  

}).listen(1337, '192.168.1.8');