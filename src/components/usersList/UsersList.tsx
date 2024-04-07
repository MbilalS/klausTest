import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import UserService from '../services/user.service';
import { UserType } from '../types/user.types';
import { CommonButton } from '../buttons/CommonButton';
import { Avatar, Checkbox, Grid, ListItemText } from '@mui/material';
import './UsersList.scss';

const userService = new UserService();
const rolesTextColorMap: { [key: string]: string } = {
  ADMIN: '#574195',
  AGENT: '#2C5282',
  ACCOUNT_MANAGER: '#922B6C',
  EXTERNAL_REVIEWER: '#91472C',
}
const rolesBackgroundColorMap: { [key: string]: string } = {
  ADMIN: '#EFE2FE',
  AGENT: '#C8E7F9',
  ACCOUNT_MANAGER: '#FEDDE6',
  EXTERNAL_REVIEWER: '#FEEBC8',
}
const START_ROW_NUMBER = 0;
const END_ROW_NUMBER = 25;

type UserListProps = {
  searchQuery: string;
}

export const UsersList = ({ searchQuery }: UserListProps) => {
  const [usersData, setUsersData] = useState<UserType[]>([]);
  const [usersFullList, setUsersFullList] = useState<UserType[]>([]);
  const [startRowNumber, setStartRowNumber] = useState(START_ROW_NUMBER);
  const [endRowNumber, setEndRowNumber] = useState(END_ROW_NUMBER);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // Simulated user data
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(25);

  // Handle pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  useEffect(() => {
    const getUsersList = async () => {
      const usersList: UserType[] = await userService.getUsersList();

      setUsersData(usersList.slice(startRowNumber, endRowNumber));

      setUsersFullList(usersList);
    }

    getUsersList();
  }, []);

  const searchResult = useMemo(() => {
    if (!searchQuery) {
      return usersFullList;
    }

    return usersFullList?.filter((value) => value.name.toLowerCase().includes(searchQuery.toLowerCase()));    
  }, [searchQuery, usersFullList]);

  console.log(searchResult, 'searchResult');

  useEffect(() => {
    if (searchResult.length > 0) {
      setUsersData(searchResult.slice(startRowNumber, endRowNumber));
    } else {
      setUsersData([]);
    }
  }, [endRowNumber, searchResult, startRowNumber]);

  // Get users list
  // const getUsersData = async () => {
  //   try {
      
  //     const listSize = searchResult?.length;

  //     setUsersData(searchResult.slice(startRowNumber, endRowNumber));

  //     if (listSize >= startRowNumber) {
  //       setStartRowNumber(startRowNumber + END_ROW_NUMBER);
  //       setEndRowNumber(endRowNumber + END_ROW_NUMBER);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // fetch next rows
  const fetchNextRows = async () => {
    try {
      const nextRows = searchResult.slice(startRowNumber, endRowNumber);

      setUsersData(nextRows);

      if (searchResult?.length >= startRowNumber) {
        setNextPage();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPreviousRows = async () => {
    console.log('fetchPreviousRows called');
    
    try {
      const previousRows = searchResult.slice(startRowNumber - END_ROW_NUMBER, endRowNumber - END_ROW_NUMBER);

      setUsersData(previousRows);

      if (searchResult?.length >= startRowNumber) {
        setPreviousPage();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const setNextPage = () => {
    setStartRowNumber(startRowNumber + END_ROW_NUMBER);
    setEndRowNumber(endRowNumber + END_ROW_NUMBER);
  };

  const setPreviousPage = () => {
    setStartRowNumber(END_ROW_NUMBER - startRowNumber);
    setEndRowNumber(endRowNumber - END_ROW_NUMBER);
  };

  const selectAllRows = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setSelectedUsers(usersData.map(user => user.id));

      return;
    }

    setSelectedUsers([]);
  };

  // Handle checkbox change
  const handleCheckboxChange = (userId: number, index: number) => {

    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(searchResult.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
      fetchNextRows();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchPreviousRows();
    }
  };

  return (
    <div className='user-list'>
      {/* header */}
      <Grid>
        <div className='selected-actions'>
          <div className='selected-users'>
            {selectedUsers?.length} users selected
          </div>
          <CommonButton
            variant='outlined'
            size='small'
            iconUrl='/icons/edit.svg'
            label='Edit'
          />
          <CommonButton
            variant='outlined'
            size='small'
            label='Delete'
            iconUrl='/icons/trash.svg'
            classes='header-delete-button'
          />
        </div>
      </Grid>

      {/* columns */}
      <Grid
        container
        spacing={2}
        justifyContent='start'
        alignItems='center'
        className='columns'
      >
        <Grid item xs={6} className='checkbox-column'>
          <Checkbox
            onChange={selectAllRows}
            sx={{
              color: '#CBD5E0',
              '&.Mui-checked': {
                color: '#475DE5',
              },
            }}
          />
          <span className='title'>User</span>
        </Grid>

        <Grid item xs={6} className='roles-column'>
          <span className='title'>Permission</span>
          <img src='/icons/arrow-down.svg'
            alt='arrow-down-icon'
          />
        </Grid>
      </Grid>

      {
        usersData?.length === 0 && (
          <p>no user</p>
        ) 
      }

      {usersData && usersData?.map((user, index) => {
        return (
        <Grid
          container
          spacing={2}
          key={user.id}
          justifyContent='center'
          alignItems='center'
          className='main-grid'
          style={{
            borderLeft: `4px solid ${selectedUsers.includes(user.id) ? 'blue' : 'transparent'}`
          }}
        >
          {/* profile image */}
          <Grid item xs={2} style={{display: 'contents'}}>
            <Checkbox
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleCheckboxChange(user.id, index)}
              sx={{
                color: '#CBD5E0',
                '&.Mui-checked': {
                  color: '#475DE5',
                },
              }}
            />
            <Avatar alt='profile-image' src={user.avatar} className='avatar' />
          </Grid>

          {/* user name and email */}
          <Grid item xs={5}>
            <ListItemText primary={user.name} className='name-text' />
            <ListItemText primary={user.email} className='email-text' />
          </Grid>

          {/* user role */}
          <Grid item xs={3}>
            <ListItemText
              primary={user.role?.replace('_', ' ')?.toLowerCase()}
              className='role-text'
              style={{
                color: `${rolesTextColorMap[user.role]}`,
                background: `${rolesBackgroundColorMap[user.role]}`
              }}
            />
          </Grid>

          {/* Action buttons */}
          <Grid item xs={2}>
            <CommonButton
              variant='outlined'
              size='small'
              iconUrl='/icons/edit.svg'
              label='Edit'
              classes='edit-button'
            />

            <CommonButton
              variant='outlined'
              size='small'
              iconUrl='/icons/trash.svg'
              classes='delete-button'
            />
          </Grid>
        </Grid>
        );
      })}

      <div className='pagination'>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(searchResult.length / usersPerPage)}>Next</button>
      </div>
    </div>
  );
};
