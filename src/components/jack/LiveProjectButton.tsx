interface Props {
  href?: string
}

export default function LiveProjectButton({ href = '#' }: Props) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        border: '2px solid #D7E2EA',
        color: '#D7E2EA',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        textDecoration: 'none',
        fontFamily: "'Kanit', sans-serif",
        transition: 'background 0.2s',
      }}
      className="px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10"
    >
      Vezi Proiectul
    </a>
  )
}
