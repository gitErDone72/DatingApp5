import { User } from './user.interface';

export class UserParams {
    gender: string;
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize = 5;
    orderBy = 'lastActive'

    constructor(user: User) {
        // hmmmm... should be "this.preferredGender" or something...
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}