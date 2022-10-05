type Error_Resonse_Type = {
  response_msg: string;
  error: boolean;
  status?: number;
  id?: string | number;
};

// Error response msg
export class Error {
  error_401 = {
    error: true,
    response_msg: "Unauthorized access.",
    status: 401,
  };
  error_500 = {
    error: true,
    response_msg: "Server Error Contact Administrator.",
    status: 500,
  };
  error_404 = {
    error: true,
    response_msg: "Your request was not found in the database.",
    status: 404,
  };
  error_400: Error_Resonse_Type = {
    response_msg:
      "The format of the data you are trying to send is the wrong format.",
    error: true,
    status: 400,
  };

  error_409 = {
    error: true,
    response_msg: "Conflict, This Data Already Exists.",
  };
  email = {
    error: true,
    response_msg:
      "Email Not Vaild, Check all letters and make sure that they are lowercase letters in your email.",
  };
}
