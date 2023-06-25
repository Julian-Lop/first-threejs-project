import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  return (
    <main>
      <h1>
        Three js
      </h1>
      <navbar>
        <Link href={'/basic'}>
          Probar test básico
        </Link>
        <Link href={'/model'}>
          Probar test con modelo importado
        </Link>
      </navbar>
    </main>
  )
}
