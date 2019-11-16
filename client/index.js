const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { promisify } = require('util');

const packageDefinition = protoLoader.loadSync(
    '../cache.proto',
    {
        keepCase: true,
    },
);


const { cachepb } = grpc.loadPackageDefinition(packageDefinition);
const { CacheService } = cachepb;

const client = new CacheService('localhost:50051', grpc.credentials.createInsecure());
const getItem = promisify(client.Get.bind(client));
const storeItem = promisify(client.Store.bind(client));

(async () => {
    const item = await getItem({ key: 'color' });
    console.log('returned item:', item);
})();
