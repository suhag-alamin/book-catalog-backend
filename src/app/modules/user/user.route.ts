import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  console.log(req);
  res.json({
    message: 'Hello World',
  });
});

export const UserRoutes = router;
