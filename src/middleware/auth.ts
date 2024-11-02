import { Request, Response, NextFunction, RequestHandler } from 'express';

const apiKeyMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.API_KEY;
  
    if (apiKey !== validApiKey) {
       res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
       return; 
    }
  
    next();
  };

export default apiKeyMiddleware;