import { Dto } from 'src/lib/dto/Dto';

export class JwtUser extends Dto<JwtUser> {
  username: string;
  userId: { id: string };
}

export const toUserId = (user: JwtUser) => Number(user.userId.id);
