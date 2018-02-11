import React from 'react'

const HomePage = () => {
  const content = {
    title: 'What exactly is the OpenLattice Entity Data Model (EDM)?',
    article:
      'Glad you asked. EDM is the backbone how OpenLattice enables you to explore, share, and understand data. In short, it turns data mess into data magic.',
    article2: "yo"
  }

  return (
    <main className="p-home">
      <h3 className="p-home__title">
        {content.title}
      </h3>
      <article className="p-home__article">
        {content.article}
      </article>
      <article className="p-home__article">
        {content.article2}
      </article>
    </main>
  )
}

export default HomePage
