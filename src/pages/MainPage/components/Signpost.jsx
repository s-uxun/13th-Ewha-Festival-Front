import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getUserInfo } from '@/api/auth';
import getBoothId from '@/api/getBoothId';
import { Pole } from '@/assets/icons';

import Sign from './Sign';

const baseSigns = [
  { korean: '부스 목록', english: 'Booth\nList', to: '/boothlist' },
  { korean: '공연 목록', english: 'Stage\nList', to: '/showlist' },
  { korean: '축제 일정', english: 'Liberté\nPlan', to: '/schedule' },
  { korean: '스크랩북', english: 'Scrap\nBook', to: '/scrap' }
];

const Signpost = () => {
  const [signs, setSigns] = useState(baseSigns);

  useEffect(() => {
    const initSigns = async () => {
      const userInfo = getUserInfo();
      if (userInfo?.is_booth) {
        const boothId = await getBoothId();
        setSigns([
          ...baseSigns,
          {
            korean: '부스 관리',
            english: 'Booth\nAdmin',
            to: `/boothEdit/${boothId}`
          }
        ]);
      }
    };

    initSigns();
  }, []);

  return (
    <SignpostWrapper>
      <Pole />
      {signs.map((sign, index) => (
        <SignWrapper key={index} index={index} isLeft={index % 2 === 0}>
          <Sign
            korean={sign.korean}
            english={sign.english}
            left={index % 2 === 1}
            to={sign.to}
          />
        </SignWrapper>
      ))}
    </SignpostWrapper>
  );
};

export default Signpost;

const SignpostWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`;

const SignWrapper = styled.div`
  position: absolute;
  top: ${({ index }) => 10 + index * 16}%;
  z-index: 3;

  ${({ isLeft }) =>
    isLeft
      ? 'right: 85%; transform: translateX(100%);'
      : 'left: 85%; transform: translateX(-100%);'}
`;
