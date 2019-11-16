const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { promisify } = require('util');

const packageDefinition = protoLoader.loadSync('../cache.proto');

const { cachepb } = grpc.loadPackageDefinition(packageDefinition);
const { CacheService } = cachepb;

const client = new CacheService('localhost:50051', grpc.credentials.createInsecure());
const getItem = promisify(client.Get.bind(client));
const storeItem = promisify(client.Store.bind(client));

(async () => {
    const item = await getItem({ key: 'color' });
    console.log('returned item:', item);
    
    await storeItem({ key: 'color', value: 'red' });
    await storeItem({ key: 'champion', value: 'Flamengo' });

    const { value: color } = await getItem({ key: 'color' });
    const { value: champion } = await getItem({ key: 'champion' });
    console.log('returned color:', color);
    console.log('returned champion:', champion);
})();
