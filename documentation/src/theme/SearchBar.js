import React from 'react';
import EnhancedSearch from 'enhancedocs-search';

import 'enhancedocs-search/dist/style.css';

export default function SearchBarWrapper(props) {
  return (
    <EnhancedSearch
      config={{
        projectId: '642ef48a9b7dab8fff36a55b',
        accessToken: 'pk_b6c6de86cb63d0857b2a96b3f90ec2906be49358981ac67f'
      }}
      theme={{
        primaryColor: '#B94BEE'
      }}
      {...props}
    />
  );
}
