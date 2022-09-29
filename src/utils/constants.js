const localhost = 'http://localhost:3000/';

export const register_url = `${localhost}api/users/signup`;

export const login_url = `${localhost}api/users/signin`;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
