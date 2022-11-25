import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { UserService } from 'src/user/user.service';

const AGE_LIMIT = 16;

@Injectable()
export class ParentControlMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    authorization = authorization.replace('Bearer ', '');

    const userId = Buffer.from(authorization, 'base64').toString();
    const userCalling = await this.userService.findOne(+userId);

    if (userCalling?.age < AGE_LIMIT) {
      return res
        .status(401)
        .send({ message: 'Unauthorized you are too young !!' });
    }
    next();
  }
}
