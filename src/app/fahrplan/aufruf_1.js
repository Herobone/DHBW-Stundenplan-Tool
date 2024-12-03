// diser code kommt von der deutschen bahn 
// (https://developers.deutschebahn.com/db-api-marketplace/apis/product/26497)
function get_info() {
	const request = require('request');

	const options = {
		method: 'GET',
		url: 'https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/fchg/8000105',
		headers: {
      			'DB-Client-Id': '0d56263e6d0e8ac4fb9501a89cb63f4c',
      			'DB-Api-Key': '2d0986e4e661e7661fd28dbee05420ce',
      			accept: 'application/xml'
    		}
  	};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
	});
	// return body;
}

get_info();