/**
 * Site-wide links — update social URLs when profiles are live.
 */
export const siteConfig = {
  social: {
    /** Public member view (viewAsMember avoids admin dashboard redirect for page managers) */
    linkedIn: 'https://www.linkedin.com/company/docflow-by-symantum/?viewAsMember=true',
    /** YouTube channel or demo playlist — leave empty to hide icon until live */
    youTube: '',
  },
  company: {
    name: 'Symantum Pty Ltd',
    product: 'DocFlow',
  },
} as const
