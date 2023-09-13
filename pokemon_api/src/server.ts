import http from 'http';
import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import pokemonRoutes from "./routes/pokemon.routes";

const app: Express = express();

/** Middleware Configuration */

// Logging middleware for development
app.use(morgan('dev'));

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Middleware to parse incoming JSON bodies
app.use(express.json());

/** CORS Configuration */
app.use((req: Request, res: Response, next: NextFunction) => {
    // Set CORS policy for all origins
    res.header('Access-Control-Allow-Origin', '*');

    // Set CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

    // Set CORS method headers if method is OPTIONS
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
app.use('/pokemon', pokemonRoutes);

/** Error Handling */

// 404 handler for unmatched routes
app.use((req: Request, res: Response) => {
    const error = new Error('not found');
    res.status(404).json({
        message: error.message
    });
});

/** Create and Start the Server */

const PORT = process.env.PORT ?? 8080;
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
