import { getDictionary } from '../../get-dictionary';
import AdminPanel from '@/components/Admin/AdminPanel';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.admin.title} | GSS Network`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AdminPanel dict={dict} lang={lang} />;
}
