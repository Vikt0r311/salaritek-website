import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kapcsolat - Salarkitek Kft.',
  description:
    'Lépjen kapcsolatba velünk ingyenes konzultációért és árajánlatért. Telefon: 06-30/396-6037, Email: info@salarkitek.hu',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
