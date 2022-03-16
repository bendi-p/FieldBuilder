var axios = require("axios");
var FieldService =  {
	getField: function(id) {
		return {
		  "label": "Sales region",
		  "required": true,
		  "choices": [
			"Asia",
			"Australia",
			"Western Europe",
			"North America",
			"Eastern Europe",
			"Latin America",
			"Middle East and Africa"
		  ],
		  "displayAlpha": true,
		  "default": "North America"
		}
	},
	saveField: function (fieldJson) {
		// Add the code here to call the API (or temporarily, just log fieldJson to the console)
        console.log(fieldJson, 'field JSON');
        axios.post("http://www.mocky.io/v2/566061f21200008e3aabd919", fieldJson).then(res => {
            console.log(res, 'res from api endpoint');
			alert('Fields saved');
        }).catch(err => {
            console.log(err, 'err from api endpoint');
        })
	}
}

module.exports = FieldService;