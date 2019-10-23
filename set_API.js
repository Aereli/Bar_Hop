const axios = require('axios')

const apiKey = 'cYFpFbXF-c4gssR0CO_0hSek9SsPJVfPAS2QGUSM_Z5JrTDz01SC_EAqMro8tbIxDjdowtCsI4WgsZwAxE5ka1dXupktHbPaC84vZknCIn858gqYMbHQWkqOmzmvXXYx'

const getAllPages = async () => {
  const requests = []
  let failures = []
  const bars = []

  const url = pageNum => `https://api.yelp.com/v3/businesses/search?term=bar&location=miami&limit=50&offset=${pageNum*50}`

  const pageRequest = pageNum => (
    axios.get(url(pageNum), { headers: { Authorization: `Bearer ${apiKey}` }})
      .catch(_ => {
        failures.push(pageNum)
        return undefined
      })
  )

  const tryToGetData = async requests => {
    (await Promise.all(requests))
        .filter(response => !!response) // ignore ones that return undefined because of error
        .map(response => response.data.businesses.map(business => {
          const { name, image_url } = business
          return { name, image_url }
        }))
        .forEach(bar => bars.push(bar))
  }

  for (let pageNum = 0; pageNum < 20; pageNum++){
    requests.push(pageRequest(pageNum))
  }

  await tryToGetData(requests)

  do {
    const failedPageNums = [...failures]
    failures = []
    await tryToGetData(failedPageNums.map(pageNum => pageRequest(pageNum)))
  }while(failures.length)

  console.log(bars)
}

getAllPages()