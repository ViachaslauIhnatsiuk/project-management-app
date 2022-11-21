import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from 'src/app/users/store/models/users.models';

@Pipe({
  name: 'getUserNameById',
})
export class GetUserNameByIdPipe implements PipeTransform {
  transform(usersFromStore: IUser[] | null, users: string[]): string | null {
    if (usersFromStore) {
      return users
        .flatMap((userId) =>
          usersFromStore.filter(({ _id }) => _id === userId).map(({ name }) => name),
        )
        .join(', ');
    }
    return null;
  }
}
