import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from 'src/app/users/store/models/users.models';

@Pipe({
  name: 'getUserNameById',
})
export class GetUserNameByIdPipe implements PipeTransform {
  transform(usersFromStore: IUser[] | null, users: string[]): string | null {
    if (usersFromStore) {
      const usersStr = users.flatMap((userId) =>
        usersFromStore
          .filter((userFromStore) => userFromStore._id === userId)
          .map((user) => user.name),
      );
      return usersStr.join(', ');
    }
    return null;
  }
}
