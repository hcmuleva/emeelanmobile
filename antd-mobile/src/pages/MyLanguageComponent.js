import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button, Space } from 'antd-mobile';
import { GlobalOutline } from 'antd-mobile-icons';

const LanguageToggle = () => {
  const { locale, setLocale, t } = useLanguage();

  const toggleLanguage = () => {
    const newLocale = locale === 'en-US' ? 'hi-IN' : 'en-US';
    setLocale(newLocale);
  };

  return (
    <Button 
      onClick={toggleLanguage}
      fill='none'
      size='small'
      style={{ 
        '--text-color': 'var(--adm-color-text)',
        '--background-color': 'transparent'
      }}
    >
      <Space align='center'>
      
        {locale === 'en-US' ? 'हिंदी' : 'English'}
      </Space>
    </Button>
  );
};

export default LanguageToggle;
