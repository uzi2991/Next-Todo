import { useAppSelector } from '../store/hooks';
import styles from './Alert.module.css';
import { selectAlertById } from '../store/features/AlertSlice';

type Props = {
  id: string;
};

const Alert = ({ id }: Props) => {
  const alert = useAppSelector((state) =>
    selectAlertById(state, id)
  );

  if (!alert) {
    return null;
  }

  return (
    <div className={`px-2 py-1 rounded-md text-center ${styles[alert.type]}`} id={id}>
      {alert.message}
    </div>
  );
};

export default Alert;
