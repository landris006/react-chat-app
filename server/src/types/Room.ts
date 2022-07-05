interface Room {
  _id: string;
  name: string;
  members: User[];
  ownerId: string;
}
