const BuildMartLogo = ({ className = "", size = 32 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="12" height="20" rx="2" className="fill-brand-orange" />
    <rect x="18" y="2" width="12" height="24" rx="2" className="fill-brand-slate" />
    <rect x="6" y="10" width="4" height="12" rx="1" fill="white" />
    <rect x="22" y="6" width="4" height="16" rx="1" fill="white" />
    <path d="M2 22L14 22" stroke="white" strokeWidth="1.5" />
    <path d="M18 18L30 18" stroke="white" strokeWidth="1.5" />
  </svg>
)

export default BuildMartLogo
