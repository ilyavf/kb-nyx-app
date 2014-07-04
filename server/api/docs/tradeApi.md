Trade Photos

There are 3 api endpoints to get data for the trade list:
- List of recommendations
- List of trades
- List of pending trades

Every item in any of the lists contains:
- cluster id
- user id (matchUid)
- items to share
- items already shared
- items received

Also, all the items have only photo id (pid). To get the photo url (thumbnail) there is OpenPhoto api.

Here we want to aggregate all the api calls into one request to be sent from the browser.

Example. List of properties of the recommendation api:
['clusterId', 'matchUid', 'itemsToShare', 'startDate', 'endDate', 'timestamp', 'status']

Aggregated result structure:
{
    clusterId
    items : <list of 5 photo ids with thumbnail url>
    matches : [
        {
            matchUid
            matchClusterId
            itemsToShare
            itemsAlreadyShared
            itemsReceived
        }
    ]
}