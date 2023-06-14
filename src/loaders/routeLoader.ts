import express, { Application, Request, Response } from 'express';
import userRouter from '../api/routes/userRoutes';
import authRouter from '../api/routes/authRoutes';
import mypageRouter from '../api/routes/mypageRoutes';
import travelRouter from '../api/routes/travelRoutes';
import diaryRouter from '../api/routes/diaryRoutes';
import commentRouter from '../api/routes/commentRoutes';
import adminRouter from '../api/routes/adminRoutes';
import destinationRouter from '../api/routes/destinationRoutes';
const routeLoader = (app: Application): Application => {

  app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
  });

  app.get('/auth/google/callback', authRouter);
  app.get('/auth/kakao/callback', authRouter);

  app.use('/static', express.static('public'));

  app.use('/users', authRouter);
  app.use('/users', userRouter);
  app.use('/mypage', mypageRouter);
  app.use('/travels', travelRouter);
  app.use('/destinations', destinationRouter);
  app.use('/diaries', diaryRouter);
  app.use('/comments', commentRouter);
  app.use('/admin', adminRouter);

  return app;
};

export default routeLoader;
