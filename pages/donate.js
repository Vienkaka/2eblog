import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useCallback, useEffect, useState } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'

const POSTS_PER_PAGE = 10

export default function Donate() {
  const [donate, setDonate] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const supabase = useSupabaseClient()

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('donate')
        .select(`id, title, description, image, link`)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setDonate(data)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    getProfile()
  }, [getProfile])

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(donate.length / POSTS_PER_PAGE),
  }

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Donate
            </h1>
            <div className="relative max-w-lg">
              <input
                aria-label="Tìm sản phẩm"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm sản phẩm"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <ul>
            {!donate.length && 'No donate found.'}
            {donate.map(({ id, title, link, image, description }) => {
              return (
                <li key={id} className="py-4">
                  <article className="space-y-2 xl:grid xl:grid-cols-4">
                    <div className="bg-sky-500/100">
                      <p>hello</p>
                    </div>
                    <div className="ml-1 space-y-3 xl:col-span-3">
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                          <a href={link} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </a>
                        </h3>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {description}
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </>
    </>
  )
}
