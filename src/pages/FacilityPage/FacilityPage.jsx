import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Butane, Plate, Wastebasket } from '@/assets/icons';
import BarrierFreeMap from '@/assets/images/facility/barrierFreeMap.png';
import FacilityMap from '@/assets/images/facility/facilityMap.png';
import Footer from '@/common/Footer';
import Header from '@/common/Header';
import BarrierFreeList from '@/pages/FacilityPage/components/BarrierFreeList';
import FacilityList from '@/pages/FacilityPage/components/FacilityList';
import FacilityTab from '@/pages/FacilityPage/components/FacilityTab';

const FacilityPage = () => {
  const [selectedTab, setSelectedTab] = useState('facility');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = tab => {
    setSelectedTab(tab);
  };

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
  };

  const mapImage = selectedTab === 'facility' ? FacilityMap : BarrierFreeMap;
  const width = useWindowWidth();
  const isSmall = width <= 320;

  return (
    <>
      <FixedHeader $isScrolled={isScrolled}>
        <Header />
      </FixedHeader>
      <Container>
        <Title>주요 시설 위치</Title>
        <Map src={mapImage} alt='지도' />

        {selectedTab === 'facility' && (
          <IconWrapper>
            <IconItem>
              <Wastebasket />
              <IconText>쓰레기통</IconText>
            </IconItem>
            <IconItem>
              <Plate />
              <IconText>다회용기수거</IconText>
            </IconItem>
            <IconItem>
              <Butane />
              <IconText>부탄가스수거</IconText>
            </IconItem>
          </IconWrapper>
        )}

        {selectedTab === 'barrierFree' && (
          <BarrierFreeNotice>
            2025 리베르테가 모든 이화인이 함께 즐길 수 있는
            <br />
            배리어프리한 축제가 될 수 있도록, 이동이나 활동에 불편함을 겪는
            {isSmall ? ' ' : <br />}
            학우들을 위해 배리어프리존을 운영합니다.
          </BarrierFreeNotice>
        )}

        <FacilityTab selected={selectedTab} onTabChange={handleTabChange} />

        {selectedTab === 'facility' ? <FacilityList /> : <BarrierFreeList />}
      </Container>
      <Footer />
    </>
  );
};

export default FacilityPage;

const Container = styled.div`
  padding: 1.25rem;
  background-color: white;
  padding-top: 4.5rem;
`;
const Title = styled.div`
  color: var(--black, #000);
  text-align: center;
  margin-top: 0.88rem;
  ${({ theme }) => theme.fontStyles.semibold_24pt};
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  max-width: 440px;
  width: 100%;
  z-index: 1000;
  margin: 0 auto;
  background-color: white;
  ${({ $isScrolled }) =>
    $isScrolled && `box-shadow: 0px 2px 13.1px 0px rgba(0, 0, 0, 0.08);`}
`;

const Map = styled.img`
  width: 100%;
  padding: 1.13rem 1.19rem 0rem 1.19rem;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.91rem;
  margin-bottom: 3.46rem;
  height: 1rem;
`;

const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const IconText = styled.span`
  ${({ theme }) => theme.fontStyles.medium_10pt};
  color: var(--gray3, #787878);
`;

const BarrierFreeNotice = styled.p`
  ${({ theme }) => theme.fontStyles.regular_12pt};
  text-align: center;
  color: var(--green3, #00462a);
  margin-bottom: 2rem;
  word-break: keep-all;
`;
