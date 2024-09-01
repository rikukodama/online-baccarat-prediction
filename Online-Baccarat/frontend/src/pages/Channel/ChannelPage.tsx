import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import {Outlet,useParams} from 'react-router-dom';

import TagManage from './TagManage';
import MeetingManage from './Meeting/MeetingManage';


const ChannelPage: React.FC = () => {
  const Id = useParams().channelId;

  return (
    <DefaultLayout>
      <TagManage channelId={Id}/>
      <div className="flex">
        <Outlet/>
        {/* <MeetingManage/> */}
      </div>
    </DefaultLayout>
  );
};

export default ChannelPage;
