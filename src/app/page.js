import { redirect } from 'next/navigation';

const defaultLocale = 'pt';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
