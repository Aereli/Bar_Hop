const axios = require('axios')

axios.get('https://api.yelp.com/v3/businesses/search?term=bar&location=miami', {
  headers: {
    Authorization: 'Bearer cYFpFbXF-c4gssR0CO_0hSek9SsPJVfPAS2QGUSM_Z5JrTDz01SC_EAqMro8tbIxDjdowtCsI4WgsZwAxE5ka1dXupktHbPaC84vZknCIn858gqYMbHQWkqOmzmvXXYx'
  }
}).then(response => console.log(response.data)) 