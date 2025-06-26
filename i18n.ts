import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {defaultLocale} from './next-intl.config.mjs';

// Cargar los mensajes para un locale específico
const getMessages = async (locale: string) => {
  try {
    return (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
};

export default getRequestConfig(async ({locale}) => {
  // Ensure locale has a value
  const safeLocale = locale || defaultLocale;
  
  // Load messages for the current locale
  const messages = await getMessages(safeLocale);
  
  return {
    locale: safeLocale, 
    messages, 
    timeZone: 'Europe/Madrid'
  };
});
