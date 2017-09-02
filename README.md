# cmx-idea-pool
### What is my idea pool?
 My Idea Pool is a service that records your ideas! After signing up for an account, users can log their ideas and assign them scores. Every idea contains 3 scores: Impact, Ease and Confidence. Each idea can be added, edited and deleted. All the ideas will be sorted by the average of all three scores. Every API call will return 10 ideas. When not using the service, users can log out of the system.


### How to run app
- step 1 : `git clone <REPOSITORY_URL>`
- step 2 : `npm install`
- step 3 : Create a `.env` file in the root folder and add the following

```javascript
db_url_dev=mongodb://127.0.0.1:27017/cmx-idea
jwt_secret_dev=areallylongsecretthatonlymeknowsabout
```

- step 4: `npm run start`

Your app should be accessible on localhost:4002 on the browser

## To test the app run
`npm run test`