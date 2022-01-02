import React, { FC } from 'react';
import './_popup_tabs.scss';

interface Popups {
  children?: any;
  activeTab?: string | 'solid' | 'gradient';
  tabName?: string;
  popupWidth?: number;
  onClick?: () => void;
}

export const PopupTabs: FC<Popups> = ({
  children,
  activeTab,
  popupWidth
}: Popups) => {
  const childrenContact = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activeTab
    });
  });

  return (
    <div className='popup_tabs' style={{ width: `${popupWidth}px` }}>
      {childrenContact}
    </div>
  );
};

export const PopupTabsHeaderLabel: FC<Popups> = ({
  children,
  activeTab,
  tabName,
  onClick
}: Popups) => {
  return (
    <div
      className={`popup_tabs-header-label${
        activeTab === tabName ? ' popup_tabs-header-label-active' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const PopupTabsHeader: FC<Popups> = ({
  children,
  activeTab
}: Popups) => {
  const childrenContact = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activeTab
    });
  });
  return <div className='popup_tabs-header'>{childrenContact}</div>;
};

export const PopupTabsBody: FC<Popups> = ({ children, activeTab }) => {
  const childrenContact = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activeTab
    });
  });

  return <div className='popup_tabs-body'>{childrenContact}</div>;
};

export const PopupTabsBodyItem: FC<Popups> = ({
  children,
  activeTab,
  tabName
}: Popups) => {
  if (activeTab === tabName) {
    return <div className='popup_tabs-body-item'>{children}</div>;
  }

  return null;
};
