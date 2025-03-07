export default () => {
    const config = {
        port: parseInt(process.env.PORT ?? '3000', 10),
        database: {
            uri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/students-db',
        },
        nodeEnv: process.env.NODE_ENV ?? 'development',
    };
    
    console.log('Loading configuration...');
    console.log('MongoDB URI:', config.database.uri);
    
    return config;
}; 