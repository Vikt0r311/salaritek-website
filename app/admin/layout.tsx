import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Salarkitek Kft.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
