import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, updateMemoDetail, updateMemoTitle } from '../store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailData = useSelector((state: RootState) =>
    state.memo.find((data) => data.id === id)
  );
  const [detailContent, setDetailContent] = useState(detailData?.detail || '');
  const [debouncedDetailContent, setDebouncedDetailContent] =
    useState(detailContent);
  const detailRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (detailData) {
      setDetailContent(detailData.detail);
      if (detailRef.current) {
        detailRef.current.focus();
      }
    }
  }, [detailData, id]);

  useEffect(() => {
    if (id && debouncedDetailContent === '') {
      dispatch(updateMemoTitle({ id: id, newTitle: '새로운 메모' }));
      dispatch(updateMemoDetail({ id: id, detail: debouncedDetailContent }));
    } else if (id) {
      dispatch(updateMemoTitle({ id: id, newTitle: debouncedDetailContent }));
      dispatch(updateMemoDetail({ id: id, detail: debouncedDetailContent }));
    }
  }, [debouncedDetailContent]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedDetailContent(detailContent);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [detailContent]);
  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetailContent(e.target.value);
  };

  function formatDate(date: string) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours24 = d.getHours();
    const minutes = d.getMinutes();

    const period = hours24 >= 12 ? '오후' : '오전';
    const hours = hours24 % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}년 ${month}월 ${day}일, ${period} ${hours}:${formattedMinutes}`;
  }

  return (
    <>
      <DateTime>
        {detailData?.date ? formatDate(detailData.date) : null}
      </DateTime>
      <DetailContent
        onChange={handleText}
        value={detailContent}
        ref={detailRef}
      />
    </>
  );
}

export default Detail;

const DateTime = styled.span`
  margin: 0 auto;
  margin-bottom: 24px;
  font-size: 10px;
  color: rgb(128, 128, 128);
`;

const DetailContent = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  padding: 0;
  font-size: 15px;
  border: none;
  &:focus {
    outline: none;
  }
`;
