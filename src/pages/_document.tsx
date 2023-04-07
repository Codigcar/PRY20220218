import theme from '@/config/theme'
import { Button } from '@mui/material'
import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
import { useEffect } from 'react'

export const CHeader = ({ children }: any) => {
  return <div style={{
    backgroundColor: theme.palette.primary.main, paddingBottom: 15, paddingTop: 15,
    display: 'flex', justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 30
  }} >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>Logo</div>
      <div style={{ paddingLeft: 25 }}>
        <Link href="/teams" style={{ textDecoration: 'none', color: 'white' }}>
          <div>Inicio</div>
        </Link>
      </div >
    </div>
    <div style={{ display: 'flex' }}>
      <div>
        <Link href="/create-team">
          <Button variant="contained">Equipo +</Button>
        </Link>
      </div >
      <div style={{ paddingLeft: 30 }}>
        <Link href="/exercise">
          <Button variant="contained">IoT +</Button>
        </Link>
      </div >
    </div>
  </div >
}

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}


