import * as Yup from 'yup';

const LoginValidation = Yup.object({
  username: Yup.string().required().label('Username'),
  password: Yup.string().required().label('Password')
});

export default LoginValidation;
