import styled from 'styled-components';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface ListProps {
  id: string;
  selectedId: string | null;
  onClick: () => void;
}

function List({ id, onClick, selectedId }: ListProps) {
  const listData = useSelector((state: RootState) => state.memo).filter(
    (data) => data.id === id
  )[0];

  function formatTime(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const period = isPM ? '오후' : '오전';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${period} ${hours}:${formattedMinutes}`;
  }

  return (
    <Link to={`${id}`}>
      <ListItem onClick={onClick} $isSelected={selectedId === id}>
        <ListTitle>{listData.title}</ListTitle>
        <ListTime>{formatTime(new Date(listData.date))}</ListTime>
      </ListItem>
    </Link>
  );
}

export default List;

const ListItem = styled.li<{ $isSelected: boolean }>`
  background-color: ${(props) =>
    props.$isSelected ? 'rgb(255, 224, 127)' : 'white'};
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 4px;
`;

const ListTitle = styled.h6`
  margin-bottom: 2px;
  overflow-x: hidden;
  font-weight: 600;
  font-size: 13px;
`;

const ListTime = styled.time`
  font-size: 12px;
  color: rgb(64, 64, 64);
`;
