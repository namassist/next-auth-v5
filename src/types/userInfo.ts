interface Meta {
  success: boolean;
  message: string;
}

interface Results {
  userName: string;
  userEmail: string;
  userRole: string;
  created: string;
}

interface UserInfoSuccess {
  meta: Meta;
  results: Results;
}

interface UserInfoError {
  meta: Meta;
}

type UserInfoResponse = UserInfoSuccess | UserInfoError;
