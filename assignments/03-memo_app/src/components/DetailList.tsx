import React from 'react';
import styled from 'styled-components';

function DetailList() {
  return (
    <>
      <DetailHeader></DetailHeader>
      <DeatilTextarea></DeatilTextarea>
    </>
  );
}

export default DetailList;

const DetailHeader = styled.span`
  margin-bottom: 24px;
  font-size: 10px;
  color: rgb(128, 128, 128);
`;

const DeatilTextarea = styled.textarea`
  resize: none;
  flex-grow: 1;
  font-size: 15px;
  font-weight: 400;
`;
