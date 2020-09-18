import './Matches.scss';
import React, { FC, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector, actions } from '../store';

const server = process.env.REACT_APP_API_URL;

const Matches: FC = () => {
  const dispatch = useDispatch();

  const { token, matchecDOM, numOfPages, isLoading } = useSelector((state) => state);
  let { page } = useSelector((state) => state);

  function handlePagination(direction: string) {
    if (direction === 'prev') getData(token, page - 1);
    if (direction === 'next') getData(token, page + 1);
    if (direction === 'first') getData(token, 0);
    if (direction === 'last') getData(token, numOfPages - 1);
  }

  function createTableBody(data: any) {
    let matchesDomElements: {} | null | undefined = Object.keys(data.results).map(function (key) {
      let dateValue = new Date(data.results[key].start);
      const formatedDate = (dateValue + '').split(' ');
      formatedDate[2] = formatedDate[2] + ',';

      let keyValue = key;

      return (
        <tr key={key}>
          <td key={keyValue.concat('-score')}>{data.results[key].score}</td>
          <td key={keyValue.concat('-time')}>
            {data.results[key].start &&
              [formatedDate[0], formatedDate[1], formatedDate[2], formatedDate[3]].join(' ')}
          </td>
          <td key={keyValue.concat('-teams')}>
            {data.results[key].teamA} <br /> {data.results[key].teamB}
          </td>
          <td key={keyValue.concat('-title')}>{data.results[key].title}</td>
          <td key={keyValue.concat('-tounament')}>{data.results[key].tournament}</td>
          <td key={keyValue.concat('status')}>{data.results[key].status}</td>
        </tr>
      );
    });

    return matchesDomElements;
  }

  function setPagination(body: any) {
    let pageDiff: number = body.count % 50;
    let numOfPages: number = 20;

    if (pageDiff === 0) {
      numOfPages = body.count / 50;
    } else if (pageDiff < 50) {
      numOfPages = Math.floor(body.count / 50) + 1;
    }
    return numOfPages;
  }

  useEffect(() => {
    dispatch(actions.setMatches({}));
    getData(token, 0);
  }, []);

  function getData(token: string, pageToGo: number) {
    dispatch(actions.setisLoading(true));
    let url = `${server}/api/matches?page=${pageToGo}`;

    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(async (response) => {
      const body = await response.json();

      if (response.status !== 200) {
        dispatch(actions.setIsOpen(true));
        dispatch(actions.setIsLoggedIn(false));
        return;
      }

      dispatch(actions.setMatches(body));
      dispatch(actions.setMatchesDom(createTableBody(body)));
      dispatch(actions.setPage(pageToGo));
      dispatch(actions.setisLoading(false));
      dispatch(actions.setNumOfPages(setPagination(body)));
    });
  }
  return (
    <div className="Matches">
      <br />
      <br />
      <Pagination>
        <Pagination.Prev disabled={page <= 0} onClick={() => handlePagination('prev')} />
        <Pagination.Item onClick={() => handlePagination('first')}>1</Pagination.Item>
        <Pagination.Item active>Page: {page + 1}</Pagination.Item>
        <Pagination.Item onClick={() => handlePagination('last')}>{numOfPages}</Pagination.Item>
        <Pagination.Next disabled={page >= numOfPages} onClick={() => handlePagination('next')} />
      </Pagination>
      <br />
      <br />
      {isLoading && <h3>Loading...</h3>}
      <br />
      <br />
      <Table responsive>
        <thead>
          <tr>
            <th>Score</th>
            <th>Date</th>
            <th>Teams</th>
            <th>Title</th>
            <th>tournament</th>
            <th>status</th>
          </tr>
        </thead>
        {!isLoading && <tbody>{matchecDOM}</tbody>}
      </Table>
    </div>
  );
};

export default Matches;
