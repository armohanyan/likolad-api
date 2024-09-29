import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware';
import Api from './api';
import Database from './database';
import express, { Request, Response, NextFunction } from 'express';


interface CorsOptions {
  origin?: string;
  methods?: string[];
  allowedHeaders?: string[];
  credentials?: boolean;
  optionsSuccessStatus?: number;
  maxAge?: number;
}

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use('/upload', express.static('upload')); // Serve static files

    this.app.get('/', (req: Request, res: Response) => {
      res.send('Likolad server is active')
  });
  
  }

  init() {
    this._setRequestLogger();
    this._setCors();
    this._setRequestParser();
    this._initializeApi();
    this._initializeDatabase()
    this._setErrorHandler();
  }

  private _setRequestLogger(): void {
    if (!config.DISABLE_REQUEST_LOG) {
      this.app.use(morgan('dev'));
    }
  }

  private _setCors(): void {
    const corsOptions: CorsOptions = {
      origin: process.env.CORS,
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
      credentials: true,
      optionsSuccessStatus: 200,
      maxAge: -1
    };
    this.app.use(cors(corsOptions));
  }

  private _setRequestParser(): void {
    this.app.use(bodyParser.json({ limit: '1mb' }));
    const extendedOptions: bodyParser.OptionsUrlencoded = { limit: '500mb', extended: false };
    this.app.use(bodyParser.urlencoded(extendedOptions));
  }

  private _initializeDatabase() {
    new Database().initialize()
  }

  private _initializeApi(): void {
    this.app.use('/api/v1', Api);
  }

  private _setErrorHandler(): void {
    this.app.use(ErrorHandlerMiddleware.init);
  }
}

export default new App();
