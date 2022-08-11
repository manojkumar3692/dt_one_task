# Getting Started with Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Run Application using docker 

* step 1 : docker build -t sample:dev .
* step 2 : 
docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    sample:dev

* step 3 : open localhost:30001

### `Run Application locally`

* step 1 : ensure you are using node 16 version
* step 2 : yarn 
* step 3 : yarn start

### `third party plugin used`
* http-proxy-middleware for resolving cors
* styled component for css
* axios for https call

### functionality 
* Filter by type
* Filter by Benefits
* List all products 