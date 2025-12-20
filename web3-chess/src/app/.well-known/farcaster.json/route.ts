function withValidProperties(properties: Record<string, undefined | string | string[]>) {
return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
);
}

export async function GET() {
const URL = process.env.NEXT_PUBLIC_URL as string;
return Response.json({
   "accountAssociation": {
    "header": "eyJmaWQiOi0xLCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4NjVBMGRjNzQyMDQzMkExYkI3RjNlMjBBMDI3MTE2YzBFNDExZmM1MCJ9",
    "payload": "eyJkb21haW4iOiJjaGVzcy1vbi1iYXNlLXg3bDgudmVyY2VsLmFwcCJ9",
    "signature": "AAAAAAAAAAAAAAAAyhG94Fl3s2MRZwKIYr4qFzl2yhEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiSCrVbLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAul7REO_bo9AFv8iC11NYrLu4WEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASQ_-6NvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAREvF2In_hqRmoDE7h_VVjOFrx-EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAPhSELIcxQMC9He6VmhtIBncm2etAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBmLNO8qSyMGDNi-iqhHzv9LRejJIIM9f2I0n3re5ufZNZhRvoULgRUiDRUuLsiKdGQ-QcIDp0yBLILkn4e_87DBsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZJJkkmSSZJJkkmSSZJJkkmSSZJJkkmSSZJJkkmSSZJI"
  },
  "miniapp": {
    "version": "1",
    "name": "Chess on base",
    "homeUrl": "https://chess-on-base-x7l8.vercel.app/",
    "iconUrl": "https://ex.co/i.png",
    "splashImageUrl": "https://ex.co/l.png",
    "splashBackgroundColor": "#000000",
    "webhookUrl": "https://ex.co/api/webhook",
    "subtitle": "Fast, fun, social",
    "description": "Welcome to the world of decentralized chess. This guide will walk you through the basics of chess, how to use our interface, and what it means to play on the Base network",
    "screenshotUrls": [
      "https://ex.co/s1.png",
      "https://ex.co/s2.png",
      "https://ex.co/s3.png"
    ],
    "primaryCategory": "social",
    "tags": ["example", "miniapp", "baseapp"],
    "heroImageUrl": "https://ex.co/og.png",
    "tagline": "Play instantly",
    "ogTitle": "Example Mini App",
    "ogDescription": "Challenge friends in real time.",
    "ogImageUrl": "https://ex.co/og.png",
    "noindex": true
  }
}); // see the next step for the manifest_json_object
}