import { UsersEntity } from '../users.entity';

export type UserType = Omit<UsersEntity, 'hashPassword'>;
