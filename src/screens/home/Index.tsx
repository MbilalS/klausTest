import { Grid, ListItemText } from '@mui/material';
import { UsersList } from 'components/usersList/UsersList';
import { CommonButton } from '../../components/buttons/CommonButton';
import './Home.scss';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deboncedSearchQuery] = useDebounce(searchQuery, 1000);

  return (
    <div className='home'>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        className='home-grid'
      >
        <Grid item xs={6}>
          <ListItemText primary={'Account users'} className='title' />
        </Grid>

        <Grid item xs={6} className='right-side'>
          <div className='search-bar'>
            <img src='/icons/search.svg'
              alt='search-icon'
            />
            <input
              type="text"
              placeholder="Search"
              className='search-bar-input'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <CommonButton
            variant='outlined'
            size='large'
            label='Connect users'
            classes='connect-users-button'
          />
        </Grid>
      </Grid>

      <UsersList
        searchQuery={deboncedSearchQuery}
      />
    </div>
  );
};
