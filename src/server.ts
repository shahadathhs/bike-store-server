import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import { config } from './app/config/config';

const port: number = config.port as number;
const DATABASE_URL: string = config.mongo.url as string;

let server: Server;

async function start() {
  // ** Connect to MongoDB **
  await mongoose.connect(DATABASE_URL).then(() => {
    console.log('DB connected!');
  });

  // ** Start Server **
  server = app.listen(port, () => {
    console.log(`Bike Store 🚀 server is running on port ${port}!`);
  });
}

// ** Call start function **
start();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received. Shutting down the server gracefully...');
  if (server) {
    server.close(() => {
      console.log('Server closed due to SIGTERM');
    });
  }
});

process.on('SIGINT', () => {
  console.log('SIGINT is received. Shutting down the server gracefully...');
  if (server) {
    server.close(() => {
      console.log('Server closed due to SIGINT');
    });
  }
});

process.on('exit', (code) => {
  console.log(`Process exiting with code: ${code}`);
  if (server) {
    server.close(() => {
      console.log('Server closed on process exit');
    });
  }
});

process.on('uncaughtException', (error) => {
  console.error('uncaughtException is received. Error details:', error);
  if (server) {
    server.close(() => {
      console.log('Server closed due to uncaughtException');
    });
  }
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection is received. Reason:', reason);
  if (server) {
    server.close(() => {
      console.log('Server closed due to unhandledRejection');
    });
  }
  process.exit(1);
});
