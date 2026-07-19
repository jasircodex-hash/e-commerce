"use client"

import { clx } from "@modules/common/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Pagination({
  page,
  totalPages,
  countryCode,
  'data-testid': dataTestid
}: {
  page: number
  totalPages: number
  countryCode: string
  'data-testid'?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const renderPageButton = (p: number, label: string | number, isCurrent: boolean) => (
    <button
      key={p}
      onClick={() => handlePageChange(p)}
      disabled={isCurrent}
      className={clx(
        "min-w-[36px] h-9 flex items-center justify-center rounded-lg text-body-sm font-medium transition-all duration-200",
        isCurrent
          ? "bg-brand-orange text-white shadow-sm shadow-brand-orange/20 cursor-default"
          : "text-neutral-500 hover:text-brand-orange hover:bg-brand-orange/5 border border-transparent hover:border-brand-orange/20"
      )}
      aria-label={`Page ${p}`}
      aria-current={isCurrent ? "page" : undefined}
    >
      {label}
    </button>
  )

  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="w-9 h-9 flex items-center justify-center text-body-sm text-neutral-300"
    >
      ...
    </span>
  )

  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      )
    } else {
      if (page <= 4) {
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        )
        buttons.push(renderEllipsis("ellipsis1"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      } else if (page >= totalPages - 3) {
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis2"))
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
      } else {
        buttons.push(renderPageButton(1, 1, 1 === page))
        buttons.push(renderEllipsis("ellipsis3"))
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        )
        buttons.push(renderEllipsis("ellipsis4"))
        buttons.push(
          renderPageButton(totalPages, totalPages, totalPages === page)
        )
      }
    }

    return buttons
  }

  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-100">
      <div className="flex items-center gap-1">
        <span className="text-caption text-neutral-400">
          Page {page} of {totalPages}
        </span>
      </div>
      <nav className="flex items-center gap-1" data-testid={dataTestid} aria-label="Pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className={clx(
            "h-9 px-3 flex items-center gap-1 rounded-lg text-body-sm font-medium transition-all duration-200",
            page <= 1
              ? "text-neutral-300 cursor-not-allowed"
              : "text-neutral-500 hover:text-brand-orange hover:bg-brand-orange/5"
          )}
          aria-label="Previous page"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>
        <div className="flex items-center gap-0.5">
          {renderPageButtons()}
        </div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className={clx(
            "h-9 px-3 flex items-center gap-1 rounded-lg text-body-sm font-medium transition-all duration-200",
            page >= totalPages
              ? "text-neutral-300 cursor-not-allowed"
              : "text-neutral-500 hover:text-brand-orange hover:bg-brand-orange/5"
          )}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  )
}
