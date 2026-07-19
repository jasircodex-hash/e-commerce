export const SearchIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="5.5" /><path d="M13 13L17 17" />
  </svg>
)

export const CartIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 14.5H15.5L17 5H4L5.5 14.5Z" /><circle cx="7.5" cy="17" r="1.5" /><circle cx="13.5" cy="17" r="1.5" />
  </svg>
)

export const UserIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="6.5" r="3.5" /><path d="M3 18C3 14.5 6.5 12 10 12C13.5 12 17 14.5 17 18" />
  </svg>
)

export const HeartIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 17C10 17 3 12.5 3 7.5C3 5 5 3 7.5 3C9 3 10 4 10 4C10 4 11 3 12.5 3C15 3 17 5 17 7.5C17 12.5 10 17 10 17Z" />
  </svg>
)

export const StarIcon = ({ className = "", filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" />
  </svg>
)

export const TruckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16H5C3.9 16 3 15.1 3 14V5C3 3.9 3.9 3 5 3H13C14.1 3 15 3.9 15 5V11H18.5L21 13.5V14C21 15.1 20.1 16 19 16H18" /><circle cx="7.5" cy="18.5" r="2.5" /><circle cx="16.5" cy="18.5" r="2.5" />
  </svg>
)

export const ShieldIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" /><path d="M9 12L11 14L15 10" />
  </svg>
)

export const ClockIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6V12L16 14" />
  </svg>
)

export const HeadphonesIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 14H5C5.55 14 6 14.45 6 15V19C6 19.55 5.55 20 5 20H3V14Z" /><path d="M21 14H19C18.45 14 18 14.45 18 15V19C18 19.55 18.45 20 19 20H21V14Z" /><path d="M21 14C21 9 17 5 12 5C7 5 3 9 3 14" />
  </svg>
)

export const PackageIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" /><path d="M2 17L12 22L22 17" /><path d="M2 12L12 17L22 12" />
  </svg>
)

export const DocumentTextIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6C5.47 2 5 2.47 5 3V21C5 21.53 5.47 22 6 22H18C18.53 22 19 21.53 19 21V8L14 2Z" /><path d="M14 2V8H19" /><path d="M9 13H15" /><path d="M9 17H15" /><path d="M9 9H10" />
  </svg>
)

export const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6L8 10L12 6" />
  </svg>
)

export const ChevronRightIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4L13 10L7 16" />
  </svg>
)

export const MenuIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 6H21" /><path d="M3 12H21" /><path d="M3 18H21" />
  </svg>
)

export const XIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M6 6L18 18" /><path d="M18 6L6 18" />
  </svg>
)

export const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8L6.5 11.5L13 5" />
  </svg>
)

export const QuoteIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="currentColor" opacity="0.15">
    <path d="M10 8C6 8 4 10 4 14V18H10V14H6C6 12 6.5 10 10 10V8ZM22 8C18 8 16 10 16 14V18H22V14H18C18 12 18.5 10 22 10V8Z" />
  </svg>
)
