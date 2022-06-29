import * as Yup from 'yup';

const RegisterValidation = Yup.object({
  username: Yup.string().required().min(6).max(20).label('Username'),
  password: Yup.string().required().min(6).label('Password'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Confirm Password does not match')
    .label('Confirm Password')
});

export default RegisterValidation;
