Login.propTypes = {
  isLoggedIn: PropTypes.bool,
  loginSuccess: PropTypes.func,
};

function Login(props) {
  const navigate = useNavigate();

  const _logger = logger.extend("App");
  _logger("props", props);

  const { state } = useLocation();

  const [user] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (values) => {
    _logger("handleSubmit", values);

    usersService.login(values).then(loginSuccess).catch(loginError);
  };

  const loginError = (err) => {
    _logger("loginError:", err);
    let errMessage = err;
    if (err.message) {
      if (err.message === "Request failed with status code 404") {
        errMessage =
          "The requested user either has not been verified, or does not exists with the provided email and password combination.";
      } else {
        errMessage =
          "A login error occurred. Please contact technical support at: \n- Email: support@geeksui.com\n- Phone: (000) 123 456 789";
      }
    }
    swal.fire({
      closeOnCancel: true,
      backdrop: false,
      heightAuto: false,
      title: "Login failed!",
      text: errMessage,
      icon: "error",
    });
  };

  const loginSuccess = (response) => {
    _logger(response);

    usersService.getCurrent().then(getSuccess).catch(getFail);
  };

  const getFail = (err) => {
    _logger("Get Current User Fail:" + err);
    let errMessage = err;
    if (err.message) {
      if (err.message === "Request failed with status code 404") {
        errMessage = "No user exists with the email and password combination.";
      } else {
        errMessage =
          "A login error occurred. Please contact technical support at: \n- Email: support@geeksui.com\n- Phone: (000) 123 456 789";
      }
    }
    swal.fire({
      closeOnCancel: true,
      backdrop: false,
      heightAuto: false,
      title: "Login failed!",
      text: errMessage,
      icon: "error",
    });
  };

  const getSuccess = (response) => {
    _logger("Get Current User Success:" + response);
    const currentUser = {
      ...response.item,
    };
    currentUser.isLoggedIn = true;

    if (currentUser && currentUser.isLoggedIn) {
      if (state !== null && state.type && state.type !== null) {
        //if type was passed in state, redirect to that page after login
        navigate(state.type, { state: { currentUser } });
      } else if (currentUser.roles.includes("Admin")) {
        navigate("/dashboard/overview", { state: { currentUser } });
      } else if (currentUser.roles.includes("Merchant")) {
        navigate("/dashboard/merchant", { state: { currentUser } });
      } else if (currentUser.roles.includes("Borrower")) {
        navigate("/dashboard/borrower", { state: { currentUser } });
      } else {
        navigate("/", { state: { currentUser } });
      }
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={user}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Container className=''>
          <Row className='justify-content-center pb-20'>
            <Col xl={6} lg={6} md={12}>
              <Form className='mt-8 start-50'>
                <Card className='login-card-width h-100'>
                  <Card.Body>
                    <Image src={Logo} alt="" className="pb-5"/>
                    <div className='mb-4'>
                      <p className="fw-semi-bold">Welcome back !!!</p>
                      <h1 className='fw-bold display-3'>
                        Sign in
                      </h1>
                    </div>
                    <div>
                      <div className='mb-3'>
                        <a>Email</a>
                        <Field
                          type='email'
                          className='form-control'
                          id='email'
                          name='email'
                          placeholder='Enter email'
                        />
                        <ErrorMessage
                          name='email'
                          component='div'
                          className='text-danger'
                        />
                      </div>
                      <div className='mb-3'>
                        <li className="d-flex justify-content-between">
                          <a>Password</a>
                          <Link to='/resetpassword'>Forgot Password?</Link>
                        </li>
                        <Field
                          type='password'
                          className='form-control'
                          name='password'
                          id='password'
                          placeholder='Enter password'
                        />
                        <ErrorMessage
                          name='password'
                          component='div'
                          className='text-danger'
                        />
                      </div>
                      <div className='d-flex justify-content-center'>
                        <button type='submit' className='btn login-button'>
                          SIGN IN &nbsp; ⇀
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 d-flex justify-content-center">
                        I dont have an account?&nbsp;
                        <Link to='/register'> Sign Up </Link>
                    </p>
                  </Card.Body>
                  <Card.Footer className='bg-white px-6 py-4'>
                    <div className='text-center mt-n5  lh-1'>
                      <span className='bg-white px-2 fs-6'>Or</span>
                    </div>
                    <h1 className='mt-2 fw-bold h3 text-center'>
                      Log In With
                    </h1>
                    <div className='d-flex justify-content-center'>
                        <div
                          className='btn-group m-1'
                          role='group'
                          aria-label='socialButton'
                        >
                          <button
                            type='button'
                            className='btn btn-outline-white shadow-sm'
                          >
                            <Icon
                              path={mdiEmail}
                              size={1}
                              className='text-danger'
                            />{" "}
                            Google
                          </button>
                        </div>
                        <div
                          className='btn-group m-1'
                          role='group'
                          aria-label='socialButton'
                        >
                          <button
                            type='button'
                            className='btn btn-outline-white shadow-sm'
                          >
                            <Icon
                              path={mdiFacebook}
                              size={1}
                              className='text-primary'
                            />{" "}
                            Facebook
                          </button>
                        </div>
                        <div
                          className='btn-group m-1'
                          role='group'
                          aria-label='socialButton'
                        >
                          <button
                            type='button'
                            className='btn btn-outline-white shadow-sm'
                          >
                            <Icon
                              path={mdiTwitter}
                              size={1}
                              className='text-info'
                            />{" "}
                            Twitter
                          </button>
                        </div>
                      </div>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
}
export default Login;
