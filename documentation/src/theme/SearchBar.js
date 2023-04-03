/**
 * @see https://docusaurus.io/docs/search#using-your-own-search
 */

import React from 'react';
import EnhancedSearch from 'enhancedocs-search';

import 'enhancedocs-search/dist/style.css';

export default function SearchBarWrapper(props) {
  return (
    <EnhancedSearch
      accessToken="<replace_with_access_token>"
      {...props}
    />
  );
}
