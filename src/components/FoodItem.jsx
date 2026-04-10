export default function FoodItem({ item, selected, onSelect, soldOut }) {
  const handleClick = () => {
    if (soldOut) return;
    onSelect(item);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: soldOut ? 'default' : 'pointer',
        border: `2px solid ${selected ? '#6B21A8' : '#E5E7EB'}`,
        background: '#F9FAFB',
        padding: '1.25rem',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 150ms, box-shadow 150ms, border-color 150ms',
        boxShadow: selected ? '0 0 20px rgba(107,33,168,0.4)' : 'none',
      }}
    >
      {/* Emoji */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(107,33,168,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
          }}
        >
          {item.emoji}
        </div>
      </div>

      {/* Restaurant badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
        <span
          style={{
            fontSize: '11px',
            background: 'rgba(107,33,168,0.2)',
            color: '#8B5CF6',
            borderRadius: '20px',
            padding: '2px 10px',
          }}
        >
          {item.restaurant}
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#0C0118',
          marginTop: '0.75rem',
          textAlign: 'center',
        }}
      >
        {item.name}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: '12px',
          color: '#6B7280',
          textAlign: 'center',
          marginTop: '4px',
        }}
      >
        {item.description}
      </div>

      {/* Price row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
        }}
      >
        <span
          style={{
            textDecoration: 'line-through',
            color: '#9CA3AF',
            fontSize: '13px',
          }}
        >
          {item.originalPrice}
        </span>
        <span
          style={{
            background: 'rgba(34,197,94,0.15)',
            color: '#4ADE80',
            borderRadius: '6px',
            padding: '2px 10px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          FREE
        </span>
      </div>

      {/* Selected checkmark */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '24px',
            height: '24px',
            background: '#6B21A8',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7L5.5 10L11.5 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Sold out overlay */}
      {soldOut && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'white',
              background: 'rgba(0,0,0,0.7)',
              padding: '6px 16px',
              borderRadius: '8px',
            }}
          >
            Sold Out
          </span>
        </div>
      )}
    </div>
  );
}
