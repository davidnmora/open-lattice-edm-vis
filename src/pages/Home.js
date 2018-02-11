import React from 'react'

const HomePage = () => {
  const content = [
    {
      heading: 'What exactly is the OpenLattice Entity Data Model (EDM)?',
      article: 'Glad you asked. EDM is the backbone how OpenLattice enables you to explore, share, and understand data. In short, it turns data mess into data magic.'
    },
    {
      heading: 'How does the EDM work?',
      article: 'Your data is often messy and incredibly diverse. This means deep insights remain trapped and splintered across files and formats. The EDM solves this daunting challenge by marrying this complexity with elegance: in it, every data point is either describes an Entity (person, organization, property, etc), an Association between two Entities (interactions, ownership, relationship, etc), or a Property belonging to an Entity or Association (dates, phone numbers, aspect of a patient’s medical history, etc). Just like that, a cacophony of data types, formats, and descriptors come into clear harmony, able to be compared, related and shared.'
    },
    {
      heading: 'Why is the OpenLattice EDM so powerful?',
      article: 'The EDM is a shared language for data. With it, data sources from across your organization can for the first time come together in conversation. Critically, this shared language enables conversation with data sources from completely separate organizations, bringing collaborative possibilities never before imagined. The EDM is no trivial framework: baked into every aspect of it is hundreds of hours of planning, testing, and field validation lead by top engineers and data scientists.'
    }
    
  ]

  return (
    <main className="p-home">
      {content.map(section => {
        return (
          <div>
            <h1 className="p-home__title">
              {section.heading}
            </h1>
            <article className="p-home__article">
              {section.article}
            </article>
          </div>
        )
      })
      }
    </main>
  )
}

export default HomePage
