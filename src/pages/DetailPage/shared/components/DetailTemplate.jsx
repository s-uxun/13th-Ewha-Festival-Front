import React from 'react';
import styled from 'styled-components';

import basicThumbnail from '@/assets/images/basicThumbnail.png';

import BoothButton from './BoothButton.jsx';
import BoothHeader from './BoothHeader.jsx';
import BoothInfo from './BoothInfo.jsx';
import BoothMeta from './BoothMeta.jsx';

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const BoothThumbnail = styled.img`
  z-index: 0;
  width: 100%;
  height: 15rem;
  object-fit: cover;
  object-position: center 40%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 35.78%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const InfoWrapper = styled.div`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
  justify-content: flex-start;
  background-color: white;
`;

const DetailTemplate = ({
  boothData,
  operatingHours,
  thumbnailSrc,
  setThumbnailSrc,
  scrapState,
  setScrapState,
  boothId,
  role,
  BoothTabsComponent
}) => {
  if (!boothData) return null;

  return (
    <>
      <BoothHeader role={role} isShow={boothData.is_show} id={boothId} />
      <ThumbnailWrapper>
        <BoothThumbnail
          src={thumbnailSrc}
          alt={boothData.name || '기본 이미지'}
          onError={() => setThumbnailSrc(basicThumbnail)}
        />
      </ThumbnailWrapper>
      <InfoWrapper>
        <BoothInfo
          name={boothData.name}
          category={boothData.category}
          description={boothData.description}
        />
        {!boothData.is_committee && (
          <BoothButton
            contact={boothData.contact}
            scrapCount={boothData.scrap_count}
            scrapState={scrapState}
            setScrapState={setScrapState}
            boothId={boothId}
            isCommittee={boothData.is_committee}
            isShow={boothData.is_show}
          />
        )}
        <BoothMeta
          location={boothData.formatted_location}
          operatingHours={operatingHours}
        />
      </InfoWrapper>
      {!boothData.is_committee && <BoothTabsComponent boothId={boothId} />}
    </>
  );
};

export default DetailTemplate;
