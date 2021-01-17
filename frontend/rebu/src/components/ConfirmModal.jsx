
  const POPUP_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transfrom: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
  }

  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left:1,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, .7)',
    zIndex: 1000
  }

export default function ConfirmModal ({open, close, onClose}) {
  if (!open) return null

  return (
    <div style={OVERLAY_STYLES}>
      <button style={POPUP_STYLES} onClick={onClose}>
        Would you like to accept?
        <button>Yes</button>
        <button onClick={close}>No</button>
      </button>
    </div>

  )
}