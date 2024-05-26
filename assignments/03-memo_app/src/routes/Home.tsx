import styled from 'styled-components';
import List from '../components/List';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { RootState, addMemo, deleteMemo } from '../store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Detail from './Detail';

function Home() {
  const memos = useSelector((state: RootState) => state.memo);
  const [selectedId, setSelectedId] = useState<string | null>(
    memos.length > 0 ? memos[0].id : null
  );
  const dispatch = useDispatch();

  const writeNewMemo = () => {
    const date = String(new Date());
    dispatch(addMemo({ id: uuidv4(), title: '새로운 메모', date, detail: '' }));
  };

  useEffect(() => {
    if (memos.length === 0) writeNewMemo();
  }, []);

  const handleMemoSelect = (id: string) => {
    setSelectedId(id);
  };

  const deleteList = () => {
    if (selectedId) {
      const currentIndex = memos.findIndex((memo) => memo.id === selectedId);
      if (currentIndex !== -1) {
        const nextIndex =
          currentIndex + 1 < memos.length ? currentIndex + 1 : currentIndex - 1;
        const nextSelectedId = nextIndex >= 0 ? memos[nextIndex].id : null;
        setSelectedId(nextSelectedId);
        dispatch(deleteMemo(selectedId));
      }
    }
  };

  return (
    <Wrapper>
      <ListSection>
        <ListButtonWrap>
          <ListButton onClick={writeNewMemo}>새 메모 작성하기</ListButton>
          <ListButton onClick={deleteList}>삭제</ListButton>
        </ListButtonWrap>
        <ListWrap>
          {memos.map((list) => (
            <List
              key={list.id}
              {...list}
              onClick={() => handleMemoSelect(list.id)}
              isSelected={selectedId === list.id}
            />
          ))}
        </ListWrap>
      </ListSection>
      <DetailSection>
        {selectedId && <Detail selectedId={selectedId} />}
      </DetailSection>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  height: 500px;
  max-width: 1024px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px 0px;
`;

const ListSection = styled.aside`
  align-content: flex-start;
  overflow-y: auto;
  border-right: 1px solid rgb(230, 230, 230);
  width: 240px;
`;

const ListButtonWrap = styled.header`
  display: flex;
  position: sticky;
  justify-content: space-between;
  padding: 12px 16px;
  top: 0px;
  border-bottom: 1px solid rgb(230, 230, 230);
`;

const ListButton = styled.button`
  box-sizing: content-box;
  padding: 4px 8px;
  color: rgb(128, 128, 128);
  background-color: white;
  border: none;
  cursor: pointer;
`;

const ListWrap = styled.ul`
  padding: 20px 12px;
  overflow-x: hidden;
`;

const DetailSection = styled.article`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
