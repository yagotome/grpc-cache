const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    '../cache.proto',
    {
        keepCase: true,
    },
);


const { cachepb } = grpc.loadPackageDefinition(packageDefinition);
const { CacheService } = cachepb;

const client = new CacheService('localhost:50051', grpc.credentials.createInsecure());
client.Get({ key: 'color' }, (err, item) => {
    console.log('returned item:', item);
});