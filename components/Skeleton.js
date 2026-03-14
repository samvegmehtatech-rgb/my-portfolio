export default function Skeleton({ 
  width   = '100%', 
  height  = '20px', 
  radius  = '8px',
  mb      = '0px'
}) {
  return (
    <div style={{
      width,
      height,
      borderRadius: radius,
      marginBottom: mb,
      background:   'linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)',
      backgroundSize: '200% 100%',
      animation:    'shimmer 1.5s infinite',
    }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position:  200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}
