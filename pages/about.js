import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import Image from 'next/image'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
      <h3 style={{ textAlign: 'center', fontSize: 32, fontWeight: 'bold', marginBottom: 16 }}>
        Một cốc cà phê cho ngày dài năng lượng
      </h3>
      <div>
        <Image alt={'coffee'} src={'/static/images/coffee.png'} width={350} height={450} />
        <Image
          alt={'vietqr'}
          src={'https://img.vietqr.io/image/CAKE-0376865376-print.png'}
          width={350}
          height={450}
        />
      </div>
    </>
  )
}
