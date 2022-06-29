import * as Yup from 'yup';

const TodoValidation = Yup.object({
  title: Yup.string().required().label('Title'),
  content: Yup.string().label('Content'),
  status: Yup.string()
    .oneOf(['todo', 'doing', 'done'])
    .required()
    .label('Status')
});

export default TodoValidation;
