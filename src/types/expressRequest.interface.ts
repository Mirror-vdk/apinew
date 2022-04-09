import { Request } from 'express';
import { UsersEntity } from '../users/users.entity';

export interface ExpressRequestInterface extends Request {
  user?: UsersEntity;
}
