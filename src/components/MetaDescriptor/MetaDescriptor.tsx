import { Helmet } from 'react-helmet';

interface MetaDescriptorProps {
  title: string;
  description?: string;
}

export default function MetaDescriptor({ title, description }: MetaDescriptorProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
