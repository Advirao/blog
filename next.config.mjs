/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow the simulation HTML files to be served statically
  // and allow embedding via iframe
  async headers() {
    return [
      {
        source: '/simulations/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
        ],
      },
    ]
  },
  // Output export for static hosting (optional, comment out for Vercel)
  // output: 'export',
}

export default nextConfig
