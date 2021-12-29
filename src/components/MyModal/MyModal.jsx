import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './MyModal.css'

const modalRootElement = document.getElementById('modal-root')

function MyModal({ children }) {
  const modalContent = document.createElement('div')

  useEffect(() => {
    // modalContent.className = 'modal'

    modalRootElement.appendChild(modalContent)

    return () => {
      modalRootElement.removeChild(modalContent)
    }
  }, [modalContent])

  return ReactDOM.createPortal(children, modalContent)
}

export default MyModal
