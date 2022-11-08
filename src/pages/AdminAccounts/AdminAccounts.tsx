import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination/Pagination';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useDebounce from '../../hooks/useDebounce';
import { userSelector } from '../../store/user/userSelector';
import { AccountModel } from '../../utils/types';

import './AdminAccounts.scss';

const AdminAccounts = () => {
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [pageActive, setPageActive] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState({
    role: 'user',
    active: true,
  });
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector(userSelector);

  const searchUserDebounce = useDebounce(searchKey, 500);

  useEffect(() => {
    const fetchAccount = async (key: string, page: number, sort: {}) => {
      const res = await axiosPrivate.get('user', {
        params: {
          fields: 'active, id, name, email, role',
          limit: 20,
          page,
          key,
          ...sort,
        },
      });

      if (res.status === 200) {
        setAccounts(res.data.data.data);
        setTotalPages(res.data.totalPages);
        setIsUpdate(false);
      }
    };

    fetchAccount(searchUserDebounce, pageActive, sort);
  }, [axiosPrivate, searchUserDebounce, isUpdate, pageActive, sort]);

  const searchKeyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  const adminCheckChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const { id, checked } = e.target;

      if (user.id === id) {
        toast.warning('Not change yourself!');
        return;
      }
      const res = await axiosPrivate.patch(`user/${id}`, {
        role: checked ? 'admin' : 'user',
      });

      if (res.status === 200) {
        toast.success(`update ${checked ? 'Admin' : 'User'} for ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const activeAccountHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const { id: tempId, checked } = e.target;

      const id = tempId.replace('active', '').trim();
      if (user.id === id) {
        toast.warning('Do not unActive for yourself!');
        return;
      }

      console.log({ id, checked });

      const res = await axiosPrivate.patch(`user/${id}`, {
        active: checked,
      });

      if (res.status === 200) {
        toast.success('Update!');
        setIsUpdate(true);
      }
    } catch (error) {}
  };

  const pageChangeHandler = (page: any) => {
    setPageActive(page.selected + 1);
  };

  const sortChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (id === 'role') {
      setSort({ ...sort, role: checked ? 'admin' : 'user' });
    }
    if (id === 'active') {
      setSort({ ...sort, active: checked });
    }
  };

  return (
    <section className="admin-account">
      <div className="admin-account__header">
        <div className="admin-account__sort">
          <label htmlFor="role">
            <input
              type="checkbox"
              id="role"
              checked={sort.role === 'admin'}
              onChange={sortChangeHandler}
            />
            <i></i>
            <span>Admin</span>
          </label>
          <label htmlFor="active">
            <input
              type="checkbox"
              id="active"
              checked={sort.active}
              onChange={sortChangeHandler}
            />
            <i></i>
            <span>Active</span>
          </label>
        </div>
        <div className="admin-account__search">
          <SearchInput
            value={searchKey}
            onChange={searchKeyChangeHandler}
            onClear={() => setSearchKey('')}
            placeholder="Enter email..."
          />
        </div>
      </div>
      <div className="admin-account__heading">
        <div className="admin-account__h-block">
          <h3>ID</h3>
        </div>
        <div className="admin-account__h-block">
          <h3>User name</h3>
        </div>
        <div className="admin-account__h-block">
          <h3>Email</h3>
        </div>
        <div className="admin-account__h-block">
          <h3>Amin</h3>
        </div>
        <div className="admin-account__h-block">
          <h3>Active</h3>
        </div>
      </div>
      <ul className="admin-account__list">
        {accounts.map(account => {
          return (
            <li key={account.id} className="admin-account__item">
              <div className="admin-account__content">
                <span className="admin-account__span">{account.id}</span>
              </div>
              <div className="admin-account__content">
                <h4 className="admin-account__span">{account.name}</h4>
              </div>
              <div className="admin-account__content">
                <span className="admin-account__span">{account.email}</span>
              </div>
              <div className="admin-account__content">
                <label htmlFor={account.id}>
                  <input
                    type="checkbox"
                    id={account.id}
                    defaultChecked={account.role === 'admin'}
                    onChange={adminCheckChangeHandler}
                  />
                  <i></i>
                </label>
              </div>
              <div className="admin-account__content">
                <label htmlFor={`active${account.id}`}>
                  <input
                    type="checkbox"
                    id={`active${account.id}`}
                    defaultChecked={account.active}
                    onChange={activeAccountHandler}
                  />
                  <i></i>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      {totalPages > 1 && (
        <div className="admin-account__footer">
          <Pagination
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
          />
        </div>
      )}
    </section>
  );
};
export default AdminAccounts;
