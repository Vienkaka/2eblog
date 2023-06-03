export default function ClientPagination({ totalPages, currentPage, onChange }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        <button
          rel="previous"
          className="cursor-pointer disabled:cursor-auto disabled:opacity-50"
          disabled={!prevPage}
          onClick={() => onChange(currentPage - 1)}
        >
          Trước
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          rel="next"
          className="cursor-pointer disabled:cursor-auto disabled:opacity-50"
          disabled={!nextPage}
          onClick={() => onChange(currentPage + 1)}
        >
          Sau
        </button>
      </nav>
    </div>
  )
}
