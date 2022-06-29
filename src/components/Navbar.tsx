import Logo from './Logo';
import { signOut} from 'next-auth/react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useState, useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/features/UserSlice';

const Navbar = () => {
  const user = useAppSelector(selectUser);
  const userBtnRef = useRef<HTMLButtonElement>(null);

  const [showLogout, setShowLogout] = useState(false);

  useClickOutside(userBtnRef, () => setShowLogout(false));

  return (
    <div className="bg-white shadow-sm">
      <nav className="flex items-center justify-between container-fluid h-20">
        <Logo />

        <button
          ref={userBtnRef}
          className="btn-primary px-3 py-1 flex items-center rounded-md gap-1 relative"
          onClick={() => setShowLogout(!showLogout)}
        >
          <FaUserCircle />
          <h1>{user?.username}</h1>
          <FaCaretDown />
          <div
            className={`${
              showLogout ? '' : 'hidden'
            } text-primary-500 w-full px-3 py-[1px] absolute left-0 top-[calc(100%+.4rem)] bg-primary-100 shadow-md rounded-md`}
            onClick={() => signOut({ redirect: false })}
          >
            Logout
          </div>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
