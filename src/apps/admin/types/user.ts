// I use userId instead of id so that there is no conflict with the idea given in mySql database
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
}

export interface NewUser {
  userId: string;
  companyName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
