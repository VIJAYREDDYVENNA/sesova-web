import React from 'react';
import { Link } from 'react-router-dom';

// Router-aware anchor: app paths ("/", "/#demo") go through
// react-router; in-page hashes and external URLs stay plain anchors.
export default function SmartLink({ href = '', children, ...rest }) {
  if (href.startsWith('/')) {
    return <Link to={href} {...rest}>{children}</Link>;
  }
  return <a href={href} {...rest}>{children}</a>;
}
