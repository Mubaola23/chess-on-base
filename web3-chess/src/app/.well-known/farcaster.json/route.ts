function withValidProperties(properties: Record<string, undefined | string | string[]>) {
return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
);
}

export async function GET() {
const URL = process.env.NEXT_PUBLIC_URL as string;
return Response.json({
 "accountAssociation": {
    "header": "eyJmaWQiOjEwNjAzODIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhjMzdGNmYzRkVCMzg1MDFGMTY2NzgxMDNCNzE3M0RFNTI4MDlGMzExIn0",
    "payload": "eyJkb21haW4iOiJjaGVzcy1vbi1iYXNlLXg3bDgudmVyY2VsLmFwcCJ9",
    "signature": "pCmWBJHKafW6d1HPVhmFR7KPv1R6eq+WR48IBe2ry/BH8Y2u4rWytzCkZzhbSX8fgeMitcY5VbB4jN5luZk//hs="
  },
  "miniapp": {
   "version": "1",
   "name": "Chess on base",
   "homeUrl": "https://chess-on-base-x7l8.vercel.app/",
   "iconUrl": "https://github.com/base/brand-kit/blob/main/logo/TheSquare/Digital/Base_square_blue.png",
   "splashImageUrl": "https://github.com/base/brand-kit/blob/main/logo/TheSquare/Digital/Base_square_blue.png",
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
   "tags": ["play", "miniapp", "baseapp", "chess", "gaming"],
   "heroImageUrl": "https://ex.co/og.png",
   "tagline": "Play instantly",
   "ogTitle": "Example Mini App",
   "ogDescription": "Challenge friends in real time.",
   "ogImageUrl": "https://ex.co/og.png",
   "noindex": true
  }
}); // see the next step for the manifest_json_object
}